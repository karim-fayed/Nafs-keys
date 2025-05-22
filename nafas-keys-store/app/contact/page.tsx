import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">اتصل بنا</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">تواصل معنا</h2>
            <p className="mb-6 text-gray-600">
              نحن هنا لمساعدتك. إذا كان لديك أي استفسار أو مشكلة، فلا تتردد في التواصل معنا من خلال النموذج أدناه أو عبر
              معلومات الاتصال المتوفرة.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input id="name" placeholder="أدخل اسمك" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" placeholder="أدخل بريدك الإلكتروني" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">الموضوع</Label>
                <Input id="subject" placeholder="أدخل موضوع الرسالة" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">الرسالة</Label>
                <Textarea id="message" placeholder="أدخل رسالتك" className="min-h-[150px]" />
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">إرسال الرسالة</Button>
            </form>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold">معلومات الاتصال</h2>
            <div className="mb-6 space-y-4">
              <Card>
                <CardContent className="flex items-start p-4">
                  <Mail className="ml-4 mt-1 h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="font-medium">البريد الإلكتروني</h3>
                    <p className="text-gray-600">support@nafaskeys.com</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start p-4">
                  <Phone className="ml-4 mt-1 h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="font-medium">رقم الهاتف</h3>
                    <p className="text-gray-600">+966 5XXXXXXXX</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start p-4">
                  <MapPin className="ml-4 mt-1 h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="font-medium">العنوان</h3>
                    <p className="text-gray-600">المملكة العربية السعودية</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start p-4">
                  <Clock className="ml-4 mt-1 h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="font-medium">ساعات العمل</h3>
                    <p className="text-gray-600">من الأحد إلى الخميس: 9:00 صباحًا - 5:00 مساءً</p>
                    <p className="text-gray-600">الجمعة والسبت: مغلق</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="mb-4 text-2xl font-semibold">تابعنا</h2>
            <div className="flex space-x-4 space-x-reverse">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">كيف يمكنني استلام مفتاح التنشيط بعد الشراء؟</h3>
              <p className="text-gray-600">
                بعد إتمام عملية الشراء، سيتم إرسال مفتاح التنشيط إلى بريدك الإلكتروني المسجل على الفور. يمكنك أيضًا
                الوصول إلى المفاتيح من خلال حسابك في قسم "مفاتيحي".
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">ما هي طرق الدفع المتاحة؟</h3>
              <p className="text-gray-600">
                نحن نقبل مجموعة متنوعة من طرق الدفع بما في ذلك بطاقات الائتمان (فيزا وماستركارد)، مدى، وآبل باي.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">هل المفاتيح أصلية؟</h3>
              <p className="text-gray-600">
                نعم، جميع مفاتيح التنشيط التي نقدمها أصلية 100% ومضمونة. نحن نوفر ضمان استرداد كامل في حال وجود أي
                مشكلة.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">كيف يمكنني الحصول على المساعدة إذا واجهت مشكلة؟</h3>
              <p className="text-gray-600">
                يمكنك التواصل معنا عبر البريد الإلكتروني أو الهاتف أو من خلال نموذج الاتصال في هذه الصفحة. فريق الدعم
                الفني متاح للمساعدة على مدار الساعة.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
