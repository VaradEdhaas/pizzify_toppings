"use server"

import apiService from "@/helper/apiService"

export async function login(formData: FormData) {
  const email = formData.get("email")?.toString() || ""
  const password = formData.get("password")?.toString() || ""

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const user = await apiService.loginUser({ email, password })
    return user
  } catch (error: any) {
    return { error: error?.response?.data?.message || "Something went wrong" }
  }
}
