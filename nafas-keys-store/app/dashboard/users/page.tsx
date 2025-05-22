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
import { Search, MoreHorizontal, Edit, Lock, UserX } from "lucide-react"

// هذه البيانات ستأتي من قاعدة البيانات لاحقًا
const users = [
  {
    id: "USR-001",
    name: "محمد أحمد",
    email: "mohammed@example.com",
    role: "customer",
    status: "active",
    orders: 2,
    registeredDate: "2025-04-15",
  },
  {
    id: "USR-002",
    name: "أحمد علي",
    email: "ahmed@example.com",
    role: "customer",
    status: "active",
    orders: 1,
    registeredDate: "2025-04-20",
  },
  {
    id: "USR-003",
    name: "سارة محمد",
    email: "sara@example.com",
    role: "customer",
    status: "active",
    orders: 1,
    registeredDate: "2025-04-25",
  },
  {
    id: "USR-004",
    name: "خالد عبدالله",
    email: "khalid@example.com",
    role: "customer",
    status: "inactive",
    orders: 0,
    registeredDate: "2025-05-01",
  },
  {
    id: "ADM-001",
    name: "عبدالرحمن محمد",
    email: "admin@nafaskeys.com",
    role: "admin",
    status: "active",
    orders: 0,
    registeredDate: "2025-01-01",
  },
]

export default function UsersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">المستخدمين</h2>
        <Button>إضافة مستخدم</Button>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full max-w-sm items-center space-x-2 space-x-reverse">
          <Input type="search" placeholder="البحث عن مستخدم..." className="w-[300px]" />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">بحث</span>
          </Button>
        </div>
        <div className="flex w-full items-center space-x-2 space-x-reverse md:w-auto">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="جميع الأدوار" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأدوار</SelectItem>
              <SelectItem value="admin">مدير</SelectItem>
              <SelectItem value="customer">عميل</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="جميع الحالات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>المستخدم</TableHead>
              <TableHead>الدور</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>عدد الطلبات</TableHead>
              <TableHead>تاريخ التسجيل</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {user.role === "admin" ? "مدير" : "عميل"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {user.status === "active" ? "نشط" : "غير نشط"}
                  </Badge>
                </TableCell>
                <TableCell>{user.orders}</TableCell>
                <TableCell>{new Date(user.registeredDate).toLocaleDateString("ar-SA")}</TableCell>
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
                        <Edit className="ml-2 h-4 w-4" />
                        <span>تعديل</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Lock className="ml-2 h-4 w-4" />
                        <span>إعادة تعيين كلمة المرور</span>
                      </DropdownMenuItem>
                      {user.role !== "admin" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <UserX className="ml-2 h-4 w-4" />
                            <span>حظر المستخدم</span>
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
