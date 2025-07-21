import z from "zod"

export function PasswordSchema() {
  return z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character",
  })
}
