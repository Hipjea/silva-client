import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import { store } from './store'
import { Provider } from 'react-redux'


if (process.env.NODE_ENV == 'production') {
  const container = document.getElementById('root') as HTMLElement
  const root = hydrateRoot(
    container,
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
} else {
  const root = createRoot(
    document.getElementById('root') as HTMLElement
  )
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
