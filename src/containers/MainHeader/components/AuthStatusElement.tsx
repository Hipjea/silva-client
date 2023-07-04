/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { CLIENT_TOKEN_NAME, theme, dropdownList } from '../../../config'
import type { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { useAuth } from '../../../components/auth/Auth'
import { StyledButton } from '../../../components/Button'
import { StyledDropdown } from '../../../components/Dropdown'
import styled from '@emotion/styled'
import { StyledListElement as ListElement, listElementCss } from './ListElement'
import userIcon from '../../../assets/images/icons/person-square.svg'


interface Props {
  children: JSX.Element
  className?: string
}

const Username = ({ children, className }: Props) => <span className={className}>{children}</span>

const StyledUsername = styled(Username)`
  color: ${theme.colors.secondary}
`

export const AuthStatusElement = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const authToken = Cookies.get(CLIENT_TOKEN_NAME)
  const authState = useSelector((state: RootState) => state.auth)
  const [isPushed, setIsPushed] = useState<boolean>(false)
  const [isShown, setIsShown] = useState<boolean>(false)

  const userInfo = authState.email && authState.firstname && authState.lastname
    ? authState
    : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null

  const userInfoDisplay = userInfo && `${userInfo.firstname} ${userInfo.lastname} (${userInfo.email})`

  const handleSubmit = () => {
    setIsPushed(true)
    auth.signout(() => {
      navigate("/")
      setIsPushed(false)
    })
  }

  if (!authToken) {
    return (
      <ListElement to="/login" name="Connexion" />
    )
  }

  return (
    <li css={{ listElementCss }}>
      <img
        src={userIcon}
        alt="Logo Silva Numerica"
        width="20"
        onClick={() => setIsShown(!isShown)}
      />
      <StyledDropdown isShown={isShown}>
        <ul css={dropdownList}>
          <li>
            <Link to="/profile">
              <StyledUsername>
                {userInfo && userInfoDisplay}
              </StyledUsername>
            </Link>
          </li>
          <li>
            <StyledButton
              label="Sign out"
              callback={() => handleSubmit()}
              isPushed={isPushed}
              disabled={isPushed}
            />
          </li>
        </ul>
      </StyledDropdown>
    </li>
  )
}