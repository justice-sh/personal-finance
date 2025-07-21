import publicClient from "../api-client/public-client"

const signUp = async (data: { name: string; email: string; password: string }) => {
  const resp = await publicClient.post<{ message: string }>("/users", data)
  return resp.data
}

export const userAPI = {
  signUp,
}
