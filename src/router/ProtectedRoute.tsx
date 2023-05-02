import {useContext, useEffect} from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/auth";
import {ToasterContext} from "../contexts/toast";
import {getSession} from "../util";

export default function () {
  const user = useContext(AuthContext)
  const toast = useContext(ToasterContext)
  const navigate = useNavigate()

  useEffect(() => {
    const {sessionId, isAdmin, email} = getSession()
    if (sessionId && !user?.authState.isLoggedIn) {
      user?.setAuthState({
        isAdmin,
        isLoggedIn: true,
        email
      })
    }
  }, [])

  return (
    user?.authState.isLoggedIn ? <Outlet /> : <Navigate to="sign-in"></Navigate>
  )
}

