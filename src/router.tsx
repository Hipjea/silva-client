import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RequireAuth, RequireAdmin } from './components/auth/Auth'
import Scenarii from "./components/scenarii/Scenarii"
import Scenario from "./components/scenarii/Scenario"
import { Updated } from "./components/scenarii/EditForm"
import { Layout, LoginPage, PublicPage, ProtectedPage, AdminPage, RegisterPage } from "./pages"


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
  )
}

export default Router