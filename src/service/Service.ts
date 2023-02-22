import { ApiResponse, ApiError, ApiMethod } from './types'

const domain = process.env.VUE_APP_HTTP_SERVER || ''

export default class Service {
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
          description: 'Network Error!'
        },
        result: 'failure'
      }

      if (response?.status && response?.statusText) {
        error.response.errorCode = response.status
        error.response.description = response.statusText
      }

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
