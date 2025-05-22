'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Users, ShoppingCart, Settings, LayoutDashboard, Key, Folder } from "lucide-react"

const links = [
  { href: "/dashboard", label: "الرئيسية", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "المنتجات", icon: Package },
  { href: "/dashboard/orders", label: "الطلبات", icon: ShoppingCart },
  { href: "/dashboard/keys", label: "المفاتيح", icon: Key },
  { href: "/dashboard/categories", label: "الفئات", icon: Folder },
  { href: "/dashboard/users", label: "المستخدمين", icon: Users },
  { href: "/dashboard/settings", label: "الإعدادات", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-64 bg-white border-e shadow-sm flex flex-col min-h-screen">
      <div className="h-20 flex items-center justify-center border-b">
        <span className="font-bold text-xl text-purple-700">لوحة التحكم</span>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 ${pathname === href ? "bg-purple-100 text-purple-700" : ""}`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
} 