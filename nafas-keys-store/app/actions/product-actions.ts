"use server"

import { revalidatePath } from "next/cache"
import { addProduct, updateProduct, deleteProduct } from "@/lib/db"
import { generateProductId, slugify } from "@/lib/utils-id"
import type { Product } from "@/lib/models"

// إضافة منتج جديد
export async function createProduct(formData: FormData) {
  try {
    // استخراج البيانات من النموذج
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const originalPrice = formData.get("originalPrice")
      ? Number.parseFloat(formData.get("originalPrice") as string)
      : undefined
    const category = formData.get("category") as string
    const inStock = Number.parseInt(formData.get("inStock") as string)
    const sku = formData.get("sku") as string
    const status = formData.get("status") as "active" | "draft" | "inactive"
    const badge = formData.get("badge") as string
    const image = formData.get("image") as string

    // التحقق من البيانات المطلوبة
    if (!name || !price || !category) {
      return {
        success: false,
        message: "يرجى ملء جميع الحقول المطلوبة",
      }
    }

    // إنشاء معرف فريد ورابط مخصص
    const id = generateProductId()
    const slug = slugify(name)

    // تحويل النص إلى مصفوفة للميزات
    const featuresText = formData.get("features") as string
    const features = featuresText.split("\n").filter((line) => line.trim() !== "")

    // إنشاء كائن المنتج
    const product: Product = {
      id,
      name,
      slug,
      description,
      features,
      image: image || "/placeholder.svg",
      price,
      originalPrice,
      badge: badge || undefined,
      inStock,
      sku: sku || `SKU-${id}`,
      category,
      status: status || "draft",
    }

    // إضافة المنتج إلى قاعدة البيانات
    const result = await addProduct(product)

    // إعادة التحقق من الصفحات ذات الصلة
    revalidatePath("/dashboard/products")
    revalidatePath("/products")
    revalidatePath(`/categories/${category}`)

    return {
      success: true,
      message: "تم إضافة المنتج بنجاح",
      productId: id,
    }
  } catch (error) {
    console.error("Error creating product:", error)
    return {
      success: false,
      message: "حدث خطأ أثناء إضافة المنتج",
    }
  }
}

// تحديث منتج موجود
export async function updateProductAction(id: string, formData: FormData) {
  try {
    // استخراج البيانات من النموذج
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const originalPrice = formData.get("originalPrice")
      ? Number.parseFloat(formData.get("originalPrice") as string)
      : undefined
    const category = formData.get("category") as string
    const inStock = Number.parseInt(formData.get("inStock") as string)
    const sku = formData.get("sku") as string
    const status = formData.get("status") as "active" | "draft" | "inactive"
    const badge = formData.get("badge") as string
    const image = formData.get("image") as string

    // التحقق من البيانات المطلوبة
    if (!name || !price || !category) {
      return {
        success: false,
        message: "يرجى ملء جميع الحقول المطلوبة",
      }
    }

    // تحويل النص إلى مصفوفة للميزات
    const featuresText = formData.get("features") as string
    const features = featuresText.split("\n").filter((line) => line.trim() !== "")

    // إنشاء كائن المنتج للتحديث
    const productUpdate: Partial<Product> = {
      name,
      description,
      features,
      image: image || "/placeholder.svg",
      price,
      originalPrice,
      badge: badge || undefined,
      inStock,
      sku,
      category,
      status,
    }

    // تحديث المنتج في قاعدة البيانات
    const result = await updateProduct(id, productUpdate)

    // إعادة التحقق من الصفحات ذات الصلة
    revalidatePath("/dashboard/products")
    revalidatePath(`/dashboard/products/${id}`)
    revalidatePath("/products")
    revalidatePath(`/products/${id}`)
    revalidatePath(`/categories/${category}`)

    return {
      success: true,
      message: "تم تحديث المنتج بنجاح",
    }
  } catch (error) {
    console.error("Error updating product:", error)
    return {
      success: false,
      message: "حدث خطأ أثناء تحديث المنتج",
    }
  }
}

// حذف منتج
export async function deleteProductAction(id: string) {
  try {
    // حذف المنتج من قاعدة البيانات
    const result = await deleteProduct(id)

    // إعادة التحقق من الصفحات ذات الصلة
    revalidatePath("/dashboard/products")
    revalidatePath("/products")

    return {
      success: true,
      message: "تم حذف المنتج بنجاح",
    }
  } catch (error) {
    console.error("Error deleting product:", error)
    return {
      success: false,
      message: "حدث خطأ أثناء حذف المنتج",
    }
  }
}
