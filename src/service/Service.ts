import { ApiError, ApiMethod, ApiResponse } from './types'
import { useStore } from '@/store'
import { CommonMutationTypes as cmt } from '@/store/common/mutations-types'

const domain = process.env.VUE_APP_HTTP_SERVER || ''

export default class Service {
  protected store = useStore()
  private apiV1 = `${domain}/api/v1`
  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  public async request <TResponse> (
    url: string,
    config: RequestInit
  ) : Promise<ApiResponse<TResponse | ApiError>> {
    let response
    try {
      response = await fetch(`${this.apiV1}${url}`, config)
      if (!response.ok) throw response

      const json = await response.json()
      return {
        response: json,
        result: 'success'
      }
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
        message: error?.response?.description,
        icon: 'alert-circle-outline'
      })

      return error
    }
  }

  public config<T> (method: ApiMethod, body?: T): RequestInit {
    return {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${this.store.getters.token}`
      },
      method,
      body: JSON.stringify(body)
    }
  }
}
