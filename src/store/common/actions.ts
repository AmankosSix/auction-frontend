import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { State } from './state'
import { CommonMutationTypes as CMT } from './mutations-types'
import { Mutations } from './mutation'
import { Snackbar } from './types'

type CommonActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [CMT.SET_SNACKBAR_DATA](
    { commit }: CommonActionContext,
    snackbar: Snackbar
  ): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  [CMT.SET_SNACKBAR_DATA] ({ commit }, snackbar: Snackbar) {
    commit(CMT.SET_SNACKBAR_DATA, snackbar)
  }
}
