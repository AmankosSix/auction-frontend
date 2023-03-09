export type ApiMethod = 'POST' | 'GET' | 'PUT' | 'DELETE'

export type ApiResult = 'success' | 'failure'

export type ApiError = {
  errorCode: number,
  description: string
}

export type ApiResponse<T> = {
  result: ApiResult,
  response: T | ApiError
}

export interface Response {
  message: string
}
