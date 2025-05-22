"use server"

import { getMongoDb } from "./mongodb-server"
import { v4 as uuidv4 } from "uuid"
import { cookies } from "next/headers"
import { ObjectId } from "mongodb"
import { revalidatePath } from "next/cache"

interface CartItem {
  productId: string
  quantity: number
  price: number
  createdAt: Date
  updatedAt: Date
  product?: {
    id: string
    name: string
    image: string
    price: number
    slug: string
  }
}

interface Cart {
  _id: ObjectId
  userId?: string
  guestId?: string
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date
}

const GUEST_ID_COOKIE = "guest_id"
const GUEST_CART_EXPIRY = 30 * 24 * 60 * 60 * 1000 // 30 days

export async function getOrCreateGuestId(): Promise<string> {
  const cookieStore = await cookies()
  let guestId = cookieStore.get(GUEST_ID_COOKIE)?.value

  if (!guestId) {
    guestId = uuidv4()
    await cookieStore.set(GUEST_ID_COOKIE, guestId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: GUEST_CART_EXPIRY / 1000,
    })
  }

  return guestId
}

export async function getCart(userId?: string, guestId?: string): Promise<Cart | null> {
  const db = await getMongoDb()
  let cart = null

  if (userId) {
    cart = await db.collection("carts").findOne({ userId })
  } else if (guestId) {
    cart = await db.collection("carts").findOne({ guestId })
  }

  if (!cart) {
    return null
  }

  // Fetch product details for each item
  const itemsWithProducts = await Promise.all(
    cart.items.map(async (item: CartItem) => {
      let product = null
      if (ObjectId.isValid(item.productId)) {
        product = await db.collection("products").findOne({ _id: new ObjectId(item.productId) })
      }
      if (!product) {
        product = await db.collection("products").findOne({ id: item.productId })
      }
      
      return {
        ...item,
        product: product ? {
          id: product.id || product._id.toString(),
          name: product.name,
          image: product.image,
          price: product.price,
          slug: product.slug
        } : null
      }
    })
  )

  return {
    ...cart,
    items: itemsWithProducts
  } as Cart
}

export async function createCart(userId?: string, guestId?: string): Promise<Cart> {
  const db = await getMongoDb()
  const cart: Cart = {
    _id: new ObjectId(),
    userId,
    guestId,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    expiresAt: guestId ? new Date(Date.now() + GUEST_CART_EXPIRY) : undefined,
  }
  await db.collection("carts").insertOne(cart)
  return cart
}

export async function getOrCreateCart(userId?: string, guestId?: string): Promise<Cart> {
  const cart = await getCart(userId, guestId)
  if (cart) {
    return cart
  }
  return createCart(userId, guestId)
}

export async function addToCart(
  productId: string,
  quantity: number = 1,
  userId?: string,
  guestId?: string
): Promise<Cart> {
  const db = await getMongoDb()
  const cart = await getOrCreateCart(userId, guestId)

  // Get product details
  let product = null
  if (ObjectId.isValid(productId)) {
    product = await db.collection("products").findOne({ _id: new ObjectId(productId) })
  }
  if (!product) {
    product = await db.collection("products").findOne({ id: productId })
  }
  if (!product) {
    throw new Error("Product not found")
  }

  // Check if product is already in cart
  const existingItem = cart.items.find((item) => item.productId === productId)

  if (existingItem) {
    // Update quantity
    existingItem.quantity += quantity
    existingItem.updatedAt = new Date()
  } else {
    // Add new item
    const newItem: CartItem = {
      productId,
      quantity,
      price: product.price,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    cart.items.push(newItem)
  }

  // Update cart
  cart.updatedAt = new Date()
  await db.collection("carts").updateOne(
    { _id: cart._id },
    { $set: cart }
  )

  revalidatePath("/cart")
  return cart
}

export async function updateCartItem(
  productId: string,
  quantity: number,
  userId?: string,
  guestId?: string
): Promise<Cart> {
  const db = await getMongoDb()
  const cart = await getCart(userId, guestId)
  if (!cart) {
    throw new Error("Cart not found")
  }

  const item = cart.items.find((item) => item.productId === productId)
  if (!item) {
    throw new Error("Item not found in cart")
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter((item) => item.productId !== productId)
  } else {
    item.quantity = quantity
    item.updatedAt = new Date()
  }

  cart.updatedAt = new Date()
  await db.collection("carts").updateOne(
    { _id: cart._id },
    { $set: cart }
  )

  revalidatePath("/cart")
  return cart
}

export async function removeFromCart(
  productId: string,
  userId?: string,
  guestId?: string
): Promise<Cart> {
  const db = await getMongoDb()
  const cart = await getCart(userId, guestId)
  if (!cart) {
    throw new Error("Cart not found")
  }

  cart.items = cart.items.filter((item) => item.productId !== productId)
  cart.updatedAt = new Date()

  await db.collection("carts").updateOne(
    { _id: cart._id },
    { $set: cart }
  )

  revalidatePath("/cart")
  return cart
}

export async function clearCart(userId?: string, guestId?: string): Promise<Cart> {
  const db = await getMongoDb()
  const cart = await getCart(userId, guestId)
  if (!cart) {
    throw new Error("Cart not found")
  }

  cart.items = []
  cart.updatedAt = new Date()

  await db.collection("carts").updateOne(
    { _id: cart._id },
    { $set: cart }
  )

  revalidatePath("/cart")
  return cart
}

export async function mergeGuestCart(userId: string, guestId: string): Promise<Cart> {
  const db = await getMongoDb()
  const guestCart = await getCart(undefined, guestId)
  const userCart = await getCart(userId)

  if (!guestCart) {
    return userCart || createCart(userId)
  }

  if (!userCart) {
    // Convert guest cart to user cart
    guestCart.userId = userId
    delete guestCart.guestId
    delete guestCart.expiresAt
    await db.collection("carts").updateOne(
      { _id: guestCart._id },
      { $set: guestCart }
    )
    return guestCart
  }

  // Merge items from guest cart to user cart
  for (const guestItem of guestCart.items) {
    const existingItem = userCart.items.find((item) => item.productId === guestItem.productId)
    if (existingItem) {
      existingItem.quantity += guestItem.quantity
      existingItem.updatedAt = new Date()
    } else {
      userCart.items.push(guestItem)
    }
  }

  userCart.updatedAt = new Date()
  await db.collection("carts").updateOne(
    { _id: userCart._id },
    { $set: userCart }
  )

  // Delete guest cart
  await db.collection("carts").deleteOne({ _id: guestCart._id })

  revalidatePath("/cart")
  return userCart
}

export async function calculateCartTotals(cart: Cart): Promise<{
  subtotal: number
  total: number
  itemCount: number
}> {
  const subtotal = cart.items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
  const itemCount = cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

  return {
    subtotal,
    total: subtotal, // Add shipping, tax, etc. here if needed
    itemCount,
  }
}
