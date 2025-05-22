'use client'

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params?.id as string
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "windows",
    image: "",
    status: "active",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [imageUploading, setImageUploading] = useState(false)
  const [imageError, setImageError] = useState("")
  const [imageSuccess, setImageSuccess] = useState("")

  useEffect(() => {
    if (!productId) return
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          price: data.price?.toString() || "",
          stock: data.inStock?.toString() || "",
          category: data.category || "windows",
          image: data.image || "",
          status: data.status || "active",
        })
        setImagePreview(data.image || "")
        setLoading(false)
      })
      .catch(() => {
        setError("فشل تحميل بيانات المنتج")
        setLoading(false)
      })
  }, [productId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSelect = (name: string, value: string) => {
    setForm({ ...form, [name]: value })
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setImageError("")
    setImageSuccess("")
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
      setImageUploading(true)
      // رفع الصورة إلى API
      const formData = new FormData()
      formData.append("file", file)
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        if (res.ok && data.url) {
          setForm((prev) => ({ ...prev, image: data.url }))
          setImageSuccess("تم رفع الصورة بنجاح")
        } else {
          setImageError(data.error || "فشل رفع الصورة")
        }
      } catch (err) {
        setImageError("فشل رفع الصورة")
      } finally {
        setImageUploading(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: parseFloat(form.price),
          stock: parseInt(form.stock),
          category: form.category,
          image: form.image,
          status: form.status,
        }),
      })
      if (!res.ok) throw new Error("فشل تحديث المنتج")
      router.push("/dashboard/products")
    } catch (err) {
      setError("فشل تحديث المنتج")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center py-10">جاري تحميل بيانات المنتج...</div>

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-6">تعديل المنتج</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">اسم المنتج</Label>
          <Input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="price">السعر (ر.س)</Label>
          <Input id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="stock">الكمية المتاحة</Label>
          <Input id="stock" name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="category">الفئة</Label>
          <Select value={form.category} onValueChange={(v) => handleSelect("category", v)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="windows">أنظمة التشغيل</SelectItem>
              <SelectItem value="office">برامج المكتب</SelectItem>
              <SelectItem value="other">أخرى</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="image">صورة المنتج</Label>
          <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} disabled={imageUploading} />
          {imagePreview && (
            <img src={imagePreview} alt="معاينة الصورة" className="mt-2 rounded w-32 h-32 object-cover border" />
          )}
          {imageUploading && <div className="text-blue-600 mt-2">جاري رفع الصورة...</div>}
          {imageError && <div className="text-red-600 mt-2">{imageError}</div>}
          {imageSuccess && <div className="text-green-600 mt-2">{imageSuccess}</div>}
        </div>
        <div>
          <Label htmlFor="status">الحالة</Label>
          <Select value={form.status} onValueChange={(v) => handleSelect("status", v)}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={saving || imageUploading}>
          {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
        </Button>
      </form>
    </div>
  )
} 