"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { AddToCartButton } from "./add-to-cart-button"

interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  badge?: string
  inStock?: number
  status?: string
  slug?: string
  purchaseCount?: number
}

export function BestSellingProducts() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || data || [])
        setLoading(false)
      })
      .catch(() => {
        setError("فشل تحميل المنتجات")
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-10 text-white">جاري تحميل المنتجات...</div>
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>

  return (
    <section className="py-16 bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-right">
          <h2 className="text-3xl font-bold text-white">كل المنتجات</h2>
        </div>
        <div ref={sliderRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card-product-blue">
              <Link href={`/products/${product.slug || product.id}`}>
                <div className="aspect-square p-8 bg-blue-900/20 flex items-center justify-center">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={180}
                    height={180}
                    className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="p-5">
                <Link href={`/products/${product.slug || product.id}`}>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex flex-wrap items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-blue-300">
                    {product.price} ﷼
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice} ﷼
                    </span>
                  )}
                </div>
                <AddToCartButton 
                  productId={product.id} 
                  className="btn-blue-outline"
                >
                  <span>أضف للسلة</span>
                </AddToCartButton>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/products">
            <Button variant="outline" className="bg-blue-800/30 text-white hover:bg-blue-700 border-blue-700 rounded-lg">
              عرض كل المنتجات
              <ChevronLeft className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
