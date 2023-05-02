import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../contexts/auth";
import {signout} from "../api/auth";
import {ToasterContext} from "../contexts/toast";
import {ErrorData, parseErrorMessage} from "../util";
import {AxiosError} from "axios";
import {flushSync} from "react-dom";

const Navbar = () => {
  const user = useContext(AuthContext)
  const navigate = useNavigate()
  const toast = useContext(ToasterContext)
  const handleSignout = async () => {
    try {
      await signout()
    } catch (e) {
      toast.current?.show({
        severity: 'error',
        summary: parseErrorMessage(e as AxiosError<ErrorData>)
      })
    }
   flushSync(() => {
      user?.setAuthState({
        isAdmin: false,
        isLoggedIn: false,
        email: ''
      })
    })
    navigate('/sign-in')
  }
  return (
    <nav
      className="p-3 bg-purple-600 text-white relative mb-2"
    >
      {
        user?.authState.isLoggedIn ?
          <div className="flex justify-content-between">
            <div className="flex justify-content-between gap-4">
              <span className="uppercase font-bold"> Leet Lite </span>
              <span className="font-bold">|</span>
              <span className="cursor-pointer" onClick={() => navigate("/questions" )}> Questions </span>
            </div>
            <div className="flex">
              <span className="cursor-pointer top-2 right-0" onClick={handleSignout}>Sign out</span>
            </div>
          </div>
          :
          <span className="uppercase font-bold">Leet Lite</span>
      }
    </nav>
  )
}

export default function() {
  return (
    <div className="mx-auto w-full md:w-6">
      <Navbar />
      {/* navigation */}
      <div>
        <Outlet />
      </div>
    </div>
  )
}
