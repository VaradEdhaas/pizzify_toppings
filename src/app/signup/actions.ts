"use server"

import { revalidatePath } from "next/cache"

export async function signup(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Basic validation
  if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
    return { error: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address" }
  }

  // Phone validation removed - will be handled by Formik

  // Simulate API call
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    revalidatePath("/", "layout")
    return { success: true }
  } catch (error) {
    return { error: "Failed to create account. Please try again." }
  }
}
