import { Button } from "@/components/ui/button"
import { ArrowRight, Check, ChevronRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-16">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute left-20 top-60 h-60 w-60 rounded-full bg-accent/20 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">          <div className="animate-fadeIn space-y-6 text-center lg:text-start">
            <div className="inline-block rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-primary-600">
              أفضل متجر لمفاتيح التنشيط الأصلية
            </div>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
              مفاتيح تنشيط أصلية <span className="gradient-text">بأسعار منافسة</span>
            </h1>
            <p className="text-lg text-gray-600">
              احصل على مفاتيح تنشيط أصلية 100% لبرامج مايكروسوفت والألعاب وبرامج الحماية بأفضل الأسعار مع ضمان مدى
              الحياة
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">              <Link href="/products">
                <Button size="lg" className="btn-primary-gradient rounded-full shadow-md">
                  تصفح المنتجات
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="rounded-full border-primary-200 shadow-sm">
                  عروض خاصة
                </Button>
              </Link>
            </div>            <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-gray-600 lg:justify-start">
              <div className="flex items-center">
                <Check className="ml-2 h-5 w-5 text-green-500" />
                <span>ضمان استرداد الأموال</span>
              </div>
              <div className="flex items-center">
                <Check className="ml-2 h-5 w-5 text-green-500" />
                <span>تسليم فوري</span>
              </div>
              <div className="flex items-center">
                <Check className="ml-2 h-5 w-5 text-green-500" />
                <span>دعم فني 24/7</span>
              </div>
            </div>
          </div>
          <div className="relative animate-slideUp">
            <div className="relative mx-auto max-w-lg lg:mr-0">
              <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-accent/10 blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-xl"></div>
              <div className="animate-floatY overflow-hidden rounded-2xl bg-white p-3 shadow-card-hover">
                <img
                  src="/windows-11-pro-desktop.png"
                  alt="مفاتيح نَفَس"
                  className="h-auto w-full rounded-xl object-cover"
                  width={500}
                  height={300}
                />
                <div className="absolute -bottom-2 -right-2 rotate-12">
                  <div className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg">
                    خصم 50%
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 left-0 right-0 mx-auto flex max-w-md justify-center">
              <div className="animate-scaleIn rounded-lg bg-white p-4 shadow-card-hover">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">أكثر من 10,000 عميل سعيد</p>
                    <p className="text-sm text-gray-600">انضم إليهم الآن!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,197.3C672,213,768,203,864,170.7C960,139,1056,85,1152,64C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
