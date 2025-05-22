import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Upload } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">إضافة فئة جديدة</h2>
          <p className="text-muted-foreground">أضف فئة جديدة لتنظيم المنتجات.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/categories">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة
            </Link>
          </Button>
          <Button type="submit">حفظ الفئة</Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>معلومات الفئة</CardTitle>
            <CardDescription>المعلومات الأساسية للفئة.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم الفئة</Label>
              <Input id="name" placeholder="أدخل اسم الفئة" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">الرابط المخصص</Label>
              <Input id="slug" placeholder="مثال: windows-software" />
              <p className="text-xs text-muted-foreground">سيظهر هذا في عنوان URL للفئة.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف الفئة</Label>
              <Textarea id="description" placeholder="أدخل وصفًا للفئة" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>صورة الفئة</CardTitle>
            <CardDescription>صورة تمثل الفئة في الواجهة الأمامية.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>صورة الفئة</Label>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="mb-4 flex h-[200px] w-full items-center justify-center rounded-md border border-dashed">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                      <p className="mb-2 text-sm font-medium">اسحب وأفلت الصورة هنا</p>
                      <p className="text-xs text-muted-foreground">PNG، JPG، GIF حتى 2MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    اختر ملفًا
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">أيقونة الفئة</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر أيقونة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer">كمبيوتر</SelectItem>
                  <SelectItem value="file-text">ملف نصي</SelectItem>
                  <SelectItem value="gamepad">يد تحكم</SelectItem>
                  <SelectItem value="code">كود</SelectItem>
                  <SelectItem value="shield">درع</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">ستظهر هذه الأيقونة بجانب اسم الفئة.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>خيارات متقدمة</CardTitle>
            <CardDescription>إعدادات إضافية للفئة.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="parent">الفئة الأم</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="بدون فئة أم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">بدون فئة أم</SelectItem>
                    <SelectItem value="windows">أنظمة التشغيل</SelectItem>
                    <SelectItem value="office">برامج المكتب</SelectItem>
                    <SelectItem value="games">ألعاب</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">اختر فئة أم لإنشاء تسلسل هرمي للفئات.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">ترتيب العرض</Label>
                <Input id="order" type="number" min="0" defaultValue="0" />
                <p className="text-xs text-muted-foreground">ترتيب عرض الفئة في القوائم (0 للافتراضي).</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox id="featured" />
              <Label htmlFor="featured">فئة مميزة</Label>
            </div>
            <p className="text-xs text-muted-foreground">الفئات المميزة ستظهر في الصفحة الرئيسية وأماكن بارزة أخرى.</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-2 space-x-reverse">
        <Button variant="outline">إلغاء</Button>
        <Button>حفظ الفئة</Button>
      </div>
    </div>
  )
}
