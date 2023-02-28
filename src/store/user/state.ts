import { User } from '@/helpers/authInit'

export type State = {
  user: User,
  token: string,
  roles: string[]
}

export const defaultUser = {
  uuid: '',
  name: '',
  email: '',
  phone: '',
  role: ''
}

export const state: State = {
  user: defaultUser,
  token: localStorage.getItem('token') || '',
  roles: ['user', 'admin']
}
