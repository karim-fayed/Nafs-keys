"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

type Category = {
  name: string
  icon: string
  slug: string
  iconBg: string
  description: string
}

export function CategoriesShowcase() {  const categories: Category[] = [
    {
      name: "مفاتيح التصميم",
      icon: "/placeholder.svg?height=60&width=60&query=Adobe", 
      slug: "design",
      iconBg: "from-rose-500 to-purple-500",
      description: "Adobe Creative Cloud وغيرها"
    },
    {
      name: "برامج حماية",
      icon: "/placeholder.svg?height=60&width=60&query=Security", 
      slug: "security",
      iconBg: "from-emerald-500 to-green-600",
      description: "حماية فيروسات ومضاد للاختراق"
    },
    {
      name: "أوفيس",
      icon: "/placeholder.svg?height=60&width=60&query=Office", 
      slug: "office",
      iconBg: "from-blue-400 to-violet-500",
      description: "تطبيقات مايكروسوفت أوفيس"
    },
    {
      name: "ويندوز",
      icon: "/placeholder.svg?height=60&width=60&query=Windows", 
      slug: "windows",
      iconBg: "from-blue-500 to-sky-500",
      description: "مفاتيح تنشيط ويندوز الرسمية"
    },
    {
      name: "مفاتيح أخرى",
      icon: "/placeholder.svg?height=60&width=60&query=More", 
      slug: "others",
      iconBg: "from-amber-500 to-yellow-500",
      description: "منتجات متنوعة أخرى"
    }
  ]

  return (
    <div className="py-12 bg-gradient-to-br from-gray-900 to-blue-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((category) => (
            <Link 
              key={category.slug} 
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="bg-gradient-to-tr from-blue-900/70 to-blue-950/90 backdrop-blur-sm border border-blue-900/30 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 overflow-hidden">
                <div className="relative flex flex-col items-center text-center h-full">
                  <div className={`w-20 h-20 rounded-xl mb-4 bg-gradient-to-br ${category.iconBg} p-5 flex items-center justify-center shadow-lg`}>
                    {category.icon ? (
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={60}
                        height={60}
                        className="w-14 h-14 object-contain"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-blue-900/40 rounded-full"></div>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-lg text-white mb-1">{category.name}</h3>
                  <p className="text-sm text-blue-100/70 mb-3">{category.description}</p>
                  
                  <div className="mt-auto flex items-center text-blue-300 text-sm font-medium opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>عرض المنتجات</span>
                    <ChevronLeft className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
