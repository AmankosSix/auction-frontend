import { MutationTree } from 'vuex'
import { User } from '@/helpers/authInit'
import { State, defaultUser } from '@/store/user/state'
import { UserMutationTypes as UMT } from '@/store/user/mutations-types'
import { RoleResponse } from '@/service/DictionariesService'

export type Mutations<S = State> = {
  [UMT.SET_USER] (state: S, data: User): void
  [UMT.RESET_USER] (state: S): void
  [UMT.SET_TOKEN] (state: S, token: string): void
  [UMT.SET_ROLES] (state: S, role: RoleResponse): void
}

export const mutations: MutationTree<State> & Mutations = {
  [UMT.SET_USER] (state: State, user: User) {
    state.user = user
  },
  [UMT.RESET_USER] (state: State) {
    state.user = defaultUser
    state.token = ''
    localStorage.removeItem('token')
  },
  [UMT.SET_TOKEN] (state: State, token: string) {
    state.token = token
    localStorage.setItem('token', token)
  },
  [UMT.SET_ROLES] (state: State, role: RoleResponse) {
    state.role = role
    role.list.forEach(el => (state.roles[el.role] = el.role))
  }
}
