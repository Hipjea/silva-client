import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom"
import { AuthProvider, RequireAuth, RequireAdmin } from './components/auth/Auth'
import { AuthStatus } from './components/auth/AuthStatus'
import { LoginForm } from './components/LoginForm'
import Scenarii from "./components/scenarii/Scenarii"
import Scenario from "./components/scenarii/Scenario"
import { Updated } from "./components/scenarii/EditForm"


const App = () => {
  return (
    <AuthProvider>
      <h1>Silva Client</h1>

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PublicPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/scenarii">
              <Route index={true} element={<Scenarii />} />
              <Route path=":id" element={<Scenario />} />
              <Route path=":id/edit" element={<Updated />} />
            </Route>
            <Route
              path="/protected"
              element={
                <RequireAuth>
                  <ProtectedPage />
                </RequireAuth>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminPage />
                </RequireAdmin>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

const Layout = () => {
  return (
    <div>
      <AuthStatus />

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

      <Outlet />
    </div>
  )
}

const LoginPage = () => {
  return (
    <LoginForm></LoginForm>
  )
}

const PublicPage = () => {
  return <h3>Public</h3>
}

const ProtectedPage = () => {
  return (
    <div>
      <h3>Protected</h3>
    </div>
  )
}

const AdminPage = () => {
  return <h3>Admin</h3>
}


export { App }