import { createAccountRequest, CreateSyncRequest, loginAccountRequest } from '@/types/api'
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

export async function logout() {
  return request.post<Account>('/account/logout')
}

export async function getAccounts() {
  return request.get<Account[]>('/account/list')
}

export async function syncChatPartner(req: CreateSyncRequest) {
  return request.post('/account/chat/sync', req)
}

export async function getChatPartners() {
  return request.get('/account/chat/partners')
}
