import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function Cta() {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-700 shadow-lg">
          <div className="px-6 py-12 text-center sm:px-12 md:py-16">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              جاهز للحصول على مفاتيح تنشيط أصلية بأفضل الأسعار؟
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-50">
              انضم إلى آلاف العملاء السعداء واحصل على مفاتيح تنشيط أصلية 100% مع ضمان مدى الحياة ودعم فني متميز
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:space-x-reverse">
              <Button size="lg" className="rounded-full bg-white text-primary hover:bg-gray-100">
                تصفح المنتجات
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-primary-600">
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
