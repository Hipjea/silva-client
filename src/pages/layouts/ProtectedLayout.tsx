import { Outlet } from "react-router-dom"
import { RequireAuth } from "../../components/auth/Auth"


export const ProtectedLayout = () => {
  return (
    <RequireAuth>
      <>
        <Outlet />
      </>
    </RequireAuth>
  )
}
