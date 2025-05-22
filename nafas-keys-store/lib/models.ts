// تعريف أنواع البيانات للمتجر
import { ObjectId } from "mongodb"

export interface Product {
  _id?: ObjectId
  id: string
  name: string
  slug: string
  description: string
  features: string[]
  image: string
  additionalImages?: string[]
  price: number
  originalPrice?: number
  badge?: string
  inStock: number
  sku: string
  category: string
  status: "active" | "draft" | "inactive"
  createdAt?: Date
  updatedAt?: Date
}

export interface Key {
  _id?: ObjectId
  id: string
  productId: string
  key: string
  status: "available" | "used"
  orderId?: string
  customerId?: string
  purchaseDate?: Date
  createdAt?: Date
}

export interface User {
  _id?: ObjectId
  id: string
  name: string
  email: string
  phone?: string
  password: string // سيتم تخزينها مشفرة
  role: "admin" | "customer"
  status: "active" | "inactive"
  registeredDate: Date
  lastLogin?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface Order {
  _id?: ObjectId
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  date: Date
  total: number
  subtotal: number
  tax: number
  status: "processing" | "completed" | "cancelled"
  paymentMethod: string
  items: OrderItem[]
  notes?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface OrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  keyId?: string
}

export interface Category {
  _id?: ObjectId
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  icon?: string
  parentId?: string
  order?: number
  featured?: boolean
  createdAt?: Date
  updatedAt?: Date
}

// Añadir estas interfaces al archivo existente

export interface CartItem {
  productId: string
  name: string
  slug: string
  image: string
  price: number
  quantity: number
}

export interface Cart {
  _id?: ObjectId
  id: string
  userId?: string // Para carritos de usuarios autenticados
  guestId?: string // Para carritos de invitados
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date // Para carritos de invitados
}
