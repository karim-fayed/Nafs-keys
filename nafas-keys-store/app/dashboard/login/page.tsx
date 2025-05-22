import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12">
      <div className="mb-6">
        <Image src="/logo.png" alt="مفاتيح نَفَس | Nafas Keys" width={180} height={50} className="h-12 w-auto" />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
          <CardDescription className="text-center">
            أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى لوحة التحكم
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" type="email" placeholder="admin@nafaskeys.com" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">كلمة المرور</Label>
              <Link href="/dashboard/forgot-password" className="text-sm text-primary hover:underline">
                نسيت كلمة المرور؟
              </Link>
            </div>
            <Input id="password" type="password" />
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="remember" className="text-sm font-normal">
              تذكرني
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
            <Link href="/dashboard">تسجيل الدخول</Link>
          </Button>
        </CardFooter>
      </Card>
      <p className="mt-6 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} مفاتيح نَفَس | Nafas Keys. جميع الحقوق محفوظة.
      </p>
    </div>
  )
}
