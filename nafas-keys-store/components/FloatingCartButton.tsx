"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCartContext } from "@/components/providers/cart-provider"

export default function FloatingCartButton() {
  const { cart } = useCartContext()
  const hasItems = cart?.items && cart.items.length > 0

  return (
    <Link
      href="/cart"
      className="fixed z-[100] bottom-6 right-6 md:bottom-8 md:right-8 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center w-16 h-16 transition-all duration-300 group"
      style={{ boxShadow: "0 4px 24px 0 rgba(80,0,120,0.15)" }}
      aria-label="سلة التسوق"
    >
      <ShoppingCart className="h-8 w-8" />
      {hasItems && (
        <Badge className="absolute -top-2 -left-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-base font-bold shadow-md animate-bounce">
          {cart.itemCount}
        </Badge>
      )}
    </Link>
  )
} 