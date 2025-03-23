import cfg from '@/utils/config'
import axios, { AxiosInstance } from 'axios'

import { waitFor } from '@/utils/common'
import { APIResponse } from '@/types/common'

const request: AxiosInstance = axios.create({
  baseURL: cfg.api_url,
  timeout: cfg.timeout,
})

request.interceptors.request.use(
  async (config) => {
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

    const res: APIResponse<any> = {
      ...error,
      success: false,
      data: error.response.data,
      total: error.response.total,
      error_code: error.response.error_code,
      error_message: error.response.error_message,
    }
    return Promise.reject(res)
  }
)

export default request
