"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useCart, type Cart } from "@/hooks/use-cart"

type CartContextType = {
  cart: Cart | null
  loading: boolean
  itemCount: number
  addToCart: (productId: string, quantity?: number) => Promise<boolean>
  updateQuantity: (productId: string, quantity: number) => Promise<boolean>
  removeFromCart: (productId: string) => Promise<boolean>
  clearCart: () => Promise<boolean>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const cartUtils = useCart()

  return <CartContext.Provider value={cartUtils}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}
