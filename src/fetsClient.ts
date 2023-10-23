import { createClient, type OASModel, type NormalizeOAS } from 'fets'
import type openAPIDoc from './oas'
import { resource_server } from './constants'

export type Pet = OASModel<NormalizeOAS<typeof openAPIDoc>, 'Pet'>

export const petstoreClient = createClient<NormalizeOAS<typeof openAPIDoc>>({
  endpoint: `${resource_server}/petstore`
})

export const siteClient = createClient({
  endpoint: `${resource_server}/_site`
})
