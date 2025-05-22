import { getMongoDb } from "./mongodb-server"
import { ObjectId } from "mongodb"

// Definición de tipos
export interface Product {
  id: string
  name: string
  description: string
  features: string[]
  image: string
  additionalImages?: string[]
  price: number
  originalPrice?: number
  badge?: string
  inStock: number
  category: string
  sku?: string
  status?: string
}

// Función para obtener un producto por su slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const db = await getMongoDb()
    const collection = db.collection("products")

    // Intentar buscar por slug
    let product = await collection.findOne({ slug })

    // Si no se encuentra, intentar buscar por id
    if (!product) {
      // Verificar si el slug es un ObjectId válido
      if (ObjectId.isValid(slug)) {
        product = await collection.findOne({ _id: new ObjectId(slug) })
      }

      // Si aún no se encuentra, buscar por id como string
      if (!product) {
        product = await collection.findOne({ id: slug })
      }
    }

    if (!product) {
      // Datos de ejemplo para desarrollo
      const mockProducts: Record<string, Product> = {
        "win10-pro": {
          id: "win10-pro",
          name: "ويندوز 10 برو",
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
          inStock: 50,
          category: "windows",
          sku: "WIN10-PRO-001",
        },
        "office-2021": {
          id: "office-2021",
          name: "أوفيس 2021 بروفيشنال بلس",
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
          inStock: 25,
          category: "office",
          sku: "OFF21-PRO-001",
        },
      }

      return mockProducts[slug] || null
    }

    // Convertir el documento de MongoDB a nuestro tipo Product
    return {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      features: product.features || [],
      image: product.image || "/placeholder.svg",
      additionalImages: product.additionalImages || [],
      price: product.price,
      originalPrice: product.originalPrice,
      badge: product.badge,
      inStock: product.inStock || 0,
      category: product.category,
      sku: product.sku || product._id.toString(),
      status: product.status,
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error)
    return null
  }
}

// Función para obtener todos los productos
export async function getAllProducts(): Promise<Product[]> {
  try {
    const db = await getMongoDb()
    const collection = db.collection("products")

    const products = await collection.find({}).toArray()

    if (products.length === 0) {
      // Datos de ejemplo para desarrollo
      return [
        {
          id: "win10-pro",
          name: "ويندوز 10 برو",
          description: "مفتاح تنشيط أصلي لنظام التشغيل ويندوز 10 برو",
          features: ["مفتاح تنشيط أصلي 100%", "تنشيط مدى الحياة"],
          image: "/windows-10-pro-key-card.png",
          price: 99.99,
          originalPrice: 199.99,
          badge: "الأكثر مبيعاً",
          inStock: 50,
          category: "windows",
          sku: "WIN10-PRO-001",
        },
        {
          id: "office-2021",
          name: "أوفيس 2021 بروفيشنال بلس",
          description: "مفتاح تنشيط أصلي لحزمة مايكروسوفت أوفيس 2021",
          features: ["مفتاح تنشيط أصلي 100%", "ترخيص دائم"],
          image: "/office-2021-software-box.png",
          price: 149.99,
          originalPrice: 249.99,
          badge: "توفر كمية محدودة",
          inStock: 25,
          category: "office",
          sku: "OFF21-PRO-001",
        },
      ]
    }

    // Convertir los documentos de MongoDB a nuestro tipo Product
    return products.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      features: product.features || [],
      image: product.image || "/placeholder.svg",
      additionalImages: product.additionalImages || [],
      price: product.price,
      originalPrice: product.originalPrice,
      badge: product.badge,
      inStock: product.inStock || 0,
      category: product.category,
      sku: product.sku || product._id.toString(),
      status: product.status,
    }))
  } catch (error) {
    console.error("Error al obtener los productos:", error)
    return []
  }
}

// Función para obtener productos por categoría
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const db = await getMongoDb()
    const collection = db.collection("products")

    const products = await collection.find({ category }).toArray()

    // Convertir los documentos de MongoDB a nuestro tipo Product
    return products.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      features: product.features || [],
      image: product.image || "/placeholder.svg",
      additionalImages: product.additionalImages || [],
      price: product.price,
      originalPrice: product.originalPrice,
      badge: product.badge,
      inStock: product.inStock || 0,
      category: product.category,
      sku: product.sku || product._id.toString(),
      status: product.status,
    }))
  } catch (error) {
    console.error("Error al obtener los productos por categoría:", error)
    return []
  }
}

// دالة تحديث المنتج بالكامل
export async function updateProduct(id: string, data: Partial<Product>) {
  const db = await getMongoDb()
  const collection = db.collection("products")
  // تحديث جميع الحقول المرسلة
  await collection.updateOne(
    { id },
    { $set: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.features !== undefined && { features: data.features }),
      ...(data.image !== undefined && { image: data.image }),
      ...(data.additionalImages !== undefined && { additionalImages: data.additionalImages }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.originalPrice !== undefined && { originalPrice: data.originalPrice }),
      ...(data.badge !== undefined && { badge: data.badge }),
      ...(data.inStock !== undefined && { inStock: data.inStock }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.sku !== undefined && { sku: data.sku }),
      ...(data.status !== undefined && { status: data.status }),
      updatedAt: new Date(),
    } }
  )
}
