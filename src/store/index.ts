import { createStore } from 'vuex'

import { store as common, CommonStore, State as CommonState } from '@/store/common'

export type RootState = {
  common: CommonState
}

export type Store = CommonStore<Pick<RootState, 'common'>>

export const store = createStore({
  modules: {
    common
  }
})

export function useStore (): Store {
  return store as Store
}
