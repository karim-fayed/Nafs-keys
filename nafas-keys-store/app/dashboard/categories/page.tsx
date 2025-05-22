import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash } from "lucide-react"

// هذه البيانات ستأتي من قاعدة البيانات لاحقًا
const categories = [
  {
    id: "windows",
    name: "أنظمة التشغيل",
    slug: "windows",
    description: "أنظمة تشغيل مايكروسوفت ويندوز",
    productsCount: 3,
  },
  {
    id: "office",
    name: "برامج المكتب",
    slug: "office",
    description: "برامج مايكروسوفت أوفيس وبرامج المكتب الأخرى",
    productsCount: 3,
  },
  {
    id: "games",
    name: "ألعاب",
    slug: "games",
    description: "مفاتيح تنشيط الألعاب الإلكترونية",
    productsCount: 0,
  },
  {
    id: "development",
    name: "برامج التطوير",
    slug: "development",
    description: "برامج وأدوات التطوير والبرمجة",
    productsCount: 0,
  },
  {
    id: "security",
    name: "برامج الحماية",
    slug: "security",
    description: "برامج مكافحة الفيروسات والحماية",
    productsCount: 0,
  },
]

export default function CategoriesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">الفئات</h2>
        <Button asChild>
          <Link href="/dashboard/categories/new">
            <Plus className="ml-2 h-4 w-4" /> إضافة فئة
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2 space-x-reverse">
          <Input type="search" placeholder="البحث عن فئة..." className="w-[300px]" />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">بحث</span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم الفئة</TableHead>
              <TableHead>الرابط المخصص</TableHead>
              <TableHead>الوصف</TableHead>
              <TableHead>عدد المنتجات</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.productsCount}</TableCell>
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
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="ml-2 h-4 w-4" />
                        <span>حذف</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
