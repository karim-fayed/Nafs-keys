import { NextResponse } from "next/server"
import { getMongoDb } from "@/lib/mongodb-server"
import { generateCategoryId, slugify } from "@/lib/utils-id"

// Mark this file as server-only
export const runtime = "nodejs"

export async function GET() {
  try {
    const db = await getMongoDb()
    const categories = await db.collection("categories").find({}).toArray()

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء جلب الفئات" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()

    // التحقق من البيانات المطلوبة
    if (!data.name) {
      return NextResponse.json({ error: "اسم الفئة مطلوب" }, { status: 400 })
    }

    // إنشاء معرف فريد ورابط مخصص
    const id = generateCategoryId()
    const slug = data.slug || slugify(data.name)

    // إنشاء كائن الفئة
    const category = {
      id,
      name: data.name,
      slug,
      description: data.description || "",
      image: data.image || "",
      icon: data.icon || "",
      parentId: data.parentId || null,
      order: data.order || 0,
      featured: data.featured || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // إضافة الفئة إلى قاعدة البيانات
    const db = await getMongoDb()
    const result = await db.collection("categories").insertOne(category)

    return NextResponse.json(
      {
        success: true,
        message: "تم إضافة الفئة بنجاح",
        category: { ...category, _id: result.insertedId },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding category:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء إضافة الفئة" }, { status: 500 })
  }
}
