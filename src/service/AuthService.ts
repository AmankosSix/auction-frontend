import Service from './Service'
import { ApiError, ApiResponse } from '@/service/types'
import { useStore } from '@/store'
import { Snackbar } from '@/store/common/types'
import { CommonMutationTypes as cmt } from '@/store/common/mutations-types'

const store = useStore()

export type Registration = {
  Name: string,
  Email: string,
  Phone: string,
  Password: string
}

export interface SingIn {
  email: string,
  password: string
}

export interface SingInResponse {
  accessToken: string
}

export class AuthService extends Service {
  private signUp = '/auth/sign-up'
  private signIn = '/auth/sign-in'

  async SignIn<SingInResponse> (body: SingIn): Promise<ApiResponse<SingInResponse | ApiError>> {
    const config = this.config<SingIn>('POST', body)

    const user: ApiResponse<SingInResponse | ApiError> = await this.request<SingInResponse>(this.signIn, config)

    const snackbar: Snackbar = {
      status: true,
      text: 'You authenticated successfully',
      timeout: 2,
      color: 'green'
    }
    store.commit(cmt.SET_SNACKBAR_DATA, snackbar)

    return user
  }
}
