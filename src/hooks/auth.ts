import { useQuery } from '@tanstack/react-query'
import { siteClient, petstoreClient } from '../fetsClient'
import { registerOAuth2Worker, authorize, clearToken } from '@juxt/pass'
import {
  app_server,
  authorization_server,
  photoPrismPreviewTokenKey,
  photoPrismTokenKey,
  photo_server,
  resource_server
} from '../constants'
import { useAtom } from 'jotai'
import { atomWithLocalStorage } from '../utils'
import { type PhotoPrismLoginResponse } from '../photoprism'

const loggedInAtom = atomWithLocalStorage('loggedIn', false)

async function photoPrismLogin() {
  const existingApiToken = localStorage.getItem(photoPrismTokenKey)
  const existingPreviewToken = localStorage.getItem(photoPrismPreviewTokenKey)
  const username = import.meta.env.VITE_PHOTOPRISM_USER
  const password = import.meta.env.VITE_PHOTOPRISM_PASSWORD
  if (existingApiToken && existingPreviewToken) {
    return {
      apiToken: existingApiToken,
      previewToken: existingPreviewToken
    }
  }
  console.log('trying')
  const res: PhotoPrismLoginResponse = await fetch(`${photo_server}/api/v1/session`, {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-GB',
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    },
    body: `{"username":"${username}","password":"${password}"}`,
    method: 'POST'
  })
    .then(async (res) => {
      console.log(res)
      return await res.json()
    })
    .catch((error) => {
      console.error('error logging in to photoprism', error)
      return {
        apiToken: null,
        previewToken: null
      }
    })

  console.log('tried')
  if (res) {
    return {
      apiToken: res.id,
      previewToken: res.config.previewToken
    }
  }
}

// preload photoprism token
photoPrismLogin()
  .then(async (res) => {
    if (!res) {
      console.error('no data from photoprism login')
      return
    }
    console.log('Saving tokens')
    if (res.apiToken) {
      localStorage.setItem(photoPrismTokenKey, res.apiToken)
    }
    if (res.previewToken) {
      localStorage.setItem(photoPrismPreviewTokenKey, res.previewToken)
    }
  })
  .catch((error) => {
    console.error('error logging in to photoprism', error)
  })

export function usePhotoPrismLogin() {
  return useQuery({
    queryKey: ['photoprism-login'],
    queryFn: async () => await photoPrismLogin()
  })
}

registerOAuth2Worker().catch((error) => {
  console.error('error registering pass SW', error)
})

// this callback wraps the `authorize` function and will be invoked when the user clicks for example on a login button
export function authorizeCallback(onSuccess?: () => void) {
  console.log('authorizing')
  authorize({
    resource_server,
    client_id: 'swagger-ui',
    authorization_endpoint: `${authorization_server}/oauth/authorize`,
    token_endpoint: `${authorization_server}/oauth/token`,
    redirect_uri: `${app_server}/oauth-redirect.html`,
    requested_scopes: [
      `${authorization_server}/scopes/petstore/write`,
      `${authorization_server}/scopes/petstore/read`
    ]
  })
    .then(() => {
      console.log('authorized')
      onSuccess?.()
    })
    .catch((error) => {
      console.error('error authorizing', error)
    })
}

export async function fetchPets() {
  const response = await petstoreClient['/pets'].get()
  if (response.status === 401) {
    throw new Error('Unauthorized')
  }
  if (response.status !== 200) {
    throw new Error('Failed to fetch pets')
  }
  const pets = await response.json()
  return pets
}

export async function fetchMe() {
  const response = await siteClient['/whoami'].get()

  if (response.status === 401) {
    throw new Error('Unauthorized')
  }
  if (response.status !== 200) {
    throw new Error('Failed to fetch user')
  }

  return await response.json()
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () =>
      await fetchMe()
        .catch(async (error) => {
          console.error('error fetching user', error)
          if (error.message === 'Unauthorized') {
            clearToken(resource_server)
              .catch((error) => {
                console.error('error clearing token', error)
              })
          }
          return null;
        })
  })
}
