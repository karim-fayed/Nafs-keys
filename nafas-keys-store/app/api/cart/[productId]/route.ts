import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { removeFromCart, updateCartItemQuantity, calculateCartTotals } from "@/lib/db-cart"

export const runtime = "nodejs"

// DELETE /api/cart/[productId] - Eliminar un producto del carrito
export async function DELETE(request: NextRequest, { params }: { params: { productId: string } }) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const { productId } = params

    const cart = await removeFromCart(productId, userId)
    const totals = await calculateCartTotals(cart)

    return NextResponse.json({
      success: true,
      cart: {
        id: cart.id,
        items: cart.items,
        ...totals,
      },
    })
  } catch (error) {
    console.error("Error al eliminar del carrito:", error)
    return NextResponse.json({ success: false, error: "Error al eliminar del carrito" }, { status: 500 })
  }
}

// PATCH /api/cart/[productId] - Actualizar cantidad de un producto
export async function PATCH(request: NextRequest, { params }: { params: { productId: string } }) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const { productId } = params

    const { quantity } = await request.json()

    if (quantity === undefined) {
      return NextResponse.json({ success: false, error: "Cantidad requerida" }, { status: 400 })
    }

    const cart = await updateCartItemQuantity(productId, quantity, userId)
    const totals = await calculateCartTotals(cart)

    return NextResponse.json({
      success: true,
      cart: {
        id: cart.id,
        items: cart.items,
        ...totals,
      },
    })
  } catch (error) {
    console.error("Error al actualizar el carrito:", error)
    return NextResponse.json({ success: false, error: "Error al actualizar el carrito" }, { status: 500 })
  }
}
