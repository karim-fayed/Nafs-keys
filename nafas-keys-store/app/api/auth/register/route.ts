import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getMongoDb } from "@/lib/mongodb-server"
import { generateUserId } from "@/lib/utils-id"

// Mark this file as server-only
export const runtime = "nodejs"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    // Validar los datos
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "يرجى ملء جميع الحقول المطلوبة" }, { status: 400 })
    }

    // Conectar a la base de datos
    const db = await getMongoDb()

    // Verificar si el usuario ya existe
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ success: false, message: "البريد الإلكتروني مستخدم بالفعل" }, { status: 400 })
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generar un ID único
    const id = generateUserId()

    // Crear el objeto de usuario
    const user = {
      id,
      name,
      email,
      password: hashedPassword,
      role: "customer", // Los nuevos usuarios son clientes por defecto
      status: "active",
      registeredDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Añadir el usuario a la base de datos
    await db.collection("users").insertOne(user)

    return NextResponse.json({ success: true, message: "تم إنشاء الحساب بنجاح", userId: id }, { status: 201 })
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ success: false, message: "حدث خطأ أثناء إنشاء الحساب" }, { status: 500 })
  }
}
