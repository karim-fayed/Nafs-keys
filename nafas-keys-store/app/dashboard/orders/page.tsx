import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Eye, FileText, XCircle } from "lucide-react"

// هذه البيانات ستأتي من قاعدة البيانات لاحقًا
const orders = [
  {
    id: "ORD-12345",
    customer: "محمد أحمد",
    email: "mohammed@example.com",
    date: "2025-05-20",
    total: 249.98,
    status: "completed",
    items: 2,
  },
  {
    id: "ORD-12344",
    customer: "أحمد علي",
    email: "ahmed@example.com",
    date: "2025-05-19",
    total: 99.99,
    status: "completed",
    items: 1,
  },
  {
    id: "ORD-12343",
    customer: "سارة محمد",
    email: "sara@example.com",
    date: "2025-05-18",
    total: 149.99,
    status: "processing",
    items: 1,
  },
  {
    id: "ORD-12342",
    customer: "خالد عبدالله",
    email: "khalid@example.com",
    date: "2025-05-17",
    total: 219.98,
    status: "completed",
    items: 2,
  },
  {
    id: "ORD-12341",
    customer: "فاطمة علي",
    email: "fatima@example.com",
    date: "2025-05-16",
    total: 99.99,
    status: "cancelled",
    items: 1,
  },
]

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">الطلبات</h2>
        <Button variant="outline">تصدير الطلبات</Button>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full max-w-sm items-center space-x-2 space-x-reverse">
          <Input type="search" placeholder="البحث عن طلب..." className="w-[300px]" />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">بحث</span>
          </Button>
        </div>
        <div className="flex w-full items-center space-x-2 space-x-reverse md:w-auto">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="جميع الحالات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="completed">مكتمل</SelectItem>
              <SelectItem value="processing">قيد المعالجة</SelectItem>
              <SelectItem value="cancelled">ملغي</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="التاريخ: الأحدث أولاً" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">التاريخ: الأحدث أولاً</SelectItem>
              <SelectItem value="oldest">التاريخ: الأقدم أولاً</SelectItem>
              <SelectItem value="highest">السعر: الأعلى أولاً</SelectItem>
              <SelectItem value="lowest">السعر: الأقل أولاً</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رقم الطلب</TableHead>
              <TableHead>العميل</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>المجموع</TableHead>
              <TableHead>العناصر</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{order.customer}</span>
                    <span className="text-sm text-muted-foreground">{order.email}</span>
                  </div>
                </TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString("ar-SA")}</TableCell>
                <TableCell>{order.total.toFixed(2)} ر.س</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">فتح القائمة</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="ml-2 h-4 w-4" />
                        <span>عرض التفاصيل</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="ml-2 h-4 w-4" />
                        <span>تصدير الفاتورة</span>
                      </DropdownMenuItem>
                      {order.status !== "cancelled" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="ml-2 h-4 w-4" />
                            <span>إلغاء الطلب</span>
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 space-x-reverse py-4">
        <Button variant="outline" size="sm">
          السابق
        </Button>
        <Button variant="outline" size="sm">
          التالي
        </Button>
      </div>
    </div>
  )
}
