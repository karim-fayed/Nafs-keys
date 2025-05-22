import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, ShieldCheck, Clock, HeadphonesIcon, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-4xl font-bold">من نحن</h1>
              <p className="mb-6 text-lg text-gray-600">
                مفاتيح نَفَس هو متجر إلكتروني متخصص في بيع مفاتيح تنشيط البرامج والمنتجات الرقمية بأسعار منافسة وضمان
                الجودة. نحن نسعى لتوفير تجربة تسوق سهلة وآمنة لعملائنا مع ضمان أصالة جميع المنتجات التي نقدمها.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="ml-2 mt-1 h-5 w-5 text-purple-600" />
                  <div>
                    <h3 className="font-medium">مفاتيح أصلية 100%</h3>
                    <p className="text-gray-600">نضمن أصالة جميع مفاتيح التنشيط التي نقدمها.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="ml-2 mt-1 h-5 w-5 text-purple-600" />
                  <div>
                    <h3 className="font-medium">أسعار منافسة</h3>
                    <p className="text-gray-600">نقدم أفضل الأسعار في السوق مع ضمان الجودة.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="ml-2 mt-1 h-5 w-5 text-purple-600" />
                  <div>
                    <h3 className="font-medium">دعم فني متميز</h3>
                    <p className="text-gray-600">فريق دعم فني متاح على مدار الساعة لمساعدتك.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/products">تصفح منتجاتنا</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image src="/about-image.png" alt="فريق مفاتيح نَفَس" width={500} height={400} className="rounded-lg" />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">لماذا تختار مفاتيح نَفَس؟</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <ShieldCheck className="mb-4 h-12 w-12 text-purple-600" />
                <h3 className="mb-2 text-xl font-semibold">ضمان الجودة</h3>
                <p className="text-gray-600">
                  نضمن أصالة جميع مفاتيح التنشيط التي نقدمها، ونوفر ضمان استرداد كامل في حال وجود أي مشكلة.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Clock className="mb-4 h-12 w-12 text-purple-600" />
                <h3 className="mb-2 text-xl font-semibold">تسليم فوري</h3>
                <p className="text-gray-600">
                  بعد إتمام عملية الدفع، ستتلقى مفاتيح التنشيط الخاصة بك على الفور عبر البريد الإلكتروني.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <HeadphonesIcon className="mb-4 h-12 w-12 text-purple-600" />
                <h3 className="mb-2 text-xl font-semibold">دعم فني متميز</h3>
                <p className="text-gray-600">
                  فريق دعم فني متاح على مدار الساعة لمساعدتك في أي استفسار أو مشكلة قد تواجهك.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Award className="mb-4 h-12 w-12 text-purple-600" />
                <h3 className="mb-2 text-xl font-semibold">خبرة واسعة</h3>
                <p className="text-gray-600">
                  نتمتع بخبرة واسعة في مجال المنتجات الرقمية ومفاتيح التنشيط، مما يضمن لك الحصول على أفضل الخدمات.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Users className="mb-4 h-12 w-12 text-purple-600" />
                <h3 className="mb-2 text-xl font-semibold">ثقة العملاء</h3>
                <p className="text-gray-600">
                  يثق بنا آلاف العملاء في المملكة العربية السعودية والوطن العربي، ونسعى دائمًا لتلبية توقعاتهم.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <ShieldCheck className="mb-4 h-12 w-12 text-purple-600" />
                <h3 className="mb-2 text-xl font-semibold">دفع آمن</h3>
                <p className="text-gray-600">نوفر طرق دفع آمنة ومتعددة لضمان حماية معلوماتك المالية والشخصية.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">فريقنا</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160&query=Person%201"
                  alt="عضو الفريق"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-semibold">أحمد محمد</h3>
              <p className="text-purple-600">المؤسس والرئيس التنفيذي</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160&query=Person%202"
                  alt="عضو الفريق"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-semibold">سارة أحمد</h3>
              <p className="text-purple-600">مديرة التسويق</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160&query=Person%203"
                  alt="عضو الفريق"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-semibold">محمد علي</h3>
              <p className="text-purple-600">مدير تقنية المعلومات</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160&query=Person%204"
                  alt="عضو الفريق"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1 text-xl font-semibold">فاطمة خالد</h3>
              <p className="text-purple-600">مديرة خدمة العملاء</p>
            </div>
          </div>
        </section>

        <section>
          <div className="rounded-lg bg-purple-50 p-8">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold">تواصل معنا</h2>
              <p className="mb-8 text-gray-600">
                نحن هنا لمساعدتك. إذا كان لديك أي استفسار أو مشكلة، فلا تتردد في التواصل معنا.
              </p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/contact">اتصل بنا</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
