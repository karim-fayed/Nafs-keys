import clientPromise from "./mongodb"
import type { Product, Key, User, Order, Category, Cart } from "./models"
import { Document, ObjectId } from "mongodb"

// اسم قاعدة البيانات
const DB_NAME = "nafas_keys_store"

// Helper function to prepare document for MongoDB
function prepareForDb<T>(doc: T): Document {
  // MongoDB will handle the _id creation
  const { _id, ...docWithoutId } = doc as any;
  return docWithoutId as Document;
}

// Helper function to prepare array of documents for MongoDB
function prepareArrayForDb<T>(docs: T[]): Document[] {
  return docs.map(doc => prepareForDb(doc));
}

// الحصول على قاعدة البيانات
export async function getDatabase() {
  const client = await clientPromise
  return client.db(DB_NAME)
}

// ==================== وظائف المنتجات ====================

// الحصول على جميع المنتجات
export async function getAllProducts() {
  const db = await getDatabase()
  return db.collection("products").find({}).toArray()
}

// الحصول على منتج بواسطة المعرف
export async function getProductById(id: string) {
  const db = await getDatabase()
  return db.collection("products").findOne({ id })
}

// الحصول على منتج بواسطة الرابط المخصص
export async function getProductBySlug(slug: string) {
  const db = await getDatabase()
  return db.collection("products").findOne({ slug })
}

// الحصول على المنتجات حسب الفئة
export async function getProductsByCategory(category: string) {
  const db = await getDatabase()
  return db.collection("products").find({ category }).toArray()
}

// إضافة منتج جديد
export async function addProduct(product: Product) {
  const db = await getDatabase()
  product.createdAt = new Date()
  product.updatedAt = new Date()
  const result = await db.collection("products").insertOne(prepareForDb(product))
  return result
}

// تحديث منتج
export async function updateProduct(id: string, product: Partial<Product>) {
  const db = await getDatabase()
  product.updatedAt = new Date()
  const result = await db.collection("products").updateOne({ id }, { $set: product })
  return result
}

// حذف منتج
export async function deleteProduct(id: string) {
  const db = await getDatabase()
  const result = await db.collection("products").deleteOne({ id })
  return result
}

// ==================== وظائف المفاتيح ====================

// الحصول على جميع المفاتيح
export async function getAllKeys() {
  const db = await getDatabase()
  return db.collection("keys").find({}).toArray()
}

// الحصول على مفتاح بواسطة المعرف
export async function getKeyById(id: string) {
  const db = await getDatabase()
  return db.collection("keys").findOne({ id })
}

// الحصول على المفاتيح حسب المنتج
export async function getKeysByProduct(productId: string) {
  const db = await getDatabase()
  return db.collection("keys").find({ productId }).toArray()
}

// الحصول على المفاتيح المتاحة حسب المنتج
export async function getAvailableKeysByProduct(productId: string) {
  const db = await getDatabase()
  return db
    .collection("keys")
    .find({
      productId,
      status: "available",
    })
    .toArray()
}

// إضافة مفتاح جديد
export async function addKey(key: Key) {
  const db = await getDatabase()
  key.createdAt = new Date()
  const result = await db.collection("keys").insertOne(prepareForDb(key))
  return result
}

// إضافة مفاتيح متعددة
export async function addManyKeys(keys: Key[]) {
  const db = await getDatabase()
  const now = new Date()
  keys.forEach((key) => {
    key.createdAt = now
  })
  const result = await db.collection("keys").insertMany(prepareArrayForDb(keys))
  return result
}

// تحديث مفتاح
export async function updateKey(id: string, key: Partial<Key>) {
  const db = await getDatabase()
  const result = await db.collection("keys").updateOne({ id }, { $set: key })
  return result
}

// حذف مفتاح
export async function deleteKey(id: string) {
  const db = await getDatabase()
  const result = await db.collection("keys").deleteOne({ id })
  return result
}

// ==================== وظائف المستخدمين ====================

// الحصول على جميع المستخدمين
export async function getAllUsers() {
  const db = await getDatabase()
  return db.collection("users").find({}).toArray()
}

// الحصول على مستخدم بواسطة المعرف
export async function getUserById(id: string) {
  const db = await getDatabase()
  return db.collection("users").findOne({ id })
}

// الحصول على مستخدم بواسطة البريد الإلكتروني
export async function getUserByEmail(email: string) {
  const db = await getDatabase()
  return db.collection("users").findOne({ email })
}

// إضافة مستخدم جديد
export async function addUser(user: User) {
  const db = await getDatabase()
  user.createdAt = new Date()
  user.updatedAt = new Date()
  const result = await db.collection("users").insertOne(prepareForDb(user))
  return result
}

// تحديث مستخدم
export async function updateUser(id: string, user: Partial<User>) {
  const db = await getDatabase()
  user.updatedAt = new Date()
  const result = await db.collection("users").updateOne({ id }, { $set: user })
  return result
}

// حذف مستخدم
export async function deleteUser(id: string) {
  const db = await getDatabase()
  const result = await db.collection("users").deleteOne({ id })
  return result
}

// ==================== وظائف الطلبات ====================

// الحصول على جميع الطلبات
export async function getAllOrders() {
  const db = await getDatabase()
  return db.collection("orders").find({}).sort({ date: -1 }).toArray()
}

// الحصول على طلب بواسطة المعرف
export async function getOrderById(id: string) {
  const db = await getDatabase()
  return db.collection("orders").findOne({ id })
}

// الحصول على طلبات المستخدم
export async function getOrdersByUser(customerId: string) {
  const db = await getDatabase()
  return db.collection("orders").find({ customerId }).sort({ date: -1 }).toArray()
}

// إضافة طلب جديد
export async function addOrder(order: Order) {
  const db = await getDatabase()
  order.createdAt = new Date()
  order.updatedAt = new Date()
  const result = await db.collection("orders").insertOne(prepareForDb(order))
  return result
}

// تحديث طلب
export async function updateOrder(id: string, order: Partial<Order>) {
  const db = await getDatabase()
  order.updatedAt = new Date()
  const result = await db.collection("orders").updateOne({ id }, { $set: order })
  return result
}

// ==================== وظائف الفئات ====================

// الحصول على جميع الفئات
export async function getAllCategories() {
  const db = await getDatabase()
  return db.collection("categories").find({}).sort({ order: 1 }).toArray()
}

// الحصول على فئة بواسطة المعرف
export async function getCategoryById(id: string) {
  const db = await getDatabase()
  return db.collection("categories").findOne({ id })
}

// الحصول على فئة بواسطة الرابط المخصص
export async function getCategoryBySlug(slug: string) {
  const db = await getDatabase()
  return db.collection("categories").findOne({ slug })
}

// إضافة فئة جديدة
export async function addCategory(category: Category) {
  const db = await getDatabase()
  category.createdAt = new Date()
  category.updatedAt = new Date()
  const result = await db.collection("categories").insertOne(prepareForDb(category))
  return result
}

// تحديث فئة
export async function updateCategory(id: string, category: Partial<Category>) {
  const db = await getDatabase()
  category.updatedAt = new Date()
  const result = await db.collection("categories").updateOne({ id }, { $set: category })
  return result
}

// حذف فئة
export async function deleteCategory(id: string) {
  const db = await getDatabase()
  const result = await db.collection("categories").deleteOne({ id })
  return result
}
