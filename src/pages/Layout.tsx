import { Link, Outlet } from "react-router-dom"
import { AuthStatus } from '../components/auth/AuthStatus'


const Layout = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        <li>
          <Link to="/admin">Admin Page</Link>
        </li>
        <li>
          <Link to="/scenarii">Scenarii Page</Link>
        </li>
      </ul>

      <AuthStatus />
      <Outlet />
    </div>
  )
}

export default Layout