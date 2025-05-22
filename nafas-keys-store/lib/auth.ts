import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getMongoDb } from "./mongodb-server"
import bcrypt from "bcryptjs"
import "server-only"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "البريد الإلكتروني", type: "email" },
        password: { label: "كلمة المرور", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Conectar a la base de datos
          const db = await getMongoDb()

          // Buscar el usuario
          const user = await db.collection("users").findOne({ email: credentials.email })

          // Verificar si el usuario existe y la contraseña
          if (!user || !user.password) {
            return null
          }

          // Verificar la contraseña
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            return null
          }

          // Verificar el estado del usuario
          if (user.status !== "active") {
            throw new Error("الحساب غير نشط. يرجى التواصل مع الدعم الفني.")
          }

          // Actualizar la última fecha de inicio de sesión
          await db.collection("users").updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } })

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        } catch (error) {
          console.error("خطأ في المصادقة:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
}
