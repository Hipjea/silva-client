import Cookies from 'js-cookie'
import { CLIENT_TOKEN_NAME } from './config'


export const authToken = Cookies.get(CLIENT_TOKEN_NAME)

export const configHeaders = {
  headers: {
    Authorization: `Bearer ${authToken}`
  }
}
