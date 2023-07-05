/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { CLIENT_TOKEN_NAME, theme, dropdownList, relative } from '../../../config'
import type { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { useAuth } from '../../../components/auth/Auth'
import { StyledButton } from '../../../components/Button'
import { StyledDropdown } from '../../../components/Dropdown'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { StyledListElement as ListElement, listElementCss } from './ListElement'
import { useTranslation } from 'react-i18next'
import userIcon from '../../../assets/images/icons/person-square.svg'


interface Props {
  children: JSX.Element
  className?: string
}

const Username = ({ children, className }: Props) => <div className={className}>{children}</div>

const StyledUsername = styled(Username)`
  color: ${theme.colors.secondary}
`

export const AuthStatusElement = () => {
  const { t } = useTranslation()
  const auth = useAuth()
  const navigate = useNavigate()
  const authToken = Cookies.get(CLIENT_TOKEN_NAME)
  const authState = useSelector((state: RootState) => state.auth)
  const [isPushed, setIsPushed] = useState<boolean>(false)
  const [isShown, setIsShown] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<string>("")

  useEffect(() => {
    const infos = authState.email && authState.firstname && authState.lastname
      ? authState
      : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null
    setUserInfo(`${infos.firstname} ${infos.lastname} (${infos.email})`)
  }, [userInfo])

  const handleSubmit = () => {
    setIsPushed(true)
    auth.signout(() => {
      navigate("/")
      setIsPushed(false)
    })
  }

  if (!authToken) {
    return (
      <ListElement to="/login" name={t('actions.signIn')} />
    )
  }

  return (
    <li css={[listElementCss, relative]}>
      <img
        src={userIcon}
        alt="Logo Silva Numerica"
        width="20"
        css={css`padding-left: ${theme.navbar.paddingX}`}
        onClick={() => setIsShown(!isShown)}
      />
      <StyledDropdown isShown={isShown}>
        <ul css={dropdownList}>
          <li>
            <Link to="/profile">
              <StyledUsername>
                <>{userInfo}</>
              </StyledUsername>
            </Link>
          </li>
          <li>
            <StyledButton
              label={t('actions.signOut')}
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