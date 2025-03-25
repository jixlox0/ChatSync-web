import { Base } from './common'

export interface Account extends Base {
  first_name: string
  last_name: string
  user_name: string
  email: string
}
