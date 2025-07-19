import { routes } from "@/shared/constants/routes"
import { AuthLayer } from "@/shared/components/auth-layer"

export default function LoginPage() {
  return (
    <AuthLayer title="Login" footer={{ text: "Need to create an account?", action: "Sign Up", href: routes.register }}>
      <form>Login Form</form>
    </AuthLayer>
  )
}
