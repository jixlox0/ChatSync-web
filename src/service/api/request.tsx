import cfg from '@/utils/config'
import axios, { AxiosInstance } from 'axios'

import { waitFor } from '@/utils/common'
import { APIResponse } from '@/types/common'
import { LocalCache } from '../cache'
import { CACHE_KEY_TOKEN } from '@/utils/constants'

const request: AxiosInstance = axios.create({
  baseURL: cfg.api_url,
  timeout: cfg.timeout,
})

request.interceptors.request.use(
  async (config) => {
    const token = LocalCache.Instance.getCache<string>(CACHE_KEY_TOKEN)
    if (token) config.headers['X-Access-Token'] = token

    if (cfg.environment === 'local')
      await waitFor(parseInt((Math.random() * (1000 - 200) + 200).toString()))

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  (response): APIResponse<any> => {
    let token = response.headers['x-access-token'] || response.headers['X-Access-Token']
    if (token) LocalCache.Instance.setCache(CACHE_KEY_TOKEN, token)

    const res: APIResponse<any> = {
      ...response,
      success: true,
      data: response.data.data,
      total: response.data.total,
      error_code: response.data.error_code,
      error_message: response.data.error_message,
    }
    return res
  },
  (error) => {
    if (!error.response) return alert('Network connection issue')

    let token = error.response.headers['x-access-token'] || error.response.headers['X-Access-Token']
    if (token) LocalCache.Instance.setCache(CACHE_KEY_TOKEN, token)

    const res: APIResponse<any> = {
      ...error,
      success: false,
      data: error.response.data,
      total: error.response.total,
      error_code: error.response.error_code,
      error_message: error.response.error_message ?? 'Network error',
    }
    return Promise.reject(res)
  }
)

export default request
