import * as React from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import { API_URL, CLIENT_TOKEN_NAME } from "../config"
import axios from "axios"
import type { RootState } from "../store"
import { useSelector, useDispatch } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit";
import { logoutUser, bounceUser } from "../features/authSlice"


interface AuthContextType {
  user: any
  signout: (callback: VoidFunction) => void
}

let AuthContext = React.createContext<AuthContextType>(null!)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.email)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  let signout = (callback: VoidFunction) => {
    dispatch(logoutUser(() => callback)) // Dispatch the logoutUser action
    callback() // Redirect to the navigation path
  }

  let value = { user, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  return React.useContext(AuthContext)
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation()
  const authToken = Cookies.get(CLIENT_TOKEN_NAME)

  if (!authToken) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function RequireAdmin({ children }: { children: JSX.Element }) {
  let location = useLocation()
  const authToken = Cookies.get(CLIENT_TOKEN_NAME)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!authToken) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const endpoint = `${API_URL}/admin`
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }

  axios.get(endpoint, config)
    .then()
    .catch(function (_) {
      dispatch(bounceUser(() => navigate("/")))
    })

  return children
}

export { useAuth, AuthProvider, RequireAuth, RequireAdmin }
