import { Outlet } from "react-router-dom"
import { RequireAuth } from "../../components/auth/Auth"


export const AdminLayout = () => {
  return (
    <RequireAuth>
      <>
        <Outlet />
      </>
    </RequireAuth>
  )
}
