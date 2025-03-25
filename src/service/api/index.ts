import { createAccountRequest, loginAccountRequest } from '@/types/api'
import request from './request'

export async function createAccount(req: createAccountRequest) {
  return request.post<string>('/account/create', req)
}

export async function loginAccount(req: loginAccountRequest) {
  return request.post<string>('/account/login', req)
}
