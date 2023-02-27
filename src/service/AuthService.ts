import Service from './Service'
import { ApiError, ApiResponse, ApiResult } from '@/service/types'
import { CommonMutationTypes as CMT } from '@/store/common/mutations-types'
import { UserMutationTypes as UMT } from '@/store/user/mutations-types'
import { GetUserInfo } from '@/helpers/authInit'

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
  private userInfo = '/user/info'

  async SignUp<T> (body: SignUp): Promise<ApiResponse<T | ApiError>> {
    const config = this.config<SignUp>('POST', body)

    const user: ApiResponse<T | ApiError> = await this.request<T>(this.signUp, config)

    if (user.result === 'success') {
      this.store.commit(CMT.SET_SNACKBAR, {
        color: 'green',
        message: 'You registered successfully'
      })
    }

    return user
  }

  async SignIn (body: SignIn): Promise<ApiResult> {
    const config = this.config<SignIn>('POST', body)

    const user: ApiResponse<SignInResponse | ApiError> = await this.request<SignInResponse>(this.signIn, config)

    if (!('errorCode' in user.response)) {
      this.store.commit(CMT.SET_SNACKBAR, {
        color: 'green',
        message: 'You authenticated successfully',
        icon: 'check-circle-outline'
      })
      this.store.commit(UMT.SET_TOKEN, user.response.accessToken)
      await GetUserInfo()
    }

    return user.result
  }

  async UserInfo<T> (): Promise<ApiResponse<T | ApiError>> {
    const config = this.config<SignIn>('GET')

    const user: ApiResponse<T | ApiError> = await this.request<T>(this.userInfo, config)

    if (user.result === 'success') {
      this.store.commit(CMT.SET_SNACKBAR, {
        color: 'green',
        message: 'User info successfully received',
        icon: 'check-circle-outline'
      })
    }

    return user
  }
}
