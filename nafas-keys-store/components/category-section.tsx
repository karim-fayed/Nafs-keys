import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ComputerIcon as Windows, FileText, Gamepad2, Code, ArrowRight } from "lucide-react"

export function CategorySection() {
  const categories = [
    {
      name: "أنظمة التشغيل",
      description: "ويندوز 10، ويندوز 11، وأكثر",
      icon: <Windows className="h-12 w-12" />,
      href: "/categories/windows",
      color: "from-purple-600 to-indigo-600",
      bgLight: "bg-purple-50",
      iconBg: "bg-purple-100",
    },
    {
      name: "برامج المكتب",
      description: "أوفيس 2019، أوفيس 2021، وأكثر",
      icon: <FileText className="h-12 w-12" />,
      href: "/categories/office",
      color: "from-blue-600 to-cyan-600",
      bgLight: "bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      name: "ألعاب",
      description: "أحدث الألعاب ومفاتيح التنشيط",
      icon: <Gamepad2 className="h-12 w-12" />,
      href: "/categories/games",
      color: "from-green-600 to-emerald-600",
      bgLight: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      name: "برامج التطوير",
      description: "أدوات التطوير واللغات البرمجية",
      icon: <Code className="h-12 w-12" />,
      href: "/categories/development",
      color: "from-orange-600 to-amber-600",
      bgLight: "bg-orange-50",
      iconBg: "bg-orange-100",
    },
  ]

  return (
    <section className="relative py-24">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="gradient-text section-title inline-block">تصفح حسب الفئة</h2>
          <p className="section-description mx-auto max-w-2xl">اختر من بين مجموعة متنوعة من المفاتيح المقسمة حسب الفئة</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <div 
              key={category.name} 
              className={`animate-slideUp opacity-0 [animation-delay:${index * 150}ms] [animation-fill-mode:forwards]`}
            >
              <Link href={category.href}>
                <Card className={`group h-full overflow-hidden border-0 ${category.bgLight} shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover`}>
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-center justify-between">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.iconBg} text-gray-800 transition-transform duration-500 group-hover:scale-110`}>
                        {category.icon}
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100">
                        <ArrowRight className={`h-5 w-5 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`} />
                      </div>
                    </div>
                    
                    <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                    
                    {/* Progress indicator */}
                    <div className="mt-8 h-1 w-0 rounded bg-gradient-to-r transition-all duration-500 group-hover:w-full" 
                      style={{ backgroundImage: `linear-gradient(to right, ${category.color.replace('from-', '').replace('to-', '')}` }}></div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
