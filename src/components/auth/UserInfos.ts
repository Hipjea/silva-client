import Cookies from 'js-cookie'
import { CLIENT_TOKEN_NAME } from '../../config'
import type { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { UserProps } from '../../types'


const UserInfos = (): UserProps | null => {
  const authToken = Cookies.get(CLIENT_TOKEN_NAME)
  const authState = useSelector((state: RootState) => state.auth)

  if (!authToken) {
    return null
  }

  const infos = authState.email && authState.firstname && authState.lastname
    ? authState
    : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null

  return infos
}

export default UserInfos