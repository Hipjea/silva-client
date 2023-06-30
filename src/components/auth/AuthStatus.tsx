import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { CLIENT_TOKEN_NAME } from '../../config'
import type { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { useAuth } from './Auth'
import { StyledButton } from '../ButtonElement'
import styled from '@emotion/styled'
import { theme } from '../../config'


const Basic = ({ className }: any) => <span className={className}>Some text</span>

const StyledBasic = styled(Basic)`
  color: ${theme.colors.secondary}
`

export const AuthStatus = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const authToken = Cookies.get(CLIENT_TOKEN_NAME)
  const authState = useSelector((state: RootState) => state.auth)
  const [isPushed, setIsPushed] = useState<boolean>(false)

  const handleSubmit = () => {
    setIsPushed(true)
    auth.signout(() => {
      navigate("/")
      setIsPushed(false)
    })
  }

  if (!authToken) {
    return (
      <>
        <p>You are not logged in.<br />Sign in or <Link to="/register">register</Link>.</p>
      </>
    )
  }

  return (
    <p>
      Welcome {authState.email || localStorage.getItem("user")}
      <br />
      <StyledButton
        label="Sign out"
        callback={() => handleSubmit()}
        isPushed={isPushed}
        disabled={isPushed}
      />
      <StyledBasic />
    </p>
  )
}