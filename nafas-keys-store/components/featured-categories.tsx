import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ComputerIcon as Windows, FileText, Gamepad2, Code, ShieldCheck, Zap } from "lucide-react"

export function FeaturedCategories() {
  const categories = [
    {
      name: "أنظمة التشغيل",
      icon: <Windows className="h-10 w-10" />,
      href: "/categories/windows",
      color: "bg-blue-50 text-blue-600",
    },
    {
      name: "برامج المكتب",
      icon: <FileText className="h-10 w-10" />,
      href: "/categories/office",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      name: "ألعاب",
      icon: <Gamepad2 className="h-10 w-10" />,
      href: "/categories/games",
      color: "bg-green-50 text-green-600",
    },
    {
      name: "برامج التطوير",
      icon: <Code className="h-10 w-10" />,
      href: "/categories/development",
      color: "bg-purple-50 text-purple-600",
    },
    {
      name: "برامج الحماية",
      icon: <ShieldCheck className="h-10 w-10" />,
      href: "/categories/security",
      color: "bg-red-50 text-red-600",
    },
    {
      name: "برامج الأداء",
      icon: <Zap className="h-10 w-10" />,
      href: "/categories/performance",
      color: "bg-amber-50 text-amber-600",
    },
  ]

  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="section-title text-center">تصفح حسب الفئة</h2>
        <p className="section-description">اختر من بين مجموعة واسعة من المنتجات المصنفة بعناية لتلبية احتياجاتك</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="card-hover border-0 bg-white shadow-soft">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className={`mb-4 rounded-full p-3 ${category.color}`}>{category.icon}</div>
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
