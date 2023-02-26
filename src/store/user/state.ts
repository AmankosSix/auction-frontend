import { User } from '@/helpers/authInit'

export type State = {
  user: User | null,
  token: string
}

export const state: State = {
  user: null,
  token: localStorage.getItem('token') || ''
}
