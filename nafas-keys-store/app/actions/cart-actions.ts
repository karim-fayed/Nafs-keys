"use server"

import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"
import { getMongoDb } from "@/lib/mongodb-server"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Obtener o crear un ID de invitado
export async function getOrCreateGuestId(): Promise<string> {
  const cookieStore = cookies()
  let guestId = cookieStore.get("guestId")?.value

  if (!guestId) {
    guestId = uuidv4()
    cookieStore.set("guestId", guestId, {
      maxAge: 60 * 60 * 24 * 30, // 30 días
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  }

  return guestId
}

// Obtener el carrito actual
export async function getCart() {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const db = await getMongoDb()

    let cart = null

    if (userId) {
      // Buscar carrito de usuario autenticado
      cart = await db.collection("carts").findOne({ userId })
    } else {
      // Buscar carrito de invitado
      const guestId = await getOrCreateGuestId()
      cart = await db.collection("carts").findOne({ guestId })
    }

    if (!cart) {
      // Crear un nuevo carrito si no existe
      const now = new Date()
      const newCart = {
        id: uuidv4(),
        items: [],
        createdAt: now,
        updatedAt: now,
      }

      if (userId) {
        newCart.userId = userId
      } else {
        const guestId = await getOrCreateGuestId()
        newCart.guestId = guestId
        newCart.expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 días
      }

      await db.collection("carts").insertOne(newCart)
      cart = newCart
    }

    // Calcular totales
    const subtotal = cart.items?.reduce((total, item) => total + item.price * item.quantity, 0) || 0
    const tax = subtotal * 0.15 // 15% VAT
    const total = subtotal + tax
    const itemCount = cart.items?.reduce((count, item) => count + item.quantity, 0) || 0

    return {
      id: cart.id,
      items: cart.items || [],
      subtotal,
      tax,
      total,
      itemCount,
    }
  } catch (error) {
    console.error("Error al obtener el carrito:", error)
    return {
      id: "",
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      itemCount: 0,
    }
  }
}

// Añadir un producto al carrito
export async function addToCart(productId: string, quantity = 1) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const db = await getMongoDb()

    // Obtener información del producto
    const product = await db.collection("products").findOne({ id: productId })
    if (!product) {
      throw new Error("Producto no encontrado")
    }

    // Obtener o crear carrito
    let cart = null
    if (userId) {
      cart = await db.collection("carts").findOne({ userId })
    } else {
      const guestId = await getOrCreateGuestId()
      cart = await db.collection("carts").findOne({ guestId })
    }

    if (!cart) {
      // Crear un nuevo carrito
      const now = new Date()
      cart = {
        id: uuidv4(),
        items: [],
        createdAt: now,
        updatedAt: now,
      }

      if (userId) {
        cart.userId = userId
      } else {
        const guestId = await getOrCreateGuestId()
        cart.guestId = guestId
        cart.expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 días
      }

      await db.collection("carts").insertOne(cart)
    }

    // Verificar si el producto ya está en el carrito
    const items = cart.items || []
    const existingItemIndex = items.findIndex((item) => item.productId === productId)

    if (existingItemIndex >= 0) {
      // Actualizar cantidad si ya existe
      items[existingItemIndex].quantity += quantity
    } else {
      // Añadir nuevo item
      items.push({
        productId,
        name: product.name,
        slug: product.slug,
        image: product.image,
        price: product.price,
        quantity,
      })
    }

    // Actualizar en la base de datos
    await db.collection("carts").updateOne({ id: cart.id }, { $set: { items, updatedAt: new Date() } })

    revalidatePath("/cart")
    return { success: true }
  } catch (error) {
    console.error("Error al añadir al carrito:", error)
    return { success: false, error: "Error al añadir al carrito" }
  }
}

// Actualizar cantidad de un producto en el carrito
export async function updateCartItemQuantity(productId: string, quantity: number) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const db = await getMongoDb()

    // Obtener carrito
    let cart = null
    if (userId) {
      cart = await db.collection("carts").findOne({ userId })
    } else {
      const guestId = await getOrCreateGuestId()
      cart = await db.collection("carts").findOne({ guestId })
    }

    if (!cart) {
      throw new Error("Carrito no encontrado")
    }

    const items = cart.items || []
    const itemIndex = items.findIndex((item) => item.productId === productId)

    if (itemIndex === -1) {
      throw new Error("Producto no encontrado en el carrito")
    }

    if (quantity <= 0) {
      // Eliminar el producto si la cantidad es 0 o menos
      items.splice(itemIndex, 1)
    } else {
      // Actualizar cantidad
      items[itemIndex].quantity = quantity
    }

    // Actualizar en la base de datos
    await db.collection("carts").updateOne({ id: cart.id }, { $set: { items, updatedAt: new Date() } })

    revalidatePath("/cart")
    return { success: true }
  } catch (error) {
    console.error("Error al actualizar el carrito:", error)
    return { success: false, error: "Error al actualizar el carrito" }
  }
}

// Eliminar un producto del carrito
export async function removeFromCart(productId: string) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const db = await getMongoDb()

    // Obtener carrito
    let cart = null
    if (userId) {
      cart = await db.collection("carts").findOne({ userId })
    } else {
      const guestId = await getOrCreateGuestId()
      cart = await db.collection("carts").findOne({ guestId })
    }

    if (!cart) {
      throw new Error("Carrito no encontrado")
    }

    const items = cart.items || []
    const updatedItems = items.filter((item) => item.productId !== productId)

    // Actualizar en la base de datos
    await db.collection("carts").updateOne({ id: cart.id }, { $set: { items: updatedItems, updatedAt: new Date() } })

    revalidatePath("/cart")
    return { success: true }
  } catch (error) {
    console.error("Error al eliminar del carrito:", error)
    return { success: false, error: "Error al eliminar del carrito" }
  }
}

// Vaciar el carrito
export async function clearCart() {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const db = await getMongoDb()

    // Obtener carrito
    let cart = null
    if (userId) {
      cart = await db.collection("carts").findOne({ userId })
    } else {
      const guestId = await getOrCreateGuestId()
      cart = await db.collection("carts").findOne({ guestId })
    }

    if (!cart) {
      throw new Error("Carrito no encontrado")
    }

    // Actualizar en la base de datos
    await db.collection("carts").updateOne({ id: cart.id }, { $set: { items: [], updatedAt: new Date() } })

    revalidatePath("/cart")
    return { success: true }
  } catch (error) {
    console.error("Error al vaciar el carrito:", error)
    return { success: false, error: "Error al vaciar el carrito" }
  }
}
