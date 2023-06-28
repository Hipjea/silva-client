import { AuthProvider } from './components/auth/Auth'
import Router from './router'


const App = () => {
  return (
    <AuthProvider>
      <h1>Silva Client</h1>
      <Router />
    </AuthProvider>
  )
}

export default App