import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-purple-900 to-purple-700 py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">مفاتيح نَفَس | Nafas Keys</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">
          متجرك الموثوق لشراء مفاتيح تنشيط البرامج والمنتجات الرقمية بأسعار منافسة وضمان الجودة
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:space-x-reverse">
          <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
            <Link href="/products">تصفح المنتجات</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            <Link href="/categories/featured">العروض المميزة</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
