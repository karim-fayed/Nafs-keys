"use client"

import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { CartItem } from "@/types"

export interface Cart {
  items: CartItem[]
  subtotal: number
  total: number
  itemCount: number
}

interface CartState {
  items: CartItem[]
  subtotal: number
  total: number
  itemCount: number
  isLoading: boolean
  error: string | null
}

export function useCart() {
  const { data: session, status } = useSession()
  const [state, setState] = useState<CartState>({
    items: [],
    subtotal: 0,
    total: 0,
    itemCount: 0,
    isLoading: false,
    error: null,
  })

  const fetchCart = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))
      const response = await fetch("/api/cart")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch cart")
      }

      setState((prev) => ({
        ...prev,
        items: data.items,
        subtotal: data.subtotal,
        total: data.total,
        itemCount: data.itemCount,
        isLoading: false,
      }))
    } catch (error) {
      console.error("Error fetching cart:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch cart",
      }))
    }
  }, [])

  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to add to cart")
      }

      setState((prev) => ({
        ...prev,
        items: data.items,
        subtotal: data.subtotal,
        total: data.total,
        itemCount: data.itemCount,
        isLoading: false,
      }))

      toast.success("Product added to cart")
    } catch (error) {
      console.error("Error adding to cart:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to add to cart",
      }))
      toast.error("Failed to add product to cart")
    }
  }, [])

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update cart")
      }

      setState((prev) => ({
        ...prev,
        items: data.items,
        subtotal: data.subtotal,
        total: data.total,
        itemCount: data.itemCount,
        isLoading: false,
      }))

      toast.success("Cart updated")
    } catch (error) {
      console.error("Error updating cart:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to update cart",
      }))
      toast.error("Failed to update cart")
    }
  }, [])

  const removeFromCart = useCallback(async (productId: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: 0 }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to remove from cart")
      }

      setState((prev) => ({
        ...prev,
        items: data.items,
        subtotal: data.subtotal,
        total: data.total,
        itemCount: data.itemCount,
        isLoading: false,
      }))

      toast.success("Product removed from cart")
    } catch (error) {
      console.error("Error removing from cart:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to remove from cart",
      }))
      toast.error("Failed to remove product from cart")
    }
  }, [])

  const clearCart = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))
      const response = await fetch("/api/cart", {
        method: "DELETE",
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to clear cart")
      }

      setState((prev) => ({
        ...prev,
        items: [],
        subtotal: 0,
        total: 0,
        itemCount: 0,
        isLoading: false,
      }))

      toast.success("Cart cleared")
    } catch (error) {
      console.error("Error clearing cart:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to clear cart",
      }))
      toast.error("Failed to clear cart")
    }
  }, [])

  useEffect(() => {
    fetchCart()
  }, [fetchCart, status])

  return {
    cart: {
      items: state.items,
      subtotal: state.subtotal,
      total: state.total,
      itemCount: state.itemCount,
    },
    loading: state.isLoading,
    itemCount: state.itemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart: fetchCart,
  }
}
