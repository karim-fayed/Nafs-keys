import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">إعدادات المتجر</h2>
        <p className="text-muted-foreground">إدارة إعدادات المتجر والمظهر وطرق الدفع والإشعارات.</p>
      </div>

      <Separator />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="appearance">المظهر</TabsTrigger>
          <TabsTrigger value="payment">طرق الدفع</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>معلومات المتجر</CardTitle>
              <CardDescription>المعلومات الأساسية للمتجر التي ستظهر للعملاء.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="store-name">اسم المتجر</Label>
                  <Input id="store-name" defaultValue="مفاتيح نَفَس | Nafas Keys" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-email">البريد الإلكتروني للمتجر</Label>
                  <Input id="store-email" type="email" defaultValue="support@nafaskeys.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-phone">رقم الهاتف</Label>
                  <Input id="store-phone" type="tel" defaultValue="+966 5XXXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-currency">العملة</Label>
                  <Input id="store-currency" defaultValue="ر.س" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-description">وصف المتجر</Label>
                <Textarea
                  id="store-description"
                  defaultValue="متجرك الموثوق لشراء مفاتيح تنشيط البرامج والمنتجات الرقمية بأسعار منافسة وضمان الجودة"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-address">العنوان</Label>
                <Textarea id="store-address" defaultValue="المملكة العربية السعودية" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات الضرائب</CardTitle>
              <CardDescription>إعدادات الضرائب المطبقة على المنتجات.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تفعيل ضريبة القيمة المضافة</Label>
                  <p className="text-sm text-muted-foreground">تطبيق ضريبة القيمة المضافة على جميع المنتجات.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-rate">نسبة الضريبة (%)</Label>
                <Input id="tax-rate" type="number" defaultValue="15" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>الشعار والأيقونة</CardTitle>
              <CardDescription>تخصيص شعار وأيقونة المتجر.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>شعار المتجر</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-40 rounded-md border border-dashed p-2">
                      <img src="/logo.png" alt="شعار المتجر" className="h-full w-auto object-contain" />
                    </div>
                    <Button variant="outline">تغيير الشعار</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>أيقونة المتجر</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-md border border-dashed p-2">
                      <div className="h-full w-full rounded-md bg-gray-100"></div>
                    </div>
                    <Button variant="outline">تغيير الأيقونة</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الألوان والمظهر</CardTitle>
              <CardDescription>تخصيص ألوان ومظهر المتجر.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">اللون الرئيسي</Label>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-md bg-purple-600"></div>
                    <Input id="primary-color" defaultValue="#7e22ce" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">اللون الثانوي</Label>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-md bg-gray-100"></div>
                    <Input id="secondary-color" defaultValue="#f3f4f6" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>الوضع المظلم</Label>
                  <p className="text-sm text-muted-foreground">تفعيل الوضع المظلم للمتجر.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>طرق الدفع</CardTitle>
              <CardDescription>إدارة طرق الدفع المتاحة في المتجر.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>بطاقات الائتمان (فيزا/ماستركارد)</Label>
                  <p className="text-sm text-muted-foreground">قبول الدفع ببطاقات فيزا وماستركارد.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>مدى</Label>
                  <p className="text-sm text-muted-foreground">قبول الدفع ببطاقات مدى.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>آبل باي</Label>
                  <p className="text-sm text-muted-foreground">قبول الدفع عبر آبل باي.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>التحويل البنكي</Label>
                  <p className="text-sm text-muted-foreground">قبول الدفع عبر التحويل البنكي.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>إدارة إشعارات المتجر والبريد الإلكتروني.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>إشعارات الطلبات الجديدة</Label>
                  <p className="text-sm text-muted-foreground">استلام إشعار عند وجود طلب جديد.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>إشعارات المستخدمين الجدد</Label>
                  <p className="text-sm text-muted-foreground">استلام إشعار عند تسجيل مستخدم جديد.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>إشعارات انخفاض المخزون</Label>
                  <p className="text-sm text-muted-foreground">استلام إشعار عند انخفاض مخزون المنتج.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="notification-email">البريد الإلكتروني للإشعارات</Label>
                <Input id="notification-email" type="email" defaultValue="admin@nafaskeys.com" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button>حفظ الإعدادات</Button>
      </div>
    </div>
  )
}
