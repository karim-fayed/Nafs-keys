"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package, Key, CreditCard, User, ShieldCheck } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"

export default function AccountPage() {
  const { isAuthenticated, session } = useAuth()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState("orders")

  // تعيين التبويب النشط بناءً على معلمة URL
  useEffect(() => {
    if (tabParam && ["orders", "keys", "payment", "profile", "security"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  // هذه البيانات ستأتي من قاعدة البيانات لاحقًا
  const orders = [
    {
      id: "ORD-12345",
      date: "2025-05-15",
      total: 249.98,
      status: "مكتمل",
      products: [
        { name: "ويندوز 10 برو", price: 99.99 },
        { name: "أوفيس 2021 بروفيشنال بلس", price: 149.99 },
      ],
    },
    {
      id: "ORD-12344",
      date: "2025-05-01",
      total: 99.99,
      status: "مكتمل",
      products: [{ name: "ويندوز 11 برو", price: 99.99 }],
    },
  ]

  // هذه البيانات ستأتي من قاعدة البيانات لاحقًا
  const keys = [
    {
      id: "KEY-67890",
      product: "ويندوز 10 برو",
      purchaseDate: "2025-05-15",
      expiryDate: "غير محدد (مدى الحياة)",
      status: "نشط",
    },
    {
      id: "KEY-67891",
      product: "أوفيس 2021 بروفيشنال بلس",
      purchaseDate: "2025-05-15",
      expiryDate: "غير محدد (مدى الحياة)",
      status: "نشط",
    },
    {
      id: "KEY-67892",
      product: "ويندوز 11 برو",
      purchaseDate: "2025-05-01",
      expiryDate: "غير محدد (مدى الحياة)",
      status: "نشط",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">حسابي</h1>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="orders" className="flex items-center">
              <Package className="ml-2 h-4 w-4" />
              <span className="hidden sm:inline">طلباتي</span>
            </TabsTrigger>
            <TabsTrigger value="keys" className="flex items-center">
              <Key className="ml-2 h-4 w-4" />
              <span className="hidden sm:inline">مفاتيحي</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center">
              <CreditCard className="ml-2 h-4 w-4" />
              <span className="hidden sm:inline">طرق الدفع</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center">
              <User className="ml-2 h-4 w-4" />
              <span className="hidden sm:inline">الملف الشخصي</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <ShieldCheck className="ml-2 h-4 w-4" />
              <span className="hidden sm:inline">الأمان</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>طلباتي</CardTitle>
                <CardDescription>عرض وإدارة طلباتك السابقة</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="rounded-lg border p-4">
                        <div className="mb-4 flex flex-wrap items-center justify-between">
                          <div>
                            <p className="font-medium">رقم الطلب: {order.id}</p>
                            <p className="text-sm text-gray-500">
                              تاريخ الطلب: {new Date(order.date).toLocaleDateString("ar-SA")}
                            </p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                              {order.status}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {order.products.map((product, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{product.name}</span>
                              <span>{product.price.toFixed(2)} ر.س</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex justify-between border-t pt-4">
                          <span className="font-medium">الإجمالي</span>
                          <span className="font-medium text-purple-600">{order.total.toFixed(2)} ر.س</span>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            عرض التفاصيل
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Package className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-lg font-medium">لا توجد طلبات</h3>
                    <p className="mt-1 text-gray-500">لم تقم بإجراء أي طلبات بعد</p>
                    <Button asChild className="mt-4">
                      <Link href="/products">تصفح المنتجات</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keys" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>مفاتيحي</CardTitle>
                <CardDescription>عرض وإدارة مفاتيح التنشيط الخاصة بك</CardDescription>
              </CardHeader>
              <CardContent>
                {keys.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 text-right font-medium">المنتج</th>
                          <th className="py-3 text-right font-medium">تاريخ الشراء</th>
                          <th className="py-3 text-right font-medium">تاريخ الانتهاء</th>
                          <th className="py-3 text-right font-medium">الحالة</th>
                          <th className="py-3 text-right font-medium">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {keys.map((key) => (
                          <tr key={key.id} className="border-b">
                            <td className="py-4">{key.product}</td>
                            <td className="py-4">{new Date(key.purchaseDate).toLocaleDateString("ar-SA")}</td>
                            <td className="py-4">{key.expiryDate}</td>
                            <td className="py-4">
                              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                                {key.status}
                              </span>
                            </td>
                            <td className="py-4">
                              <Button variant="outline" size="sm">
                                عرض المفتاح
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Key className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-lg font-medium">لا توجد مفاتيح</h3>
                    <p className="mt-1 text-gray-500">لم تقم بشراء أي مفاتيح تنشيط بعد</p>
                    <Button asChild className="mt-4">
                      <Link href="/products">تصفح المنتجات</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>طرق الدفع</CardTitle>
                <CardDescription>إدارة طرق الدفع الخاصة بك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="ml-3 h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">فيزا ****4242</p>
                          <p className="text-sm text-gray-500">تنتهي في 05/2026</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button variant="outline" size="sm">
                          تعديل
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                          حذف
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">إضافة طريقة دفع جديدة</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>الملف الشخصي</CardTitle>
                <CardDescription>تحديث معلومات ملفك الشخصي</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">الاسم</Label>
                      <Input id="firstName" defaultValue={session?.user?.name || ""} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" defaultValue={session?.user?.email || ""} readOnly />
                      <p className="text-xs text-muted-foreground">لا يمكن تغيير البريد الإلكتروني</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" type="tel" defaultValue="" />
                  </div>

                  <Button type="submit">حفظ التغييرات</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>الأمان</CardTitle>
                <CardDescription>إدارة إعدادات الأمان وكلمة المرور</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">تغيير كلمة المرور</h3>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                        <Input id="currentPassword" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                        <Input id="newPassword" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>

                      <Button type="submit">تغيير كلمة المرور</Button>
                    </form>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="mb-4 text-lg font-medium">التحقق بخطوتين</h3>
                    <p className="mb-4 text-gray-600">
                      التحقق بخطوتين يضيف طبقة إضافية من الأمان لحسابك عن طريق طلب رمز تحقق بالإضافة إلى كلمة المرور.
                    </p>
                    <Button variant="outline">تفعيل التحقق بخطوتين</Button>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="mb-4 text-lg font-medium text-red-600">حذف الحساب</h3>
                    <p className="mb-4 text-gray-600">
                      حذف حسابك سيؤدي إلى إزالة جميع بياناتك من نظامنا. هذا الإجراء لا يمكن التراجع عنه.
                    </p>
                    <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                      حذف الحساب
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  )
}
