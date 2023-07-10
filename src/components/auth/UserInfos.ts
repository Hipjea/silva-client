import { useMemo } from 'react'
import Cookies from 'js-cookie'
import { CLIENT_TOKEN_NAME } from '../../config'
import type { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { UserProps } from '../../types'


export interface UserInfosProps {
  firstname?: string
  lastname?: string
  email?: string
  menu?: {}
}

const UserInfos = (): UserProps | null => {
  const authToken = Cookies.get(CLIENT_TOKEN_NAME)
  const authState = useSelector((state: RootState) => state.auth)
  const infos = authState.email && authState.firstname && authState.lastname
    ? authState
    : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null

  const userInfo = useMemo<UserProps>(() => { return infos }, [infos])

  if (!authToken) {
    return null
  }

  return userInfo
}

export default UserInfos