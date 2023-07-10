/** @jsxImportSource @emotion/react */
import { useEffect, useState, useMemo } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AuthStatusElement } from '../../containers/MainHeader/components/AuthStatusElement'
import logo from '../../assets/images/logo-silva-numerica.png'
import StyledMainHeader from '../../containers/MainHeader/MainHeader'
import { StyledListElement as ListElement } from '../../containers/MainHeader/components/ListElement'
import { css, ThemeProvider, Global } from '@emotion/react'
import { body, main, reset, theme } from '../../config'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'


export const Layout = () => {
  const { t } = useTranslation()
  const authState = useSelector((state: RootState) => state.auth)
  const [userInfo, setUserInfo] = useState<string | null>(null)
  /*
    useEffect(() => {
      const infos = authState.email && authState.firstname && authState.lastname
        ? authState
        : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null
  
      setUserInfo(infos && `${infos.firstname} ${infos.lastname} (${infos.email})`)
    }, [authState])
  
    console.log("authState => ", authState)
    console.log("userInfo => ", userInfo)
  */
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

      <main css={main}>
        <Outlet />
      </main>
    </ThemeProvider>
  )
}
