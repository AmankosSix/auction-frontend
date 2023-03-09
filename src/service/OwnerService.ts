import Service from './Service'
import { ApiError, ApiResponse, Response } from '@/service/types'

export class OwnerService extends Service {
  private path = '/owner/staff'
  private list = `${this.path}/list`
  private signUp = `${this.path}/sign-up`

  async GetStaff<T> (): Promise<ApiResponse<T | ApiError>> {
    const config = this.config<T>('GET')

    const res: ApiResponse<T | ApiError> = await this.request<T>(this.list, config)

    return res
  }

  async SignUp<T> (body: T): Promise<ApiResponse<Response | ApiError>> {
    const config = this.config<T>('POST', body)

    const staff: ApiResponse<Response | ApiError> = await this.request<Response>(this.signUp, config)

    return staff
  }
}
