import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RequireAuth, RequireAdmin } from './components/auth/Auth'
import Scenarii from "./components/scenarii/Scenarii"
import Scenario from "./components/scenarii/Scenario"
import Cards from "./components/cards/Cards"
import Card from "./components/cards/Card"
import { ScenarioEditForm } from "./components/scenarii/EditForm"
import { CardEditForm } from "./components/cards/EditForm"
import {
  Layout,
  LoginPage,
  HomePage,
  PublicLayout,
  ProfilePage,
  ProtectedPage,
  AdminPage,
  RegisterPage,
  ConfirmationPage,
  AdminLayout
} from "./pages"


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
        </Route>

        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/scenarii" element={<AdminLayout />}>
            <Route index={true} element={<Scenarii />} />
            <Route path=":id" element={<Scenario />} />
            <Route path=":id/edit" element={<ScenarioEditForm />} />
          </Route>
          <Route path="/cards" element={<AdminLayout />}>
            <Route index={true} element={<Cards />} />
            <Route path=":id" element={<Card />} />
            <Route path=":id/edit" element={<CardEditForm />} />
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