/** @jsxImportSource @emotion/react */
import { Link, Outlet } from 'react-router-dom'
import { AuthStatusElement } from '../../containers/MainHeader/components/AuthStatusElement'
import logo from '../../assets/images/logo-silva-numerica.png'
import StyledMainHeader from '../../containers/MainHeader/MainHeader'
import { StyledListElement as ListElement } from '../../containers/MainHeader/components/ListElement'
import { ThemeProvider, Global } from '@emotion/react'
import { body, reset, theme } from '../../config'
import { css } from '@emotion/react'
import { useTranslation } from 'react-i18next'


export const PublicLayout = () => {
  const { t } = useTranslation()

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
              <ListElement to="/" name={t('pages.titles.homePage')} />
              <ListElement to="/protected" name={t('pages.titles.protectedPage')} />
              <ListElement to="/admin" name={t('pages.titles.adminPage')} />
              <ListElement to="/scenarii" name={t('pages.titles.scenariiPage')} />
              <AuthStatusElement />
            </ul>
          </nav>
        </>
      </StyledMainHeader>

      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  )
}
