import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { addToCart, getCart, updateCartItem, removeFromCart, clearCart, getOrCreateGuestId, calculateCartTotals } from "@/lib/db-cart"

export const runtime = "nodejs"

// GET /api/cart - Obtener el carrito actual
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const guestId = await getOrCreateGuestId()
    const cart = await getCart(session?.user?.id, guestId)

    if (!cart) {
      return NextResponse.json({ items: [], total: 0, itemCount: 0 })
    }

    const { subtotal, total, itemCount } = await calculateCartTotals(cart)

    return NextResponse.json({
      items: cart.items,
      subtotal,
      total,
      itemCount,
    })
  } catch (error) {
    console.error("Error getting cart:", error)
    return NextResponse.json({ error: "Failed to get cart" }, { status: 500 })
  }
}

// POST /api/cart - Añadir producto al carrito
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const guestId = await getOrCreateGuestId()
    const { productId, quantity = 1 } = await request.json()

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const cart = await addToCart(productId, quantity, session?.user?.id, guestId)
    const { subtotal, total, itemCount } = await calculateCartTotals(cart)

    return NextResponse.json({
      items: cart.items,
      subtotal,
      total,
      itemCount,
    })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}

// PUT /api/cart - Actualizar cantidad de un producto
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const guestId = await getOrCreateGuestId()
    const { productId, quantity } = await request.json()

    if (!productId || typeof quantity !== "number") {
      return NextResponse.json({ error: "Product ID and quantity are required" }, { status: 400 })
    }

    const cart = await updateCartItem(productId, quantity, session?.user?.id, guestId)
    const { subtotal, total, itemCount } = await calculateCartTotals(cart)

    return NextResponse.json({
      items: cart.items,
      subtotal,
      total,
      itemCount,
    })
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}

// DELETE /api/cart - Vaciar el carrito
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const guestId = await getOrCreateGuestId()
    const cart = await clearCart(session?.user?.id, guestId)

    return NextResponse.json({
      items: cart.items,
      subtotal: 0,
      total: 0,
      itemCount: 0,
    })
  } catch (error) {
    console.error("Error clearing cart:", error)
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 })
  }
}
