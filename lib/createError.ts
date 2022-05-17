export type ErrorResponse = {
  message: string
  success: false
  errors: {
    [key: string]: string
  }
}
export interface ErrorWithData extends Error {
  data: ErrorResponse
}

export default function createError(data: ErrorResponse): ErrorWithData {
  const error = new Error(data.message) as ErrorWithData
  error.data = data
  return error
}
