/** @jsxImportSource @emotion/react */
import Cookies from 'js-cookie'
import { CLIENT_TOKEN_NAME } from '../../config'
import type { RootState } from '../../store'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { theme } from '../../config'
import { StyledListElement as ListElement } from '../../containers/MainHeader/components/ListElement'


interface Props {
  children: JSX.Element
  className?: string
}

const Username = ({ children, className }: Props) => <span className={className}>{children}</span>

const StyledUsername = styled(Username)`
  color: ${theme.colors.secondary}
`

export const AuthStatus = () => {
  const authToken = Cookies.get(CLIENT_TOKEN_NAME)
  const authState = useSelector((state: RootState) => state.auth)

  const userInfo = authState.email && authState.firstname && authState.lastname
    ? authState
    : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null

  const userInfoDisplay = userInfo && `${userInfo.firstname} ${userInfo.lastname} (${userInfo.email})`


  if (!authToken) {
    return (
      <ListElement to="/login" name="Connexion" />
    )
  }

  return (
    <StyledUsername>
      {userInfo && userInfoDisplay}
    </StyledUsername>
  )
}