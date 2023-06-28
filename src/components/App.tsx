import { AuthProvider } from './auth/Auth'
import Router from '../router'
import { ThemeProvider } from '@emotion/react'


export const theme = {
  colors: {
    primary: 'hotpink',
    secondary: 'green'
  }
}

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <h1>Silva Client</h1>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App