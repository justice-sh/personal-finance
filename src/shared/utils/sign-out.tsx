import { routes } from "../constants/routes"
import { authAPI } from "../services/apis/auth"
import { clearUserData } from "../data/user"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const performSignOut = async (router: AppRouterInstance) => {
  await authAPI.logout().catch(console.error)
  router.push(routes.login)
  clearUserData()
}
