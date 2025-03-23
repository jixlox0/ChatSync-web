import { AxiosResponse } from 'axios'

export interface SQLTime {
  Time: Date
  Valid: boolean
}

export interface APIResponse<T> extends AxiosResponse<T> {
  data: T
  total?: number
  success?: boolean
  error_code?: number
  error_message?: string
}

export interface Base {
  id: string
  created: number
  updated: number
}
