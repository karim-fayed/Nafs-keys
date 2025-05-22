export interface CartItem {
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

export interface Cart {
  _id: string
  userId?: string
  guestId?: string
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date
  subtotal: number
  total: number
  itemCount: number
} 