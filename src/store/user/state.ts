import { User } from '@/helpers/authInit'
import { Roles } from '@/service/DictionariesService'

export type State = {
  user: User,
  token: string,
  rolesList: Roles[]
  roles: { [key: string]: string }
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
  rolesList: [],
  roles: {}
}
