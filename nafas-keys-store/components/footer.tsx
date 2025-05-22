import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 pt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Image src="/logo.png" alt="مفاتيح نَفَس | Nafas Keys" width={150} height={40} className="h-10 w-auto" />
            </Link>
            <p className="mb-4 text-gray-600">
              متجرك الموثوق لشراء مفاتيح تنشيط البرامج والمنتجات الرقمية بأسعار منافسة وضمان الجودة
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Link href="#" className="text-gray-600 hover:text-purple-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">فيسبوك</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">تويتر</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">انستغرام</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-purple-600">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-purple-600">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link href="/categories/windows" className="text-gray-600 hover:text-purple-600">
                  ويندوز
                </Link>
              </li>
              <li>
                <Link href="/categories/office" className="text-gray-600 hover:text-purple-600">
                  أوفيس
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-purple-600">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-purple-600">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">الفئات</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/windows" className="text-gray-600 hover:text-purple-600">
                  أنظمة التشغيل
                </Link>
              </li>
              <li>
                <Link href="/categories/office" className="text-gray-600 hover:text-purple-600">
                  برامج المكتب
                </Link>
              </li>
              <li>
                <Link href="/categories/games" className="text-gray-600 hover:text-purple-600">
                  ألعاب
                </Link>
              </li>
              <li>
                <Link href="/categories/development" className="text-gray-600 hover:text-purple-600">
                  برامج التطوير
                </Link>
              </li>
              <li>
                <Link href="/categories/security" className="text-gray-600 hover:text-purple-600">
                  برامج الحماية
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="mt-1 h-5 w-5 text-purple-600" />
                <span className="mr-2 text-gray-600">support@nafaskeys.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="mt-1 h-5 w-5 text-purple-600" />
                <span className="mr-2 text-gray-600">+966 5XXXXXXXX</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mt-1 h-5 w-5 text-purple-600" />
                <span className="mr-2 text-gray-600">المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 py-6 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} مفاتيح نَفَس | Nafas Keys. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}
