import { useQuery } from '@tanstack/react-query'
import { siteClient, petstoreClient } from '../fetsClient'
import { registerOAuth2Worker, authorize, clearToken } from '@juxt/pass'
import {
  APP_SERVER,
  AUTHORIZATION_SERVER,
  photoPrismPreviewTokenKey,
  photoPrismTokenKey,
  PHOTO_SERVER,
  RESOURCE_SERVER
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
  const res: PhotoPrismLoginResponse = await fetch(`${PHOTO_SERVER}/api/v1/session`, {
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
      return await res.json()
    })
    .catch((error) => {
      console.error('error logging in to photoprism', error)
      return {
        apiToken: null,
        previewToken: null
      }
    })

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
  authorize({
    resource_server: RESOURCE_SERVER,
    client_id: 'petstore',
    authorization_endpoint: `${AUTHORIZATION_SERVER}/oauth/authorize`,
    token_endpoint: `${AUTHORIZATION_SERVER}/oauth/token`,
    redirect_uri: `${APP_SERVER}/oauth-redirect.html`,
    requested_scopes: [
      `${AUTHORIZATION_SERVER}/scopes/petstore/write`,
      `${AUTHORIZATION_SERVER}/scopes/petstore/read`
    ]
  })
    .then(() => {
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
            clearToken(RESOURCE_SERVER)
              .catch((error) => {
                console.error('error clearing token', error)
              })
          }
          return null;
        })
  })
}
