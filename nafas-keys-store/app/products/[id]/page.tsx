import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Check, ChevronLeft } from "lucide-react"

// Importamos la función para obtener el producto
import { getProductBySlug } from "@/lib/db-products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.id)

  if (!product) {
    return {
      title: "المنتج غير موجود",
    }
  }

  return {
    title: `${product.name} | مفاتيح نَفَس`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.id)

  if (!product) {
    notFound()
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            الرئيسية
          </Link>
          <ChevronLeft className="mx-1 h-4 w-4" />
          <Link href="/products" className="hover:text-foreground">
            المنتجات
          </Link>
          <ChevronLeft className="mx-1 h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-6">
            <div className="relative mb-4 h-64 w-full">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {product.additionalImages?.map((image, index) => (
                <div key={index} className="relative h-20 w-20 cursor-pointer rounded border p-1 hover:border-primary">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - صورة ${index + 2}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6">
              {product.badge && (
                <span className="mb-2 inline-block rounded bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-800">
                  {product.badge}
                </span>
              )}
              <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
              <div className="mb-4 flex items-center">
                <div className="text-2xl font-bold text-purple-600">{product.price.toFixed(2)} ر.س</div>
                {product.originalPrice && (
                  <>
                    <div className="mr-2 text-lg text-gray-500 line-through">
                      {product.originalPrice.toFixed(2)} ر.س
                    </div>
                    <div className="mr-2 rounded bg-green-100 px-2 py-0.5 text-sm font-medium text-green-800">
                      خصم {discount}%
                    </div>
                  </>
                )}
              </div>
              <p className="mb-4 text-gray-600">{product.description}</p>

              <div className="mb-6">
                <h3 className="mb-2 font-semibold">المميزات:</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="ml-2 h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <div className="mb-2 flex items-center">
                  <span className="font-semibold">الحالة:</span>
                  <span
                    className={`mr-2 rounded px-2 py-0.5 text-sm font-medium ${
                      product.inStock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock > 0 ? "متوفر" : "غير متوفر"}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">رمز المنتج:</span>
                  <span className="mr-2 text-gray-600">{product.sku || product.id}</span>
                </div>
              </div>

              <AddToCartButton productId={product.id} className="mb-6" />

              <div className="rounded border bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold">ضمان استرداد الأموال</h3>
                <p className="text-sm text-gray-600">
                  نضمن لك استرداد أموالك بالكامل في حال لم يعمل المفتاح بشكل صحيح خلال 30 يوماً من تاريخ الشراء.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">الوصف</TabsTrigger>
              <TabsTrigger value="installation">طريقة التفعيل</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4 rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-semibold">وصف المنتج</h2>
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <h3>المميزات الرئيسية:</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <p>يتم توفير مفتاح التفعيل فور إتمام عملية الشراء، ويمكنك استخدامه لتفعيل المنتج على جهاز واحد.</p>
              </div>
            </TabsContent>
            <TabsContent value="installation" className="mt-4 rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-semibold">طريقة التفعيل</h2>
              <div className="prose max-w-none">
                <ol>
                  <li>قم بتثبيت البرنامج على جهازك</li>
                  <li>عند طلب مفتاح التفعيل، أدخل المفتاح الذي حصلت عليه بعد الشراء</li>
                  <li>اتبع التعليمات لإكمال عملية التفعيل</li>
                  <li>استمتع بالبرنامج بشكل كامل!</li>
                </ol>
                <p>
                  في حال واجهتك أي مشكلة في التفعيل، يرجى التواصل مع فريق الدعم الفني على البريد الإلكتروني:
                  support@nafaskeys.com
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4 rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-semibold">تقييمات المنتج</h2>
              <div className="text-center">
                <p className="mb-4 text-gray-600">لا توجد تقييمات لهذا المنتج حتى الآن.</p>
                <Button>إضافة تقييم</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}
