import * as React from "react"
import {
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom"
import { AuthProvider, AuthStatus, RequireAuth, RequireAdmin } from "./Auth"
import LoginForm from "./components/LoginForm"
import Scenarii from "./components/Scenarii"


export default function App() {
  return (
    <AuthProvider>
      <h1>Auth Example</h1>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/scenarii" element={<ScenariiPage />} />
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
    </AuthProvider>
  )
}

function Layout() {
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

function LoginPage() {
  return (
    <LoginForm></LoginForm>
  )
}

function PublicPage() {
  return <h3>Public</h3>
}

function ProtectedPage() {
  return <h3>Protected</h3>
}

function AdminPage() {
  return <h3>Admin</h3>
}

function ScenariiPage() {
  return <Scenarii></Scenarii>
}
