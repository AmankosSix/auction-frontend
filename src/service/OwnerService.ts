import Service from './Service'
import { ApiError, ApiResponse } from '@/service/types'

export class OwnerService extends Service {
  private path = '/owner/staff'
  private list = `${this.path}/list`

  async GetStaff<T> (): Promise<ApiResponse<T | ApiError>> {
    const config = this.config<T>('GET')

    const res: ApiResponse<T | ApiError> = await this.request<T>(this.list, config)

    return res
  }
}
