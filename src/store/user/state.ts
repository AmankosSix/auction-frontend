import { User } from '@/helpers/authInit'

export type State = {
  user: User | null,
  token: string,
  roles: string[]
}

export const state: State = {
  user: null,
  token: localStorage.getItem('token') || '',
  roles: ['user', 'admin']
}
