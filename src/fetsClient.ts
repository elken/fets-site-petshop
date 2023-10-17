import { createClient, type OASModel, type NormalizeOAS } from 'fets'
import type openAPIDoc from './oas'
import { resource_server } from './constants'

export type Pet = OASModel<NormalizeOAS<typeof openAPIDoc>, 'Pet'>

export const client = createClient<NormalizeOAS<typeof openAPIDoc>>({
  endpoint: `${resource_server}/petstore`
})
