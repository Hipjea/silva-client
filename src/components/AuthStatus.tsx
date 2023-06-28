import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { CLIENT_TOKEN_NAME } from '../config'
import type { RootState } from '../store'
import { useSelector } from 'react-redux'
import { useAuth } from './Auth'
import { ButtonElement } from './ButtonElement'


export const AuthStatus = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const authToken = Cookies.get(CLIENT_TOKEN_NAME)
  const authState = useSelector((state: RootState) => state.auth)

  if (!authToken) {
    return <p>You are not logged in.</p>
  }

  return (
    <p>
      Welcome {authState.email || localStorage.getItem("user")}
      <br />
      <ButtonElement label="Sign out" callback={() => auth.signout(() => navigate("/"))} />
    </p>
  )
}