"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, ShoppingCart, Key, Folder, Users, Settings } from "lucide-react"

interface DashboardNavProps {
  items: {
    title: string
    href: string
    icon: string
  }[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const pathname = usePathname()

  const getIcon = (icon: string) => {
    switch (icon) {
      case "dashboard":
        return <LayoutDashboard className="ml-2 h-5 w-5" />
      case "package":
        return <Package className="ml-2 h-5 w-5" />
      case "shopping-cart":
        return <ShoppingCart className="ml-2 h-5 w-5" />
      case "key":
        return <Key className="ml-2 h-5 w-5" />
      case "folder":
        return <Folder className="ml-2 h-5 w-5" />
      case "users":
        return <Users className="ml-2 h-5 w-5" />
      case "settings":
        return <Settings className="ml-2 h-5 w-5" />
      default:
        return <LayoutDashboard className="ml-2 h-5 w-5" />
    }
  }

  return (
    <nav className="grid items-start gap-2 py-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent" : "transparent",
          )}
        >
          {getIcon(item.icon)}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}
