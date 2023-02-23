import Service from './Service'
import { ApiError, ApiResponse } from '@/service/types'
import { CommonMutationTypes as cmt } from '@/store/common/mutations-types'

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

    if (user.result === 'success') {
      this.store.commit(cmt.SET_SNACKBAR, {
        color: 'green',
        message: 'You authenticated successfully'
      })
    }

    return user
  }
}
