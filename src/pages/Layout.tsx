import { Outlet } from 'react-router-dom'
import { AuthStatus } from '../components/auth/AuthStatus'
import logo from '../assets/images/logo-silva-numerica.png'
import StyledMainHeader from '../containers/MainHeader/MainHeader'
import { StyledListElement as ListElement } from '../containers/MainHeader/components/ListElement'


export const Layout = () => {
  return (
    <div>
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

      <AuthStatus />
      <Outlet />
    </div>
  )
}
