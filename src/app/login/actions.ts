"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Basic validation
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  // Demo authentication for Pizzify
  if (email === "demo@pizzify.com" && password === "password") {
    revalidatePath("/", "layout")
    redirect("/dashboard")
  } else {
    return { error: "Invalid credentials" }
  }
}
