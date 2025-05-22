import type { ReactNode } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import Sidebar from "@/components/dashboard/sidebar"

export const metadata: Metadata = {
  title: "لوحة التحكم - مفاتيح نَفَس",
  description: "لوحة تحكم متجر مفاتيح نَفَس",
}

const navItems = [
  {
    title: "الرئيسية",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    title: "المنتجات",
    href: "/dashboard/products",
    icon: "package",
  },
  {
    title: "الطلبات",
    href: "/dashboard/orders",
    icon: "shopping-cart",
  },
  {
    title: "المفاتيح",
    href: "/dashboard/keys",
    icon: "key",
  },
  {
    title: "الفئات",
    href: "/dashboard/categories",
    icon: "folder",
  },
  {
    title: "المستخدمين",
    href: "/dashboard/users",
    icon: "users",
  },
  {
    title: "الإعدادات",
    href: "/dashboard/settings",
    icon: "settings",
  },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
