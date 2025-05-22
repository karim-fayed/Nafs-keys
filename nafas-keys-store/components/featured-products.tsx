import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"

type Product = {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  badge?: string
  inStock: boolean
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
          },
          {
            id: "win11-pro",
            name: "ويندوز 11 برو",
            image: "/placeholder.svg?height=300&width=300&query=Windows%2011%20Pro%20Product%20Key%20Card",
            price: 119.99,
            badge: "جديد",
            inStock: true,
          },
          {
            id: "win10-home",
            name: "ويندوز 10 هوم",
            image: "/placeholder.svg?height=300&width=300&query=Windows%2010%20Home%20Product%20Key%20Card",
            price: 89.99,
            badge: "يوصى به",
            inStock: true,
          },
          {
            id: "win11-home",
            name: "ويندوز 11 هوم",
            image: "/placeholder.svg?height=300&width=300&query=Windows%2011%20Home%20Product%20Key%20Card",
            price: 99.99,
            inStock: true,
          },
        ]
      : [
          {
            id: "office-2021",
            name: "أوفيس 2021 بروفيشنال بلس",
            image:
              "/placeholder.svg?height=300&width=300&query=Office%202021%20Professional%20Plus%20Product%20Key%20Card",
            price: 149.99,
            originalPrice: 249.99,
            badge: "توفر كمية محدودة",
            inStock: true,
          },
          {
            id: "office-2019",
            name: "أوفيس 2019 بروفيشنال بلس",
            image:
              "/placeholder.svg?height=300&width=300&query=Office%202019%20Professional%20Plus%20Product%20Key%20Card",
            price: 129.99,
            badge: "أقل سعر",
            inStock: true,
          },
          {
            id: "office-2016",
            name: "أوفيس 2016 بروفيشنال بلس",
            image:
              "/placeholder.svg?height=300&width=300&query=Office%202016%20Professional%20Plus%20Product%20Key%20Card",
            price: 99.99,
            inStock: true,
          },
          {
            id: "office-365",
            name: "مايكروسوفت 365 (اشتراك سنوي)",
            image: "/placeholder.svg?height=300&width=300&query=Microsoft%20365%20Subscription%20Product%20Key%20Card",
            price: 69.99,
            badge: "الأكثر مبيعاً",
            inStock: false,
          },
        ]

  return (
    <section className="py-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link href={`/categories/${category}`} className="text-sm font-medium text-purple-600 hover:underline">
          عرض الكل
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative">
              <Link href={`/products/${product.id}`}>
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-2 rounded-full bg-white/80 backdrop-blur-sm"
              >
                <Heart className="h-5 w-5" />
                <span className="sr-only">إضافة للمفضلة</span>
              </Button>

              {product.badge && <Badge className="absolute right-2 top-2 bg-purple-600">{product.badge}</Badge>}
            </div>

            <CardContent className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="mb-2 font-medium hover:text-purple-600">{product.name}</h3>
              </Link>

              <div className="flex items-center">
                <p className="text-lg font-bold text-purple-600">{product.price.toFixed(2)} ر.س</p>

                {product.originalPrice && (
                  <p className="mr-2 text-sm text-gray-500 line-through">{product.originalPrice.toFixed(2)} ر.س</p>
                )}
              </div>

              <p className="mt-1 text-sm text-gray-500">{product.inStock ? "متوفر" : "نفذت الكمية"}</p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                إضافة للسلة
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
