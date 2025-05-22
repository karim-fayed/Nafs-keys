import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Upload, Trash, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// هذه البيانات ستأتي من قاعدة البيانات لاحقًا
const products = {
  "win10-pro": {
    id: "win10-pro",
    name: "ويندوز 10 برو",
    slug: "windows-10-pro",
    description:
      "مفتاح تنشيط أصلي لنظام التشغيل ويندوز 10 برو. يمكنك استخدامه لتنشيط نسخة جديدة أو ترقية نسختك الحالية.",
    features: [
      "مفتاح تنشيط أصلي 100%",
      "تنشيط مدى الحياة",
      "دعم التحديثات الرسمية",
      "تسليم فوري بعد الدفع",
      "دعم فني متاح 24/7",
    ],
    image: "/windows-10-pro-key-card.png",
    additionalImages: ["/windows-10-pro-desktop.png", "/windows-10-pro-activation.png"],
    price: 99.99,
    originalPrice: 199.99,
    badge: "الأكثر مبيعاً",
    inStock: 150,
    sku: "WIN10-PRO-001",
    category: "windows",
    status: "active",
    keys: [
      { id: "KEY-67890", key: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX", status: "available" },
      { id: "KEY-67891", key: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX", status: "available" },
      { id: "KEY-67892", key: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX", status: "available" },
    ],
  },
  "office-2021": {
    id: "office-2021",
    name: "أوفيس 2021 بروفيشنال بلس",
    slug: "office-2021-professional-plus",
    description:
      "مفتاح تنشيط أصلي لحزمة مايكروسوفت أوفيس 2021 بروفيشنال بلس. يتضمن وورد، إكسل، باوربوينت، أوتلوك، وأكثر.",
    features: [
      "مفتاح تنشيط أصلي 100%",
      "ترخيص دائم (مدى الحياة)",
      "يدعم جميع تطبيقات أوفيس الأساسية",
      "تسليم فوري بعد الدفع",
      "دعم فني متاح 24/7",
    ],
    image: "/office-2021-software-box.png",
    additionalImages: ["/office-2021-apps.png", "/office-2021-activation.png"],
    price: 149.99,
    originalPrice: 249.99,
    badge: "توفر كمية محدودة",
    inStock: 85,
    sku: "OFF21-PRO-001",
    category: "office",
    status: "active",
    keys: [
      { id: "KEY-67893", key: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX", status: "available" },
      { id: "KEY-67894", key: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX", status: "available" },
    ],
  },
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = products[params.id as keyof typeof products]

  if (!product) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">المنتج غير موجود</h2>
        <p className="mb-4 text-muted-foreground">لم يتم العثور على المنتج المطلوب</p>
        <Button asChild>
          <Link href="/dashboard/products">العودة إلى المنتجات</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>
          <p className="text-muted-foreground">تعديل معلومات المنتج وإدارة المخزون والمفاتيح.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/products">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة
            </Link>
          </Button>
          <Button type="submit">حفظ التغييرات</Button>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="basic">المعلومات الأساسية</TabsTrigger>
          <TabsTrigger value="media">الصور والوسائط</TabsTrigger>
          <TabsTrigger value="pricing">التسعير والمخزون</TabsTrigger>
          <TabsTrigger value="keys">المفاتيح</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 py-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">اسم المنتج</Label>
              <Input id="name" defaultValue={product.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">الرابط المخصص</Label>
              <Input id="slug" defaultValue={product.slug} />
              <p className="text-xs text-muted-foreground">سيظهر هذا في عنوان URL للمنتج.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">الفئة</Label>
              <Select defaultValue={product.category}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="windows">أنظمة التشغيل</SelectItem>
                  <SelectItem value="office">برامج المكتب</SelectItem>
                  <SelectItem value="games">ألعاب</SelectItem>
                  <SelectItem value="development">برامج التطوير</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">الحالة</Label>
              <Select defaultValue={product.status}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="draft">مسودة</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">وصف المنتج</Label>
              <Textarea id="description" defaultValue={product.description} className="min-h-[150px]" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="features">مميزات المنتج</Label>
              <Textarea id="features" defaultValue={product.features.join("\n")} className="min-h-[100px]" />
              <p className="text-xs text-muted-foreground">أدخل كل ميزة في سطر منفصل. مثال: مفتاح تنشيط أصلي 100%</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-4 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>صورة المنتج الرئيسية</Label>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="mb-4 flex h-[200px] w-full items-center justify-center rounded-md border border-dashed">
                    <div className="relative h-full w-full">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      تغيير الصورة
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                      <Trash className="ml-2 h-4 w-4" />
                      حذف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <Label>صور إضافية للمنتج</Label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {product.additionalImages?.map((image, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="mb-2 flex h-[150px] w-full items-center justify-center rounded-md border border-dashed">
                        <div className="relative h-full w-full">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${product.name} - صورة ${index + 1}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                          <Trash className="ml-2 h-4 w-4" />
                          حذف
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="mb-2 flex h-[150px] w-full items-center justify-center rounded-md border border-dashed">
                      <div className="flex flex-col items-center justify-center text-center">
                        <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                        <p className="text-sm font-medium">إضافة صورة جديدة</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      اختيار ملف
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4 py-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">السعر (ر.س)</Label>
              <Input id="price" type="number" defaultValue={product.price} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="originalPrice">السعر الأصلي (ر.س)</Label>
              <Input id="originalPrice" type="number" defaultValue={product.originalPrice || ""} />
              <p className="text-xs text-muted-foreground">اتركه فارغًا إذا لم يكن هناك خصم.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">المخزون</Label>
              <Input id="stock" type="number" defaultValue={product.inStock} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">رمز المنتج (SKU)</Label>
              <Input id="sku" defaultValue={product.sku} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="badge">شارة المنتج</Label>
              <Input id="badge" defaultValue={product.badge || ""} />
              <p className="text-xs text-muted-foreground">
                ستظهر هذه الشارة على صورة المنتج. اتركها فارغة إذا لم تكن هناك شارة.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="keys" className="space-y-4 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">مفاتيح التنشيط ({product.keys.length})</h3>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                إضافة مفاتيح
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم المفتاح</TableHead>
                    <TableHead>مفتاح التنشيط</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.keys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.id}</TableCell>
                      <TableCell>{key.key}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            key.status === "available"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          }
                        >
                          {key.status === "available" ? "متاح" : "مستخدم"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                          <Trash className="ml-2 h-4 w-4" />
                          حذف
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="space-y-2">
              <Label>إضافة مفاتيح جديدة</Label>
              <Textarea placeholder="أدخل مفاتيح التنشيط (كل مفتاح في سطر منفصل)" className="min-h-[150px]" />
              <p className="text-xs text-muted-foreground">
                أدخل كل مفتاح تنشيط في سطر منفصل. سيتم تخصيص مفتاح واحد لكل طلب.
              </p>
              <div className="flex justify-end">
                <Button variant="outline">إضافة المفاتيح</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2 space-x-reverse">
        <Button variant="outline" className="text-red-500 hover:bg-red-50 hover:text-red-600">
          <Trash className="ml-2 h-4 w-4" />
          حذف المنتج
        </Button>
        <Button variant="outline">حفظ كمسودة</Button>
        <Button>حفظ التغييرات</Button>
      </div>
    </div>
  )
}
