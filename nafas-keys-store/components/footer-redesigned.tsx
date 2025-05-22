import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
      
      {/* Curved divider at the top */}
      <div className="absolute -top-1 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" className="fill-white">
          <path d="M0,48L80,42.7C160,37,320,27,480,21.3C640,16,800,16,960,21.3C1120,27,1280,37,1360,42.7L1440,48L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>
      
      <div className="container-custom relative pt-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="animate-fadeIn [animation-duration:700ms]">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/logo-white.png"
                alt="مفاتيح نَفَس | Nafas Keys"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mb-8 text-gray-400 leading-relaxed">
              متجرك الموثوق لشراء مفاتيح تنشيط البرامج والمنتجات الرقمية بأسعار منافسة وضمان الجودة
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Link
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all duration-300 hover:bg-primary hover:text-white"
              >
                <Facebook className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="sr-only">فيسبوك</span>
              </Link>
              <Link
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all duration-300 hover:bg-primary hover:text-white"
              >
                <Twitter className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="sr-only">تويتر</span>
              </Link>
              <Link
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all duration-300 hover:bg-primary hover:text-white"
              >
                <Instagram className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="sr-only">انستغرام</span>
              </Link>
            </div>
          </div>

          <div className="animate-fadeIn [animation-delay:200ms] [animation-duration:700ms]">            <h3 className="mb-6 text-xl font-bold text-white relative">
              <span className="relative z-10">روابط سريعة</span>
              <span className="absolute -bottom-1 right-0 h-1 w-12 rounded bg-gradient-to-r from-primary to-accent"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { text: "الرئيسية", href: "/" },
                { text: "المنتجات", href: "/products" },
                { text: "ويندوز", href: "/categories/windows" },
                { text: "أوفيس", href: "/categories/office" },
                { text: "من نحن", href: "/about" },
                { text: "اتصل بنا", href: "/contact" }
              ].map((link, index) => (                <li key={index} className="transform transition-transform duration-300 hover:translate-x-2">
                  <Link href={link.href} className="group inline-flex items-center transition-colors hover:text-primary">
                    <ArrowLeft className="mr-1 h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                    <span>{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fadeIn [animation-delay:400ms] [animation-duration:700ms]">            <h3 className="mb-6 text-xl font-bold text-white relative">
              <span className="relative z-10">تواصل معنا</span>
              <span className="absolute -bottom-1 right-0 h-1 w-12 rounded bg-gradient-to-r from-primary to-accent"></span>
            </h3>
            <ul className="space-y-4">              <li className="group flex items-start transition-transform duration-300 hover:translate-x-2">
                <Mail className="mt-1 h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="mr-3 transition-colors group-hover:text-primary">support@nafaskeys.com</span>
              </li>
              <li className="group flex items-start transition-transform duration-300 hover:translate-x-2">
                <Phone className="mt-1 h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="mr-3 transition-colors group-hover:text-primary">+966 5XXXXXXXX</span>
              </li>
              <li className="group flex items-start transition-transform duration-300 hover:translate-x-2">
                <MapPin className="mt-1 h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="mr-3 transition-colors group-hover:text-primary">المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>

          <div className="animate-fadeIn [animation-delay:600ms] [animation-duration:700ms]">
            <h3 className="mb-6 text-xl font-bold text-white relative">
              <span className="relative z-10">النشرة البريدية</span>
              <span className="absolute -bottom-1 left-0 h-1 w-12 rounded bg-gradient-to-r from-primary to-accent"></span>
            </h3>
            <p className="mb-4 text-gray-400">اشترك في نشرتنا البريدية للحصول على أحدث العروض والخصومات</p>
            <div className="relative mt-6">
              <Input
                type="email"
                placeholder="البريد الإلكتروني"
                className="border-gray-700 bg-gray-800 py-6 pr-4 text-white placeholder:text-gray-500 focus:border-primary"
              />
              <Button className="absolute left-1 top-1 bg-gradient-to-r from-primary to-accent hover:from-primary-600 hover:to-accent-600">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 py-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} مفاتيح نَفَس | Nafas Keys. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}
