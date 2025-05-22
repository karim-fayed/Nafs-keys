import { NextResponse } from "next/server"
import { getMongoDb } from "@/lib/mongodb-server"
import { ObjectId } from "mongodb"

// Mark this file as server-only
export const runtime = "nodejs"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getMongoDb()
    const product = await db.collection("products").findOne({ id: params.id })

    if (!product) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "فشل جلب المنتج" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getMongoDb()
    const body = await request.json()
    const update = {
      name: body.name,
      price: body.price,
      category: body.category,
      inStock: body.stock,
      image: body.image,
      status: body.status,
      updatedAt: new Date(),
    }
    const result = await db.collection("products").updateOne({ id: params.id }, { $set: update })
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "فشل تحديث المنتج" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getMongoDb()
    const result = await db.collection("products").deleteOne({ id: params.id })
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "فشل حذف المنتج" }, { status: 500 })
  }
}
