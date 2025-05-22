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
import { Search, MoreHorizontal, Eye, Copy, RefreshCw } from "lucide-react"

// هذه البيانات ستأتي من قاعدة البيانات لاحقًا
const keys = [
  {
    id: "KEY-67890",
    product: "ويندوز 10 برو",
    key: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
    orderId: "ORD-12345",
    customer: "محمد أحمد",
    purchaseDate: "2025-05-20",
    status: "used",
  },
  {
    id: "KEY-67891",
    product: "أوفيس 2021 بروفيشنال بلس",
    key: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
    orderId: "ORD-12345",
    customer: "محمد أحمد",
    purchaseDate: "2025-05-20",
    status: "used",
  },
  {
    id: "KEY-67892",
    product: "ويندوز 11 برو",
    key: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
    orderId: "ORD-12344",
    customer: "أحمد علي",
    purchaseDate: "2025-05-19",
    status: "used",
  },
  {
    id: "KEY-67893",
    product: "ويندوز 10 برو",
    key: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
    orderId: null,
    customer: null,
    purchaseDate: null,
    status: "available",
  },
  {
    id: "KEY-67894",
    product: "أوفيس 2019 بروفيشنال بلس",
    key: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
    orderId: null,
    customer: null,
    purchaseDate: null,
    status: "available",
  },
]

export default function KeysPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">مفاتيح التنشيط</h2>
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline">استيراد مفاتيح</Button>
          <Button>إضافة مفاتيح</Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full max-w-sm items-center space-x-2 space-x-reverse">
          <Input type="search" placeholder="البحث عن مفتاح..." className="w-[300px]" />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">بحث</span>
          </Button>
        </div>
        <div className="flex w-full items-center space-x-2 space-x-reverse md:w-auto">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="جميع المنتجات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المنتجات</SelectItem>
              <SelectItem value="windows-10-pro">ويندوز 10 برو</SelectItem>
              <SelectItem value="windows-11-pro">ويندوز 11 برو</SelectItem>
              <SelectItem value="office-2021">أوفيس 2021 بروفيشنال بلس</SelectItem>
              <SelectItem value="office-2019">أوفيس 2019 بروفيشنال بلس</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="جميع الحالات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="available">متاح</SelectItem>
              <SelectItem value="used">مستخدم</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رقم المفتاح</TableHead>
              <TableHead>المنتج</TableHead>
              <TableHead>مفتاح التنشيط</TableHead>
              <TableHead>رقم الطلب</TableHead>
              <TableHead>العميل</TableHead>
              <TableHead>تاريخ الشراء</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.map((key) => (
              <TableRow key={key.id}>
                <TableCell className="font-medium">{key.id}</TableCell>
                <TableCell>{key.product}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span>{key.key}</span>
                    <Button variant="ghost" size="icon" className="ml-2 h-6 w-6">
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">نسخ</span>
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{key.orderId || "-"}</TableCell>
                <TableCell>{key.customer || "-"}</TableCell>
                <TableCell>{key.purchaseDate ? new Date(key.purchaseDate).toLocaleDateString("ar-SA") : "-"}</TableCell>
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
                        <Copy className="ml-2 h-4 w-4" />
                        <span>نسخ المفتاح</span>
                      </DropdownMenuItem>
                      {key.status === "used" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <RefreshCw className="ml-2 h-4 w-4" />
                            <span>إعادة تعيين الحالة</span>
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
