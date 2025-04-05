import { Base, SQLTime } from './common'

export interface Account extends Base {
  first_name: string
  last_name: string
  user_name: string
  email: string
}

export interface Chat extends Base {
  sender_user_id: string
  receiver_user_id: string
  first_name: string
  last_name: string
  user_name: string
  synced: boolean
  synced_at: SQLTime
  seen: boolean
  seen_at: SQLTime
}

export interface ChatMessage {
  sender_id: string
  sender_user_name: string
  receiver_user_name: string
  receiver_id: string
  message: string
  seen: boolean
}
