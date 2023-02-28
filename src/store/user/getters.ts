import { GetterTree } from 'vuex'
import { User } from '@/helpers/authInit'
import { RootState } from '@/store'
import { State } from './state'

export enum roles {
  USER = 'user',
  ADMIN = 'admin'
}

export type Getters = {
  user(state: State): User | null,
  isAuthenticated(state: State): boolean,
  isUser(state: State): boolean,
  isAdmin(state: State): boolean,
  token(state: State): string,
  roles(state: State): string[]
}

export const getters: GetterTree<State, RootState> & Getters = {
  user: (state) => state.user,
  isAuthenticated: (state) => !!state.user,
  isUser: (state) => state.user?.role === roles.USER,
  isAdmin: (state) => state.user?.role === roles.ADMIN,
  token: (state) => state.token,
  roles: (state) => state.roles
}
