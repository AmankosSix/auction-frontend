import { MutationTree } from 'vuex'
import { Snackbar } from './types'
import { State } from './state'
import { CommonMutationTypes as CMT } from './mutations-types'

export type Mutations<S = State> = {
  [CMT.SET_SNACKBAR] (state: S, data: Snackbar): void
  [CMT.RESET_SNACKBAR] (state: S, index: number): void
}

export const mutations: MutationTree<State> & Mutations = {
  [CMT.SET_SNACKBAR] (state: State, snackbar: Snackbar) {
    snackbar.id = Date.now()
    snackbar.show = true
    snackbar.icon = snackbar.icon || ''
    state.snackbars.push(snackbar)
  },
  [CMT.RESET_SNACKBAR] (state: State, index: number) {
    state.snackbars = state.snackbars.filter((el) => el.id !== index)
  }
}
