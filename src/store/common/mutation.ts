import { MutationTree } from 'vuex'
import { Snackbar } from './types'
import { State } from './state'
import { CommonMutationTypes as CMT } from './mutations-types'

export type Mutations<S = State> = {
  [CMT.SET_SNACKBAR_DATA] (state: S, data: Snackbar): void
}

export const mutations: MutationTree<State> & Mutations = {
  [CMT.SET_SNACKBAR_DATA] (state: State, data: Snackbar) {
    state.snackbar = data
  }
}
