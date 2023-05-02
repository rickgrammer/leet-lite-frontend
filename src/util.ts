import {AxiosError} from "axios"

export interface ErrorData {
  errors: {
    msg: string
  }[]
}
export const parseErrorMessage = (error: AxiosError<ErrorData>) => {
  return error.response?.data?.errors?.[0]?.msg || 'Something went wrong'
}

export const getSession = () => {
  const cookie = document.cookie
  const session = {} as any
  for (const c of cookie.split(';')) {
    const [k, v] = c.split('=')
    session[k] = v
  }
  return session
}
