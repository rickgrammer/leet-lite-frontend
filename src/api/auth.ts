import api from ".";

interface SignInPayload {
  email: string
  password: string
}

interface Profile {
  email: string
  isAdmin: boolean
}

type SignupPayload = SignInPayload

export async function signIn(signIn: SignInPayload) {
  const url = '/signin'
  const resposne = await api.post<SignInPayload>(url, signIn)
  return resposne.data
}

export async function signUp(signUp: SignupPayload) {
  const url = '/signup'
  const response = await api.post<SignupPayload>(url, signUp)
  return response
}

export async function signUpAdmin(signUp: SignupPayload) {
  const url = '/signup/admin'
  const response = await api.post<SignupPayload>(url, signUp)
  return response
}

export async function signInAdmin(signIn: SignInPayload) {
  const url = '/signin/admin'
  const resposne = await api.post<SignInPayload>(url, signIn)
  return resposne.data
}

export async function profile() {
  const url = '/profile'
  const response = await api.get<Profile>(url)
  return response.data
}

export async function signout() {
  const url = '/signout'
  const response = await api.post(url)
  document.cookie = ''
  return response.data
}
