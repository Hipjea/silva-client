import { AuthProvider } from './auth/Auth'
import Router from '../router'


const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App