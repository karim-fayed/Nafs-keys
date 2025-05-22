"use server"

import bcrypt from "bcryptjs"
import { addUser, getUserByEmail } from "./db"
import { generateUserId } from "./utils-id"
import type { User } from "./models"

// Función para registrar un nuevo usuario
export async function registerUserService({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return {
        success: false,
        message: "البريد الإلكتروني مستخدم بالفعل",
      }
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generar un ID único
    const id = generateUserId()

    // Crear el objeto de usuario
    const user: User = {
      id,
      name,
      email,
      password: hashedPassword,
      role: "customer", // Los nuevos usuarios son clientes por defecto
      status: "active",
      registeredDate: new Date(),
    }

    // Añadir el usuario a la base de datos
    const result = await addUser(user)

    return {
      success: true,
      message: "تم إنشاء الحساب بنجاح",
      userId: id,
    }
  } catch (error) {
    console.error("Error registering user:", error)
    return {
      success: false,
      message: "حدث خطأ أثناء إنشاء الحساب",
    }
  }
}
