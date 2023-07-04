/** @jsxImportSource @emotion/react */
import { Link, Outlet } from 'react-router-dom'
import { AuthStatusElement } from '../containers/MainHeader/components/AuthStatusElement'
import logo from '../assets/images/logo-silva-numerica.png'
import StyledMainHeader from '../containers/MainHeader/MainHeader'
import { StyledListElement as ListElement } from '../containers/MainHeader/components/ListElement'
import { ThemeProvider, Global } from '@emotion/react'
import { body, main, reset, theme } from '../config'
import { css } from '@emotion/react'


export const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={[reset, body]} />
      <StyledMainHeader>
        <>
          <Link to="/">
            <img
              src={logo}
              alt="Logo Silva Numerica"
              width="100"
              css={css`padding-left: ${theme.navbar.paddingX}`}
            />
          </Link>
          <nav>
            <ul>
              <ListElement to="/" name="Public Page" />
              <ListElement to="/protected" name="Protected Page" />
              <ListElement to="/admin" name="Admin Page" />
              <ListElement to="/scenarii" name="Scenarii Page" />
              <AuthStatusElement />
            </ul>
          </nav>
        </>
      </StyledMainHeader>

      <main css={main}>
        <Outlet />
      </main>
    </ThemeProvider>
  )
}
