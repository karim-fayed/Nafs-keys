import { NextResponse } from "next/server"
import { join } from "path"
import { writeFile, mkdir } from "fs/promises"

export const runtime = "nodejs"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
const MAX_SIZE = 5 * 1024 * 1024 // 2MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    if (!file) {
      return NextResponse.json({ error: "لم يتم إرسال أي ملف" }, { status: 400 })
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "نوع الملف غير مدعوم. الرجاء رفع صورة بصيغة jpg أو png أو webp فقط." }, { status: 400 })
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "حجم الصورة كبير جدًا. الحد الأقصى 2 ميجابايت." }, { status: 400 })
    }
    const buffer = Buffer.from(await file.arrayBuffer())
    const uploadDir = join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`
    const filePath = join(uploadDir, fileName)
    await writeFile(filePath, buffer)
    const url = `/uploads/${fileName}`
    return NextResponse.json({ url })
  } catch (error) {
    console.error("خطأ في رفع الصورة:", error)
    return NextResponse.json({ error: "فشل رفع الصورة" }, { status: 500 })
  }
} 