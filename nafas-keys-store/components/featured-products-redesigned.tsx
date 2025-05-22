import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, ArrowLeft, ChevronLeft } from "lucide-react"
import { AddToCartButton } from "./add-to-cart-button"

type Product = {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  badge?: string
  inStock: boolean
  rating?: number
  slug?: string
}

type FeaturedProductsProps = {
  category: string
  title: string
}

export function FeaturedProducts({ category, title }: FeaturedProductsProps) {
  // This would come from your API or database
  const products: Product[] =
    category === "windows"
      ? [
          {
            id: "win10-pro",
            name: "ويندوز 10 برو",
            image: "/windows-10-pro-key-card.png",
            price: 99.99,
            originalPrice: 199.99,
            badge: "الأكثر مبيعاً",
            inStock: true,
            rating: 4.9,
            slug: "windows-10-pro"
          },
          {
            id: "win11-pro",
            name: "ويندوز 11 برو",
            image: "/windows-11-pro-desktop.png",
            price: 119.99,
            badge: "جديد",
            inStock: true,
            rating: 4.7,
            slug: "windows-11-pro"
          },
          {
            id: "win10-home",
            name: "ويندوز 10 هوم",
            image: "/placeholder.svg?height=300&width=300&query=Windows%2010%20Home%20Product%20Key%20Card",
            price: 89.99,
            originalPrice: 149.99,
            inStock: true,
            rating: 4.5,
            slug: "windows-10-home"
          },
          {
            id: "win11-home",
            name: "ويندوز 11 هوم",
            image: "/placeholder.svg?height=300&width=300&query=Windows%2011%20Home%20Product%20Key%20Card",
            price: 109.99,
            inStock: true,
            rating: 4.6,
            slug: "windows-11-home"
          },
        ]
      : [
          {
            id: "office-2021-pro",
            name: "أوفيس 2021 بروفيشنال",
            image: "/office-2021-software-box.png",
            price: 129.99,
            originalPrice: 249.99,
            badge: "الأكثر مبيعاً",
            inStock: true,
            rating: 4.8,
            slug: "office-2021-pro"
          },
          {
            id: "office-2021-home",
            name: "أوفيس 2021 هوم",
            image: "/office-2021-apps.png",
            price: 99.99,
            originalPrice: 199.99,
            inStock: true,
            rating: 4.7,
            slug: "office-2021-home"
          },
          {
            id: "office-2019-pro",
            name: "أوفيس 2019 بروفيشنال",
            image: "/placeholder.svg?height=300&width=300&query=Office%202019%20Professional%20Product%20Key%20Card",
            price: 89.99,
            originalPrice: 179.99,
            inStock: true,
            rating: 4.6,
            slug: "office-2019-pro"
          },
          {
            id: "office-365",
            name: "مايكروسوفت 365",
            image: "/placeholder.svg?height=300&width=300&query=Microsoft%20365%20Product%20Key%20Card",
            price: 69.99,
            badge: "اشتراك سنوي",
            inStock: true,
            rating: 4.9,
            slug: "microsoft-365"
          },
        ]

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="section-title mb-2">{title}</h2>
            <p className="text-lg text-gray-600">أفضل المفاتيح الأصلية بأسعار تنافسية</p>
          </div>          <Link href={`/categories/${category}`}>
            <Button variant="outline" className="rounded-full border-primary-200 hover:bg-primary-50">
              عرض الكل
              <ChevronLeft className="ml-1 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden rounded-xl border-0 shadow-card transition-all hover:shadow-card-hover">
              <Link href={`/products/${product.slug || product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-50 p-6">                  {product.badge && (
                    <Badge
                      className="absolute left-3 top-3 z-10 bg-primary px-3 py-1 font-medium text-white"
                    >
                      {product.badge}
                    </Badge>
                  )}                  <div className="absolute left-3 top-3 z-10">
                    <Button variant="ghost" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white">
                      <Heart className="h-5 w-5 text-gray-600" />
                      <span className="sr-only">إضافة للمفضلة</span>
                    </Button>
                  </div>
                  <div className="flex h-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="h-auto max-h-full w-auto max-w-full object-contain"
                    />
                  </div>
                </div>
              </Link>
              <CardContent className="p-6">                <div className="mb-1 flex items-center">
                  <div className="flex items-center text-amber-500">
                    <Star className="ml-1 h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm text-green-600 font-medium">
                    {product.inStock ? "متوفر" : "غير متوفر"}
                  </span>
                </div>
                <Link href={`/products/${product.slug || product.id}`} className="group-hover:text-primary-600">
                  <h3 className="mb-2 text-lg font-semibold transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-gray-900">{product.price} ريال</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice} ريال</span>
                  )}                  {product.originalPrice && (
                    <span className="mr-2 text-sm font-medium text-green-600">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% خصم
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">                <AddToCartButton productId={product.id} className="w-full rounded-full btn-primary-gradient">
                  <ShoppingCart className="ml-2 h-5 w-5" />
                  إضافة للسلة
                </AddToCartButton>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
