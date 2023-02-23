import { ApiResponse, ApiError, ApiMethod } from './types'
import { useStore } from '@/store'
import { CommonMutationTypes as cmt } from '@/store/common/mutations-types'

const domain = process.env.VUE_APP_HTTP_SERVER || ''

export default class Service {
  private apiV1 = `${domain}/api/v1`
  private token = localStorage.getItem('token') || ''
  private headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  }

  protected store = useStore()

  public async request <TResponse> (
    url: string,
    config: RequestInit
  ) : Promise<ApiResponse<TResponse | ApiError>> {
    let response
    try {
      response = await fetch(`${this.apiV1}${url}`, config)
      if (!response.ok) throw response.statusText

      const json = await response.json()
      const result: ApiResponse<TResponse> = {
        response: json,
        result: 'success'
      }

      return result
    } catch (e) {
      const error: ApiResponse<ApiError> = {
        response: {
          errorCode: 0,
          description: 'ERROR! Connection with server refused, please try again later'
        },
        result: 'failure'
      }

      if (response?.status && response?.statusText) {
        error.response.errorCode = response.status
        error.response.description = response.statusText
      }

      this.store.commit(cmt.SET_SNACKBAR, {
        color: 'red',
        message: error?.response?.description
      })

      return error
    }
  }

  public config<T> (method: ApiMethod, body: T): RequestInit {
    return {
      headers: this.headers,
      method,
      body: JSON.stringify(body)
    }
  }
}
