import { NextRequest, NextResponse } from "next/server"
import { addOrder } from "@/lib/db"
import { generateOrderId } from "@/lib/utils-id"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    // تحقق من الحقول الأساسية
    const { customerName, customerEmail, customerPhone, paymentMethod, items, subtotal, total, tax } = data
    if (!customerName || !customerEmail || !items || items.length === 0) {
      return NextResponse.json({ error: "يرجى تعبئة جميع الحقول المطلوبة." }, { status: 400 })
    }
    const order = {
      id: generateOrderId(),
      customerId: data.customerId || null,
      customerName,
      customerEmail,
      customerPhone,
      date: new Date(),
      total,
      subtotal,
      tax,
      status: "processing" as "processing",
      paymentMethod: paymentMethod || "card",
      items,
      notes: data.notes || "",
    }
    await addOrder(order)
    return NextResponse.json({ success: true, orderId: order.id })
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ أثناء معالجة الطلب." }, { status: 500 })
  }
} 