"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCartContext } from "@/components/providers/cart-provider"

interface AddToCartButtonProps {
  productId: string
  className?: string
  children?: React.ReactNode
}

export function AddToCartButton({ productId, className = "", children }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { toast } = useToast()
  const { addToCart, refreshCart } = useCartContext()

  const handleAddToCart = async () => {
    setIsLoading(true)

    try {
      await addToCart(productId)
      setIsAdded(true)
      refreshCart() // تحديث بيانات السلة
      toast({
        title: "تمت الإضافة بنجاح",
        description: "تمت إضافة المنتج إلى سلة التسوق"
      })
      
      setTimeout(() => {
        setIsAdded(false)
      }, 2000)
    } catch (error) {
      console.error("Error adding item to cart:", error)
      toast({
        title: "حدث خطأ",
        description: "فشلت إضافة المنتج إلى سلة التسوق",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleAddToCart} disabled={isLoading || isAdded} className={className}>
      {isLoading ? (
        <>
          <Loader2 className="ml-2 h-5 w-5 animate-spin" />
          جاري الإضافة...
        </>
      ) : isAdded ? (
        <>
          <Check className="ml-2 h-5 w-5" />
          تمت الإضافة
        </>
      ) : children ? (
        children
      ) : (
        <>
          <ShoppingCart className="ml-2 h-5 w-5" />
          إضافة للسلة
        </>
      )}
    </Button>
  )
}
