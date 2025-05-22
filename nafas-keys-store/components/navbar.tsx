"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, Menu, User, X, LogOut, ChevronDown, Home, Package, Info, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"
import { useCartContext } from "@/components/providers/cart-provider"

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, isAdmin, session, signOut } = useAuth()
  const { cart } = useCartContext()

  const cartItemCount = cart?.itemCount || 0

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? "border-b bg-white/95 shadow-md backdrop-blur-md" 
          : "bg-transparent"
      }`}
    >
      {/* Animated highlight bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[gradient_8s_ease-in-out_infinite]"></div>
      
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="group md:hidden hover:bg-primary/10 transition-all duration-300"
                >
                  <Menu className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  <span className="sr-only">فتح القائمة</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-primary/20">
                <div className="flex justify-center mb-8 mt-4">
                  <Image 
                    src="/logo.png" 
                    alt="مفاتيح نَفَس | Nafas Keys" 
                    width={180} 
                    height={50} 
                    className="h-12 w-auto" 
                  />
                </div>
                <nav className="flex flex-col gap-6">
                  {[
                    { icon: <Home className="h-5 w-5 ml-3" />, text: "الرئيسية", href: "/" },
                    { icon: <Package className="h-5 w-5 ml-3" />, text: "المنتجات", href: "/products" },
                    { icon: <Package className="h-5 w-5 ml-3" />, text: "ويندوز", href: "/categories/windows" },
                    { icon: <Package className="h-5 w-5 ml-3" />, text: "أوفيس", href: "/categories/office" },
                    { icon: <Info className="h-5 w-5 ml-3" />, text: "من نحن", href: "/about" },
                    { icon: <MessageSquare className="h-5 w-5 ml-3" />, text: "اتصل بنا", href: "/contact" },
                  ].map((item, index) => (
                    <Link 
                      key={index}
                      href={item.href} 
                      className="group flex items-center text-lg font-medium text-gray-700 transition-all duration-300 hover:text-primary hover:translate-x-2"
                    >
                      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary ml-3 transition-all duration-300 group-hover:bg-primary/20">
                        {item.icon}
                      </span>
                      {item.text}
                    </Link>
                  ))}
                  {isAdmin && (
                    <Link 
                      href="/dashboard" 
                      className="group flex items-center text-lg font-medium text-gray-700 transition-all duration-300 hover:text-primary hover:translate-x-2 mt-4 pt-4 border-t border-gray-100"
                    >
                      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-accent/10 text-accent ml-3 transition-all duration-300 group-hover:bg-accent/20">
                        <User className="h-5 w-5 ml-3" />
                      </span>
                      لوحة التحكم
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="ml-4 flex items-center">
              <Image 
                src="/logo.png" 
                alt="مفاتيح نَفَس | Nafas Keys" 
                width={192} 
                height={192} 
                className="w-48 h-48 object-contain" 
              />
            </Link>

            <nav className="mx-6 hidden items-center space-x-1 md:flex">
              <Link
                href="/"
                className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              >
                <Home className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                الرئيسية
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                  >
                    <Package className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    المنتجات
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl border-primary/20 p-2 shadow-lg">
                  <DropdownMenuItem asChild>
                    <Link href="/products" className="w-full rounded-lg p-2 transition-colors hover:bg-primary/10">
                      جميع المنتجات
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-gray-100" />
                  <DropdownMenuItem asChild>
                    <Link href="/categories/windows" className="w-full rounded-lg p-2 transition-colors hover:bg-primary/10">
                      أنظمة التشغيل
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/categories/office" className="w-full rounded-lg p-2 transition-colors hover:bg-primary/10">
                      برامج المكتب
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/categories/games" className="w-full rounded-lg p-2 transition-colors hover:bg-primary/10">
                      ألعاب
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/categories/security" className="w-full rounded-lg p-2 transition-colors hover:bg-primary/10">
                      برامج الحماية
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="/about"
                className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              >
                <Info className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                من نحن
              </Link>
              <Link
                href="/contact"
                className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              >
                <MessageSquare className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                اتصل بنا
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {isSearchOpen ? (
              <div className="relative animate-scaleIn">
                <Input 
                  type="search" 
                  placeholder="ابحث عن منتج..." 
                  className="w-[200px] rounded-full border-primary/20 bg-white/90 pl-10 pr-4 shadow-sm backdrop-blur-sm focus-visible:ring-primary md:w-[300px]" 
                  autoFocus 
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">إغلاق البحث</span>
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)}
                className="group rounded-full transition-all duration-300 hover:bg-primary/10"
              >
                <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="sr-only">البحث</span>
              </Button>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="group rounded-full transition-all duration-300 hover:bg-primary/10"
                  >
                    <User className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="sr-only">الحساب</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl border-primary/20 p-2 shadow-lg">
                  <DropdownMenuLabel className="rounded-lg p-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{session?.user?.name}</span>
                      <span className="text-xs text-gray-500">{session?.user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1 bg-gray-100" />
                  <DropdownMenuItem asChild className="rounded-lg">
                    <Link href="/account" className="flex w-full p-2 transition-colors hover:bg-primary/10">
                      حسابي
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg">
                    <Link href="/account?tab=orders" className="flex w-full p-2 transition-colors hover:bg-primary/10">
                      طلباتي
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg">
                    <Link href="/account?tab=keys" className="flex w-full p-2 transition-colors hover:bg-primary/10">
                      مفاتيحي
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator className="my-1 bg-gray-100" />
                      <DropdownMenuItem asChild className="rounded-lg">
                        <Link href="/dashboard" className="flex w-full p-2 transition-colors hover:bg-primary/10">
                          لوحة التحكم
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="my-1 bg-gray-100" />
                  <DropdownMenuItem 
                    onClick={() => signOut()} 
                    className="rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="ml-2 h-4 w-4" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                asChild 
                className="group rounded-full transition-all duration-300 hover:bg-primary/10"
              >
                <Link href="/login">
                  <User className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="sr-only">تسجيل الدخول</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
