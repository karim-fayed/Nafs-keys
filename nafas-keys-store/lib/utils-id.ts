// Función simple para generar un ID aleatorio
export function generateId(prefix: string, length = 8): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = prefix + "_"

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

// Generar un ID de producto
export function generateProductId(): string {
  return generateId("prod", 8)
}

// Generar un ID de usuario
export function generateUserId(isAdmin = false): string {
  const prefix = isAdmin ? "ADM" : "USR"
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`
}

// Generar un ID de pedido
export function generateOrderId(): string {
  return `ORD-${Math.floor(10000 + Math.random() * 90000)}`
}

// Generar un ID de clave
export function generateKeyId(): string {
  return `KEY-${Math.floor(10000 + Math.random() * 90000)}`
}

// Generar un ID de categoría
export function generateCategoryId(): string {
  return generateId("cat", 8)
}

// Convertir texto a slug
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Reemplazar espacios con guiones
    .replace(/[^\w-]+/g, "") // Eliminar caracteres no alfanuméricos
    .replace(/--+/g, "-") // Reemplazar múltiples guiones con uno solo
    .replace(/^-+/, "") // Eliminar guiones del inicio
    .replace(/-+$/, "") // Eliminar guiones del final
}
