import { AuthProvider } from './auth/Auth'
import Router from '../router'
import { ThemeProvider } from '@emotion/react'
import { theme } from '../config'


const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App