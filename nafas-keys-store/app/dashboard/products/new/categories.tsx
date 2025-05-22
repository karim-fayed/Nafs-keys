import { getMongoDb } from "@/lib/mongodb-config"

export async function getCategories() {
  try {
    const db = await getMongoDb()
    return db.collection("categories").find({}).toArray()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export default async function CategoriesProvider() {
  const categories = await getCategories()

  // This component doesn't render anything, it just provides data
  // through a hidden script tag that the client component can read
  return (
    <script
      type="application/json"
      id="categories-data"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(categories),
      }}
    />
  )
}
