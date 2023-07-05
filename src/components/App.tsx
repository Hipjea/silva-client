import React from 'react'
import { AuthProvider } from './auth/Auth'
import Router from '../router'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
import { store } from '../store'
import { Provider } from 'react-redux'


const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <Router />
          </I18nextProvider>
        </AuthProvider>
      </Provider>
    </React.StrictMode>

  )
}

export default App