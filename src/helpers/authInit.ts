import { AccountService } from '@/service/AccountService'
import { useStore } from '@/store'
import { UserMutationTypes as UMT } from '@/store/user/mutations-types'
import { DictionariesService, Roles } from '@/service/DictionariesService'

const aS = new AccountService()
const dS = new DictionariesService()
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
    if (!store.getters.token) return
    //
    // aS.setStaff(store.getters.isStaff)

    const user = await aS.UserInfo<User>()

    if ('errorCode' in user.response) throw user

    store.commit(UMT.SET_USER, user.response)
  } catch (e) {
    store.commit(UMT.RESET_USER)
  }
}

export async function GetAllRoles () {
  try {
    if (!store.getters.token) return

    const res = await dS.GetAllRoles<Roles[]>()

    if ('errorCode' in res.response) throw res

    store.commit(UMT.SET_ROLES, res.response)
  } catch (e) {
    console.log(e)
  }
}

export async function Logout () {
  await store.commit(UMT.RESET_USER)
}
