import Service from './Service'
import { ApiError, ApiResponse } from '@/service/types'

export type Role = {
  uuid: string,
  role: string
}

export type RoleResponse = {
  list: Role[],
  current: string
}

export class DictionariesService extends Service {
  private path = '/dictionaries'
  private roles = `${this.path}/roles`

  async GetAllRoles<T> (): Promise<ApiResponse<ApiError | T>> {
    const config = this.config('GET')

    return await this.request<T>(this.roles, config)
  }
}
