import { Base } from './common'

export interface Account extends Base {
  first_name: string
  last_name: string
  user_name: string
  email: string
}

export interface Chat {
  sender_id: string
  sender_user_name: string
  receiver_user_name: string
  receiver_id: string
  message: string
  seen: boolean
}
