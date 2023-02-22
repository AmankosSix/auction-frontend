import { GetterTree } from 'vuex'
import { Snackbar } from '@/store/common/types'
import { RootState } from '@/store'
import { State } from './state'

export type Getters = {
  snackbar(state: State): Snackbar
}

export const getters: GetterTree<State, RootState> & Getters = {
  snackbar: (state) => state.snackbar
}
