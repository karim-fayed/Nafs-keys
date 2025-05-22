'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
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
import { Plus, Search, MoreHorizontal, Edit, Trash, Copy } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category?: string
  image?: string
  originalPrice?: number | null
  status?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    setLoading(true)
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || data || [])
        setLoading(false)
      })
      .catch(() => {
        setError("فشل تحميل المنتجات")
        setLoading(false)
      })
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟ لا يمكن التراجع!")) return
    setDeletingId(id)
    setError("")
    setSuccess("")
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("فشل حذف المنتج")
      setSuccess("تم حذف المنتج بنجاح")
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError("فشل حذف المنتج")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">المنتجات</h2>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/dashboard/products/new">
            <Plus className="ml-2 h-5 w-5" /> إضافة منتج
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2 space-x-reverse">
          <Input type="search" placeholder="البحث عن منتج..." className="w-[300px]" />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">بحث</span>
          </Button>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline">تصدير</Button>
          <Button variant="outline">استيراد</Button>
        </div>
      </div>

      {success && <div className="text-green-600 text-center">{success}</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}

      {loading ? (
        <div>جاري التحميل...</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">الصورة</TableHead>
                <TableHead>اسم المنتج</TableHead>
                <TableHead>الفئة</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>المخزون</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category === "windows" ? "أنظمة التشغيل" : "برامج المكتب"}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{product.price.toFixed(2)} ر.س</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice.toFixed(2)} ر.س
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.status === "active" ? "default" : "secondary"}
                      className={
                        product.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {product.status === "active" ? "نشط" : "غير نشط"}
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
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/products/${product.id}/edit`}>
                            <Edit className="ml-2 h-4 w-4" />
                            <span>تعديل</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 cursor-pointer"
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                        >
                          <Trash className="ml-2 h-4 w-4" />
                          {deletingId === product.id ? "جاري الحذف..." : "حذف"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
