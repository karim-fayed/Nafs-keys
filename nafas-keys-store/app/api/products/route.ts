import { NextResponse } from "next/server"
import { getMongoDb } from "@/lib/mongodb-server"
import { v4 as uuidv4 } from "uuid"
import { slugify } from "@/lib/utils-id"

// Mark this file as server-only
export const runtime = "nodejs"

export async function GET() {
  try {
    const db = await getMongoDb()
    const products = await db.collection("products").find({}).toArray()

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء جلب المنتجات" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ success: false, error: "جميع الحقول مطلوبة" }, { status: 400 });
    }
    const db = await getMongoDb();
    const id = uuidv4();
    const slug = slugify(body.name);
    const newProduct = {
      id,
      slug,
      name: body.name,
      price: body.price,
      category: body.category,
      inStock: body.stock,
      image: body.image || "/placeholder-product.png",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "active",
    };
    await db.collection("products").insertOne(newProduct);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: "حدث خطأ أثناء إضافة المنتج" }, { status: 500 });
  }
}
