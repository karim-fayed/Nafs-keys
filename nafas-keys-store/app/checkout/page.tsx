"use client"

import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"
import { useRouter } from "next/navigation"

const countries = [
  { code: "+966", name: "السعودية", flag: "🇸🇦" },
  { code: "+971", name: "الإمارات", flag: "🇦🇪" },
  { code: "+20", name: "مصر", flag: "🇪🇬" },
]

export default function CheckoutPage() {
  const { cart, loading, clearCart } = useCart()
  const [form, setForm] = useState({
    email: "",
    phone: "",
    paymentMethod: "card",
    country: countries[0].code
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  if (loading) {
    return <div className="container mx-auto py-10 text-center">جاري تحميل السلة...</div>
  }

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold mb-6">إتمام الطلب</h1>
        <p>سلة التسوق فارغة. <Link href="/products" className="text-purple-600 hover:underline">تصفح المنتجات</Link></p>
      </div>
    )
  }

  const subtotal = cart.subtotal
  const tax = subtotal * 0.15 // 15% VAT
  const total = subtotal + tax

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, country: e.target.value })
  }

  const handlePaymentMethod = (value: string) => {
    setForm({ ...form, paymentMethod: value })
  }

  const handleOrder = async () => {
    setError("")
    if (!form.email || !form.phone) {
      setError("يرجى تعبئة جميع الحقول المطلوبة.")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: "-",
          customerEmail: form.email,
          customerPhone: `${form.country}${form.phone}`,
          paymentMethod: form.paymentMethod,
          items: cart.items.map((item) => ({
            productId: item.productId,
            name: item.product?.name || "منتج",
            image: item.product?.image || "/placeholder.svg",
            price: item.price,
            quantity: item.quantity
          })),
          subtotal,
          total,
          tax
        })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "حدث خطأ أثناء معالجة الطلب.")
      } else {
        await clearCart()
        router.push(`/thank-you?order=${data.orderId}`)
      }
    } catch (err) {
      setError("حدث خطأ أثناء معالجة الطلب.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-purple-600">
            الرئيسية
          </Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-purple-600">
            سلة التسوق
          </Link>
          <span className="mx-2">/</span>
          <span>إتمام الطلب</span>
        </div>

        <h1 className="mb-8 text-center text-3xl font-bold">إتمام الطلب</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border bg-white p-8 shadow-md">
              <h2 className="mb-6 text-xl font-semibold text-purple-700">معلومات الدفع</h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="email" className="mb-1 block text-base font-medium">البريد الإلكتروني</Label>
                  <Input id="email" type="email" placeholder="أدخل البريد الإلكتروني" className="mt-1 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200" value={form.email} onChange={handleChange} />
                  <p className="mt-1 text-sm text-gray-500">سيتم إرسال مفاتيح التنشيط إلى هذا البريد الإلكتروني</p>
                </div>

                <div>
                  <Label htmlFor="country" className="mb-1 block text-base font-medium">الدولة</Label>
                  <div className="flex items-center gap-2">
                    <select
                      id="country"
                      value={form.country}
                      onChange={handleCountryChange}
                      className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 px-3 py-2 text-base"
                    >
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                    <span className="text-lg font-bold text-gray-700">{countries.find(c => c.code === form.country)?.code}</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="mb-1 block text-base font-medium">رقم الهاتف</Label>
                  <div className="flex items-center rounded-lg border border-gray-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200">
                    <span className="px-3 text-gray-500 bg-gray-100 rounded-s-lg">{countries.find(c => c.code === form.country)?.flag}</span>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="5XXXXXXXX"
                      className="flex-1 border-0 bg-transparent focus:ring-0 rounded-none"
                      value={form.phone}
                      onChange={handleChange}
                      style={{ direction: "ltr" }}
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <h2 className="mb-6 text-xl font-semibold text-purple-700">طريقة الدفع</h2>

              <RadioGroup defaultValue={form.paymentMethod} onValueChange={handlePaymentMethod} className="space-y-4">
                <div className="flex flex-col gap-4">
                  <div className={`flex items-center space-x-2 space-x-reverse rounded-lg border p-4 transition-all ${form.paymentMethod === "card" ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}>
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex flex-1 cursor-pointer items-center">
                      <CreditCard className="ml-2 h-5 w-5 text-purple-600" />
                      <span>بطاقة ائتمان / مدى</span>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-2 space-x-reverse rounded-lg border p-4 transition-all ${form.paymentMethod === "stcpay" ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}>
                    <RadioGroupItem value="stcpay" id="stcpay" />
                    <Label htmlFor="stcpay" className="flex flex-1 cursor-pointer items-center">
                      <img src="/stcpay-logo.svg" alt="stc pay" className="ml-2 h-5 w-5" />
                      <span>STC Pay</span>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-2 space-x-reverse rounded-lg border p-4 transition-all ${form.paymentMethod === "applepay" ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}>
                    <RadioGroupItem value="applepay" id="applepay" />
                    <Label htmlFor="applepay" className="flex flex-1 cursor-pointer items-center">
                      <span>آبل باي</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {error && <div className="mt-4 text-red-600 text-sm font-medium">{error}</div>}
            </div>
          </div>

          <div>
            <div className="rounded-2xl border bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-purple-700">ملخص الطلب</h2>

              <div className="max-h-60 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.productId} className="mb-4 flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.product?.image || "/placeholder.svg"}
                        alt={item.product?.name || "منتج"}
                        width={60}
                        height={60}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="mr-4 flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium">{item.product?.name || "منتج"}</h3>
                        <p className="text-sm font-medium">{item.price.toFixed(2)} ر.س</p>
                      </div>
                      <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal.toFixed(2)} ر.س</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>ضريبة القيمة المضافة (15%)</span>
                  <span>{tax.toFixed(2)} ر.س</span>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>الإجمالي</span>
                  <span className="text-purple-600">{total.toFixed(2)} ر.س</span>
                </div>
              </div>

              <Button className="mt-6 w-full bg-gradient-to-l from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-lg font-bold py-3 rounded-xl shadow-lg transition-all duration-200" size="lg" onClick={handleOrder} disabled={submitting}>
                {submitting ? "...جاري معالجة الطلب" : "إتمام الطلب"}
              </Button>

              <p className="mt-4 text-center text-sm text-gray-500">
                بالضغط على "إتمام الطلب"، فإنك توافق على{" "}
                <Link href="/terms" className="text-purple-600 hover:underline">
                  شروط الخدمة
                </Link>{" "}
                و{" "}
                <Link href="/privacy" className="text-purple-600 hover:underline">
                  سياسة الخصوصية
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
