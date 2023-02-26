import { createStore } from 'vuex'

import { store as common, CommonStore, State as CommonState } from '@/store/common'
import { store as user, UserStore, State as userState } from '@/store/user'

export type RootState = {
  common: CommonState
  user: userState
}

export type Store = CommonStore<Pick<RootState, 'common'>>
  & UserStore<Pick<RootState, 'user'>>

export const store = createStore({
  modules: {
    common,
    user
  }
})

export function useStore (): Store {
  return store as Store
}
