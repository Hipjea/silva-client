import { css } from '@emotion/react'

export const API_URL = 'http://localhost:4000'
export const CLIENT_TOKEN_NAME = "silva_client_token"

export const theme = {
  colors: {
    primary: '#f25d27',
    secondary: '#5d2c20'
  },
  navlink: {
    paddingY: '10px',
    paddingX: '5px',
    activeHeight: '3px'
  }
}

export const button = css`
  background-color: ${theme.colors.primary};
  color: white;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
`
