import { MongoClient, ServerApiVersion } from "mongodb"

// Mark this file as server-only
import "server-only"

// Esta función solo debe ser llamada desde el servidor
export async function getMongoClient() {
  if (!process.env.MONGODB_URI) {
    throw new Error("يرجى تعريف متغير البيئة MONGODB_URI في ملف .env.local")
  }

  const uri = process.env.MONGODB_URI
  const options = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }

  const client = new MongoClient(uri, options)
  return client
}

// Esta función solo debe ser llamada desde el servidor
export async function getMongoDb() {
  const client = await getMongoClient()
  return client.db("nafas_keys_store")
}
