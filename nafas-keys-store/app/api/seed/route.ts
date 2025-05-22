import { NextResponse } from "next/server"
import { getMongoDb } from "@/lib/mongodb-server"
import { generateCategoryId } from "@/lib/utils-id"

// Mark this file as server-only
export const runtime = "nodejs"

export async function GET() {
  try {
    const db = await getMongoDb()

    // Check if categories collection is empty
    const categoriesCount = await db.collection("categories").countDocuments()

    if (categoriesCount === 0) {
      // Create default categories
      const categories = [
        {
          id: generateCategoryId(),
          name: "أنظمة التشغيل",
          slug: "windows",
          description: "أنظمة تشغيل مايكروسوفت ويندوز",
          icon: "computer",
          order: 1,
          featured: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: generateCategoryId(),
          name: "برامج المكتب",
          slug: "office",
          description: "برامج مايكروسوفت أوفيس وبرامج المكتب الأخرى",
          icon: "file-text",
          order: 2,
          featured: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: generateCategoryId(),
          name: "ألعاب",
          slug: "games",
          description: "مفاتيح تنشيط الألعاب الإلكترونية",
          icon: "gamepad",
          order: 3,
          featured: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: generateCategoryId(),
          name: "برامج التطوير",
          slug: "development",
          description: "برامج وأدوات التطوير والبرمجة",
          icon: "code",
          order: 4,
          featured: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      await db.collection("categories").insertMany(categories)
    }

    return NextResponse.json({ success: true, message: "تم تهيئة البيانات بنجاح" })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء تهيئة البيانات" }, { status: 500 })
  }
}
