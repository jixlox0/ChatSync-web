import { createAccountRequest } from '@/types/api'
import request from './request'

export async function createAccount(req: createAccountRequest) {
  return request.post<string>('/account/create', req)
}
