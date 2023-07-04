/** @jsxImportSource @emotion/react */
import UserInfos from './UserInfos'
import styled from '@emotion/styled'
import { theme } from '../../config'
import { StyledListElement as ListElement } from '../../containers/MainHeader/components/ListElement'


interface Props {
  children: JSX.Element
  className?: string
}

interface UserInfosProps {
  firstname?: string
  lastname?: string
  email?: string
}

const Username = ({ children, className }: Props) => <span className={className}>{children}</span>

const StyledUsername = styled(Username)`
  color: ${theme.colors.secondary}
`

export const AuthStatus = (): JSX.Element => {
  const infos = UserInfos() as UserInfosProps
  const userInfoDisplay = infos && `${infos.firstname} ${infos.lastname} (${infos.email})`

  if (!UserInfos) {
    return (
      <ListElement to="/login" name="Connexion" />
    )
  }

  return (
    <StyledUsername>
      <>{userInfoDisplay}</>
    </StyledUsername>
  )
}