"use server"
import { registerUserService } from "@/lib/auth-service"

// تسجيل مستخدم جديد
export async function registerUser({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) {
  return registerUserService({ name, email, password })
}
