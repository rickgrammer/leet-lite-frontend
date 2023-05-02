import {createContext, ReactNode, useState} from "react"

export interface AuthState {
  email: string
  isLoggedIn: boolean
  isAdmin: boolean
}

export type Auth = {
  authState: AuthState
  setAuthState: (authState: AuthState) => void
}

export const AuthContext = createContext<Auth|null>(null)

const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [authState, setAuthState] = useState({email: '', isLoggedIn: false, isAdmin: false})
  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
