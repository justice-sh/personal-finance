import type { User } from "@/shared/types/user"
import publicClient from "../api-client/public-client"
import securedClient from "../api-client/secured-client"

const login = async (data: { email: string; password: string }) => {
  const resp = await publicClient.post<{ accessToken: string; message: string }>("/auth", data)
  return resp.data
}

const signInWithProvider = async (provider = "google") => {
  const resp = await publicClient.post<string>(`/auth/oauth/${provider}`)
  return resp.data
}

const getUser = async () => {
  const resp = await securedClient.post<{ message: string; data: User }>("/auth/me")
  return resp.data.data
}

const logout = () => publicClient.post("/auth/logout")

export const authAPI = {
  login,
  logout,
  getUser,
  signInWithProvider,
}
