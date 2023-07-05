import { AuthProvider } from './auth/Auth'
import Router from '../router'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'


const App = () => {
  return (
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <Router />
      </I18nextProvider>
    </AuthProvider>
  )
}

export default App