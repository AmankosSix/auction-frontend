import { GetterTree } from 'vuex'
import { Snackbar } from './types'
import { RootState } from '@/store'
import { State } from './state'

export type Getters = {
  snackbars(state: State): Snackbar[]
}

export const getters: GetterTree<State, RootState> & Getters = {
  snackbars: (state) => state.snackbars
}
