import Service from './Service'
import { ApiError, ApiResponse } from '@/service/types'

export type Roles = {
  uuid: string,
  role: string
}

export class DictionariesService extends Service {
  private path = '/dictionaries'
  private roles = `${this.path}/roles`

  async GetAllRoles<T> (): Promise<ApiResponse<T | ApiError>> {
    const config = this.config<Roles>('GET')

    const roles: ApiResponse<T | ApiError> = await this.request<T>(this.roles, config)

    return roles
  }
}
