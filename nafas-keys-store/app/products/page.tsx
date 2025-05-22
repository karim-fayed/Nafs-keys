import { BestSellingProducts } from "@/components/bestselling-products";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-right">كل المنتجات</h1>
        <BestSellingProducts />
      </div>
    </main>
  );
} 