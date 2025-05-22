"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash, Plus, Minus, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const {
    cart,
    loading,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart()
  const router = useRouter()

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">سلة التسوق</h1>
        <p>جاري تحميل السلة...</p>
      </div>
    )
  }

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">سلة التسوق</h1>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-10">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">سلة التسوق فارغة</p>
            <p className="text-muted-foreground mb-6">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد.</p>
            <Button asChild>
              <Link href="/products">تصفح المنتجات</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">سلة التسوق</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>المنتجات ({cart.itemCount})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.productId} className="flex items-center space-x-4 space-x-reverse">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image 
                      src={item.product?.image || "/placeholder.svg"} 
                      alt={item.product?.name || "Product"} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <Link href={`/products/${item.product?.slug}`} className="font-medium hover:underline">
                      {item.product?.name}
                    </Link>
                    <p className="text-muted-foreground">{item.price.toFixed(2)} ر.س</p>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right font-medium">{(item.price * item.quantity).toFixed(2)} ر.س</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span>{cart.subtotal.toFixed(2)} ر.س</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>الإجمالي</span>
                <span>{cart.total.toFixed(2)} ر.س</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                إتمام الطلب
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
