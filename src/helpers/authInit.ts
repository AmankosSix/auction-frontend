import { AuthService } from '@/service/AuthService'
import { useStore } from '@/store'
import { UserMutationTypes as UMT } from '@/store/user/mutations-types'

const aS = new AuthService()
const store = useStore()

export interface User {
  uuid: string,
  name: string,
  email: string,
  phone: string,
  role: string
}

export async function GetUserInfo () {
  try {
    const user = await aS.UserInfo<User>()
    if ('errorCode' in user.response) {
      throw user
    }
    store.commit(UMT.SET_USER, user.response)
  } catch (e) {
    store.commit(UMT.RESET_USER)
  }
}

export async function Logout () {
  store.commit(UMT.RESET_USER)
}
