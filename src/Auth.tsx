import * as React from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import { API_URL, CLIENT_TOKEN_NAME } from "./config"
import axios from "axios"
import type { RootState } from "./store"
import type { AuthContextType } from "./types"
import { useSelector } from "react-redux"
import { logoutUser } from "./features/authSlice"


let AuthContext = React.createContext<AuthContextType>(null!)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<any>(null)

  let value = { user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  return React.useContext(AuthContext)
}

const AuthStatus = () => {
  const navigate = useNavigate()
  const authToken = Cookies.get(CLIENT_TOKEN_NAME)
  const authState = useSelector((state: RootState) => state.auth)

  if (!authToken) {
    return <p>You are not logged in.</p>
  }

  return (
    <p>
      Welcome {authState.email}!{" "}
      <button
        onClick={() => {
          logoutUser(navigate("/"))
        }}
      >
        Sign out
      </button>
    </p>
  )
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
      window.location.replace('/')
    })

  return children
}

export { useAuth, AuthProvider, AuthStatus, RequireAuth, RequireAdmin }
