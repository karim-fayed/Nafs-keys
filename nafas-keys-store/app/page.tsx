import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero-redesigned"
import { BestSellingProducts } from "@/components/bestselling-products"
import { CategoriesShowcase } from "@/components/categories-showcase"
import { Features } from "@/components/features"
import { Faq } from "@/components/faq"
import { Cta } from "@/components/cta"
import { Footer } from "@/components/footer-redesigned"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <Hero />
      <BestSellingProducts />
      <CategoriesShowcase />
      <div className="py-8">
        <Features />
        <Faq />
        <Cta />
      </div>
      <Footer />
    </main>
  )
}
