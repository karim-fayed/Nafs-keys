"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NewProductForm() {
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // First try to seed the database if needed
        await fetch("/api/seed")

        // Then fetch categories
        const response = await fetch("/api/categories")
        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([])
      } finally {
        setIsLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    const formData = new FormData(e.target)

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          description: formData.get("description"),
          price: Number.parseFloat(formData.get("price")),
          originalPrice: formData.get("originalPrice") ? Number.parseFloat(formData.get("originalPrice")) : undefined,
          category: formData.get("category"),
          inStock: Number.parseInt(formData.get("inStock")),
          sku: formData.get("sku"),
          status: formData.get("status"),
          badge: formData.get("badge"),
          features:
            formData
              .get("features")
              ?.split("\n")
              .filter((line) => line.trim() !== "") || [],
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "حدث خطأ أثناء إضافة المنتج")
      }

      setSuccess("تم إضافة المنتج بنجاح")
      setTimeout(() => {
        router.push("/dashboard/products")
      }, 2000)
    } catch (error) {
      setError(error.message || "حدث خطأ أثناء إضافة المنتج")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">إضافة منتج جديد</h2>
          <p className="text-muted-foreground">أضف منتجًا جديدًا إلى المتجر مع جميع التفاصيل والمعلومات.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/products">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة
            </Link>
          </Button>
        </div>
      </div>

      <Separator />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="basic">المعلومات الأساسية</TabsTrigger>
            <TabsTrigger value="media">الصور والوسائط</TabsTrigger>
            <TabsTrigger value="pricing">التسعير والمخزون</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 py-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">اسم المنتج</Label>
                <Input id="name" name="name" placeholder="أدخل اسم المنتج" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">الفئة</Label>
                <Select name="category">
                  <SelectTrigger>
                    <SelectValue placeholder={isLoadingCategories ? "جاري تحميل الفئات..." : "اختر الفئة"} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">الحالة</Label>
                <Select name="status" defaultValue="draft">
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
                <Textarea
                  id="description"
                  name="description"
                  placeholder="أدخل وصفًا تفصيليًا للمنتج"
                  className="min-h-[150px]"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="features">مميزات المنتج</Label>
                <Textarea
                  id="features"
                  name="features"
                  placeholder="أدخل مميزات المنتج (كل ميزة في سطر منفصل)"
                  className="min-h-[100px]"
                />
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
                      <div className="flex flex-col items-center justify-center text-center">
                        <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                        <p className="mb-2 text-sm font-medium">اسحب وأفلت الصورة هنا</p>
                        <p className="text-xs text-muted-foreground">PNG، JPG، GIF حتى 5MB</p>
                      </div>
                    </div>
                    <Input id="image" name="image" type="file" className="hidden" />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById("image")?.click()}>
                      اختر ملفًا
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4 py-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">السعر (ر.س)</Label>
                <Input id="price" name="price" type="number" step="0.01" placeholder="0.00" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">السعر الأصلي (ر.س)</Label>
                <Input id="originalPrice" name="originalPrice" type="number" step="0.01" placeholder="0.00" />
                <p className="text-xs text-muted-foreground">اتركه فارغًا إذا لم يكن هناك خصم.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inStock">المخزون</Label>
                <Input id="inStock" name="inStock" type="number" placeholder="0" defaultValue="0" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">رمز المنتج (SKU)</Label>
                <Input id="sku" name="sku" placeholder="مثال: WIN10-PRO-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="badge">شارة المنتج</Label>
                <Input id="badge" name="badge" placeholder="مثال: الأكثر مبيعاً" />
                <p className="text-xs text-muted-foreground">
                  ستظهر هذه الشارة على صورة المنتج. اتركها فارغة إذا لم تكن هناك شارة.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 space-x-reverse">
          <Button variant="outline" type="button">
            حفظ كمسودة
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "جاري الحفظ..." : "نشر المنتج"}
          </Button>
        </div>
      </form>
    </div>
  )
}
