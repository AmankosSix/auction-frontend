import Service from './Service'
import { ApiError, ApiResponse } from '@/service/types'
import { CommonMutationTypes as cmt } from '@/store/common/mutations-types'

export type SignUp = {
  name: string,
  email: string,
  phone: string,
  password: string
}

export interface SignUpResponse {
  message: string
}

export interface SignIn {
  email: string,
  password: string
}

export interface SignInResponse {
  accessToken: string
}

export class AuthService extends Service {
  private signUp = '/auth/sign-up'
  private signIn = '/auth/sign-in'

  async SignUp<SignUpResponse> (body: SignUp): Promise<ApiResponse<SignUpResponse | ApiError>> {
    const config = this.config<SignUp>('POST', body)

    const user: ApiResponse<SignUpResponse | ApiError> = await this.request<SignUpResponse>(this.signUp, config)

    if (user.result === 'success') {
      this.store.commit(cmt.SET_SNACKBAR, {
        color: 'green',
        message: 'You registered successfully'
      })
    }

    return user
  }

  async SignIn<SignInResponse> (body: SignIn): Promise<ApiResponse<SignInResponse | ApiError>> {
    const config = this.config<SignIn>('POST', body)

    const user: ApiResponse<SignInResponse | ApiError> = await this.request<SignInResponse>(this.signIn, config)

    if (user.result === 'success') {
      this.store.commit(cmt.SET_SNACKBAR, {
        color: 'green',
        message: 'You authenticated successfully'
      })
    }

    return user
  }
}
