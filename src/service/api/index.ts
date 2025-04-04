import { createAccountRequest, loginAccountRequest } from '@/types/api'
import request from './request'
import { Account } from '@/types/core'

export async function createAccount(req: createAccountRequest) {
  return request.post<string>('/account/create', req)
}

export async function loginAccount(req: loginAccountRequest) {
  return request.post<string>('/account/login', req)
}

export async function getAccount() {
  return request.get<Account>('/account/me')
}

export async function getAccounts() {
  return request.get<Account[]>('/account/list')
}
