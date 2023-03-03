import { GetterTree } from 'vuex'
import { User } from '@/helpers/authInit'
import { RootState } from '@/store'
import { State } from './state'

export type Getters = {
  user(state: State): User,
  isAuthenticated(state: State): boolean,
  isUser(state: State): boolean,
  isStaff(state: State): boolean,
  token(state: State): string,
}

export const getters: GetterTree<State, RootState> & Getters = {
  user: (state) => state.user,
  isAuthenticated: (state) => !!state.user.email,
  isUser: (state) => state.user.role === state.roles?.user,
  isStaff: (state) => state.user?.role === state.roles?.staff ||
    state.user?.role === state.roles?.owner,
  isOwner: (state) => state.user?.role === state.roles?.owner,
  token: (state) => state.token
}
