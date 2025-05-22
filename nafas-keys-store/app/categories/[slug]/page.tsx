import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
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

type CategoryData = {
  name: string
  description: string
  products: Product[]
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // هذه البيانات ستأتي من قاعدة البيانات لاحقًا
  const categories: Record<string, CategoryData> = {
    windows: {
      name: "أنظمة التشغيل",
      description: "مفاتيح تنشيط أصلية لأنظمة تشغيل مايكروسوفت ويندوز بأسعار منافسة وضمان مدى الحياة.",
      products: [
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
          image: "/windows-11-pro-desktop.png",
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
        {
          id: "win-server-2022",
          name: "ويندوز سيرفر 2022",
          image: "/placeholder.svg?height=300&width=300&query=Windows%20Server%202022%20Product%20Key%20Card",
          price: 299.99,
          inStock: true,
        },
        {
          id: "win-server-2019",
          name: "ويندوز سيرفر 2019",
          image: "/placeholder.svg?height=300&width=300&query=Windows%20Server%202019%20Product%20Key%20Card",
          price: 249.99,
          inStock: true,
        },
      ],
    },
    office: {
      name: "برامج المكتب",
      description: "مفاتيح تنشيط أصلية لبرامج مايكروسوفت أوفيس بأسعار منافسة وضمان مدى الحياة.",
      products: [
        {
          id: "office-2021",
          name: "أوفيس 2021 بروفيشنال بلس",
          image: "/office-2021-software-box.png",
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
        {
          id: "office-mac",
          name: "أوفيس 2021 لنظام ماك",
          image: "/placeholder.svg?height=300&width=300&query=Office%202021%20for%20Mac%20Product%20Key%20Card",
          price: 159.99,
          inStock: true,
        },
        {
          id: "office-home",
          name: "أوفيس 2021 هوم آند ستودنت",
          image:
            "/placeholder.svg?height=300&width=300&query=Office%202021%20Home%20and%20Student%20Product%20Key%20Card",
          price: 119.99,
          inStock: true,
        },
      ],
    },
    games: {
      name: "ألعاب",
      description: "مفاتيح تنشيط أصلية للألعاب الإلكترونية بأسعار منافسة.",
      products: [
        {
          id: "minecraft",
          name: "ماين كرافت (نسخة الكمبيوتر)",
          image: "/placeholder.svg?height=300&width=300&query=Minecraft%20Java%20Edition%20Product%20Key%20Card",
          price: 29.99,
          badge: "الأكثر مبيعاً",
          inStock: true,
        },
        {
          id: "fifa-23",
          name: "فيفا 23",
          image: "/placeholder.svg?height=300&width=300&query=FIFA%2023%20Product%20Key%20Card",
          price: 59.99,
          inStock: true,
        },
        {
          id: "gta-v",
          name: "جراند ثفت أوتو 5",
          image: "/placeholder.svg?height=300&width=300&query=Grand%20Theft%20Auto%20V%20Product%20Key%20Card",
          price: 39.99,
          inStock: true,
        },
        {
          id: "cod-mw",
          name: "كول أوف ديوتي: موديرن وورفير",
          image:
            "/placeholder.svg?height=300&width=300&query=Call%20of%20Duty%20Modern%20Warfare%20Product%20Key%20Card",
          price: 69.99,
          inStock: true,
        },
      ],
    },
    development: {
      name: "برامج التطوير",
      description: "مفاتيح تنشيط أصلية لبرامج التطوير والبرمجة بأسعار منافسة.",
      products: [
        {
          id: "visual-studio",
          name: "فيجوال ستوديو 2022 بروفيشنال",
          image:
            "/placeholder.svg?height=300&width=300&query=Visual%20Studio%202022%20Professional%20Product%20Key%20Card",
          price: 199.99,
          inStock: true,
        },
        {
          id: "jetbrains-all",
          name: "جيت براينز أول برودكتس باك",
          image: "/placeholder.svg?height=300&width=300&query=JetBrains%20All%20Products%20Pack%20Product%20Key%20Card",
          price: 249.99,
          badge: "الأكثر قيمة",
          inStock: true,
        },
        {
          id: "sql-server",
          name: "إس كيو إل سيرفر 2022 ستاندرد",
          image: "/placeholder.svg?height=300&width=300&query=SQL%20Server%202022%20Standard%20Product%20Key%20Card",
          price: 899.99,
          inStock: true,
        },
      ],
    },
  }

  const category = categories[params.slug]

  if (!category) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-4 text-3xl font-bold">الفئة غير موجودة</h1>
            <p className="mb-8 text-gray-600">عذراً، الفئة التي تبحث عنها غير موجودة.</p>
            <Button asChild>
              <Link href="/">العودة إلى الصفحة الرئيسية</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {category.products.map((product) => (
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
      </main>
      <Footer />
    </>
  )
}
