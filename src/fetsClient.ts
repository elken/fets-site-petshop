import { createClient, type OASModel, type NormalizeOAS } from 'fets'
import type openAPIDoc from './oas'
import { RESOURCE_SERVER } from './constants'

export type Pet = OASModel<NormalizeOAS<typeof openAPIDoc>, 'Pet'>

export const petstoreClient = createClient<NormalizeOAS<typeof openAPIDoc>>({
  endpoint: `${RESOURCE_SERVER}/petstore`
})

export const siteClient = createClient({
  endpoint: `${RESOURCE_SERVER}/_site`
})
