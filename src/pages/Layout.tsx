/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom'
import { AuthStatus } from '../components/auth/AuthStatus'
import logo from '../assets/images/logo-silva-numerica.png'
import StyledMainHeader from '../containers/MainHeader/MainHeader'
import { StyledListElement as ListElement } from '../containers/MainHeader/components/ListElement'
import { ThemeProvider, Global } from '@emotion/react'
import { body, main, reset, theme } from '../config'


export const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={[reset, body]} />
      <StyledMainHeader>
        <>
          <img src={logo} alt="Logo Silva Numerica" width="100" />
          <nav>
            <ul>
              <ListElement to="/" name="Public Page" />
              <ListElement to="/protected" name="Protected Page" />
              <ListElement to="/admin" name="Admin Page" />
              <ListElement to="/scenarii" name="Scenarii Page" />
            </ul>
          </nav>
        </>
      </StyledMainHeader>

      <main css={main}>
        <AuthStatus />
        <Outlet />
      </main>
    </ThemeProvider>
  )
}
