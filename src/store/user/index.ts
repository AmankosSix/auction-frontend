import {
  Store as VuexStore,
  CommitOptions,
  Module
} from 'vuex'

import { RootState } from '@/store'
import { state } from '@/store/user/state'
import { getters, Getters } from '@/store/user/getters'
import { mutations, Mutations } from '@/store/user/mutation'

import type { State } from '@/store/user/state'

export { State }

export type UserStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export const store: Module<State, RootState> = {
  mutations,
  state,
  getters
}
