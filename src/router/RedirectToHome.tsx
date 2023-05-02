import {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "../contexts/auth";

export default function () {
  const user = useContext(AuthContext)

  return (
    user?.authState.isLoggedIn ? <Navigate to="questions"></Navigate> : <Outlet />
  )
}

