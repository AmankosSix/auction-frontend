import { User } from '@/helpers/authInit'
import { RoleResponse } from '@/service/DictionariesService'

export type State = {
  user: User,
  token: string,
  role: RoleResponse
  roles: { [key: string]: string }
}

export const defaultUser: User = {
  uuid: '',
  name: '',
  email: '',
  phone: '',
  role: ''
}

export const defaultRole: RoleResponse = {
  list: [],
  current: ''
}

export const state: State = {
  user: defaultUser,
  token: localStorage.getItem('token') || '',
  role: defaultRole,
  roles: {}
}
