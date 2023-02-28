import Service from './Service'
import { ApiError, ApiResponse } from '@/service/types'

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

    return user
  }

  async SignIn<T> (body: SignIn): Promise<ApiResponse<T | ApiError>> {
    const config = this.config<SignIn>('POST', body)

    const res: ApiResponse<T | ApiError> = await this.request<T>(this.signIn, config)

    return res
  }

  async UserInfo<T> (): Promise<ApiResponse<T | ApiError>> {
    const config = this.config<SignIn>('GET')

    const user: ApiResponse<T | ApiError> = await this.request<T>(this.userInfo, config)

    return user
  }
}
