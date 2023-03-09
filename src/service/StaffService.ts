import Service from './Service'
import { ApiError, ApiResponse } from '@/service/types'

export interface StaffUpdateInfo {
  name: string,
  phone: string
}

export class StaffService extends Service {
  private path = '/staff'
  private info = `${this.path}/info`

  async UpdateStaff<T> (uuid: string, body: T): Promise<ApiResponse<T | ApiError>> {
    const config = this.config<T>('POST', body)

    const staff: ApiResponse<T | ApiError> = await this.request<T>(`${this.info}/${uuid}`, config)

    return staff
  }
}
