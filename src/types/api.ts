export interface createAccountRequest {
  first_name: string
  last_name: string
  user_name: string
  email: string
  password: string
}

export interface loginAccountRequest {
  email: string
  password: string
}

export interface CreateSyncRequest {
  sender_user_id: string
  receiver_user_id: string
}
