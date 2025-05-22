import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight, FileText, Printer, Mail, Copy } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// هذه البيانات ستأتي من قاعدة البيانات لاحقًا
const orders = {
  "ORD-12345": {
    id: "ORD-12345",
    customer: {
      name: "محمد أحمد",
      email: "mohammed@example.com",
      phone: "+966 5XXXXXXXX",
    },
    date: "2025-05-20",
    total: 249.98,
    subtotal: 217.37,
    tax: 32.61,
    status: "completed",
    paymentMethod: "بطاقة ائتمان (فيزا ****4242)",
    items: [
      {
        id: "win10-pro",
        name: "ويندوز 10 برو",
        image: "/windows-10-pro-key-card.png",
        price: 99.99,
        quantity: 1,
        key: "KEY-67890",
      },
      {
        id: "office-2021",
        name: "أوفيس 2021 بروفيشنال بلس",
        image: "/office-2021-software-box.png",
        price: 149.99,
        quantity: 1,
        key: "KEY-67891",
      },
    ],
    notes: "",
  },
  "ORD-12344": {
    id: "ORD-12344",
    customer: {
      name: "أحمد علي",
      email: "ahmed@example.com",
      phone: "+966 5XXXXXXXX",
    },
    date: "2025-05-19",
    total: 99.99,
    subtotal: 86.95,
    tax: 13.04,
    status: "completed",
    paymentMethod: "مدى",
    items: [
      {
        id: "win11-pro",
        name: "ويندوز 11 برو",
        image: "/windows-11-pro-desktop.png",
        price: 99.99,
        quantity: 1,
        key: "KEY-67892",
      },
    ],
    notes: "",
  },
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = orders[params.id as keyof typeof orders]

  if (!order) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">الطلب غير موجود</h2>
        <p className="mb-4 text-muted-foreground">لم يتم العثور على الطلب المطلوب</p>
        <Button asChild>
          <Link href="/dashboard/orders">العودة إلى الطلبات</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">تفاصيل الطلب #{order.id}</h2>
          <p className="text-muted-foreground">تاريخ الطلب: {new Date(order.date).toLocaleDateString("ar-SA")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/orders">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة
            </Link>
          </Button>
          <Button variant="outline">
            <Printer className="ml-2 h-4 w-4" />
            طباعة
          </Button>
          <Button>
            <FileText className="ml-2 h-4 w-4" />
            الفاتورة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>تفاصيل الطلب</CardTitle>
            <div className="flex items-center">
              <Badge
                variant="outline"
                className={
                  order.status === "completed"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : order.status === "processing"
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                }
              >
                {order.status === "completed" ? "مكتمل" : order.status === "processing" ? "قيد المعالجة" : "ملغي"}
              </Badge>
              <div className="mr-4">
                <Select defaultValue={order.status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="تغيير الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">قيد المعالجة</SelectItem>
                    <SelectItem value="completed">مكتمل</SelectItem>
                    <SelectItem value="cancelled">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">الصورة</TableHead>
                    <TableHead>المنتج</TableHead>
                    <TableHead>السعر</TableHead>
                    <TableHead>الكمية</TableHead>
                    <TableHead>المجموع</TableHead>
                    <TableHead>مفتاح التنشيط</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="h-12 w-12 overflow-hidden rounded-md">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.price.toFixed(2)} ر.س</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{(item.price * item.quantity).toFixed(2)} ر.س</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-sm">XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</span>
                          <Button variant="ghost" size="icon" className="ml-2 h-6 w-6">
                            <Copy className="h-3 w-3" />
                            <span className="sr-only">نسخ</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">المجموع الفرعي:</span>
                <span>{order.subtotal.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">ضريبة القيمة المضافة (15%):</span>
                <span>{order.tax.toFixed(2)} ر.س</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>الإجمالي:</span>
                <span className="text-purple-600">{order.total.toFixed(2)} ر.س</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>معلومات العميل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{order.customer.name}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="ml-1 h-4 w-4" />
                    {order.customer.email}
                  </div>
                  <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Mail className="ml-2 h-4 w-4" />
                    إرسال بريد إلكتروني
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>معلومات الدفع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">طريقة الدفع:</span>
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">حالة الدفع:</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                    مدفوع
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ملاحظات</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full rounded-md border p-2 text-sm"
                rows={4}
                placeholder="إضافة ملاحظات للطلب..."
                defaultValue={order.notes}
              ></textarea>
              <div className="mt-2 flex justify-end">
                <Button variant="outline" size="sm">
                  حفظ الملاحظات
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
