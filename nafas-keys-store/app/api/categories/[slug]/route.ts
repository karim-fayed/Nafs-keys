import { NextResponse } from "next/server"
import { getMongoDb } from "@/lib/mongodb-server"

// Mark this file as server-only
export const runtime = "nodejs"

export async function GET(request, { params }) {
  try {
    const db = await getMongoDb()
    const category = await db.collection("categories").findOne({ slug: params.slug })

    if (!category) {
      return NextResponse.json({ error: "الفئة غير موجودة" }, { status: 404 })
    }

    // Obtener los productos de esta categoría
    const products = await db.collection("products").find({ category: category.id }).toArray()

    return NextResponse.json({
      ...category,
      products,
    })
  } catch (error) {
    console.error("Error fetching category:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء جلب الفئة" }, { status: 500 })
  }
}
