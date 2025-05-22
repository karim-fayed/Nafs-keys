import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AddKeysPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">إضافة مفاتيح تنشيط</h2>
          <p className="text-muted-foreground">أضف مفاتيح تنشيط جديدة للمنتجات.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/keys">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة
            </Link>
          </Button>
          <Button type="submit">حفظ المفاتيح</Button>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="manual">إدخال يدوي</TabsTrigger>
          <TabsTrigger value="import">استيراد من ملف</TabsTrigger>
          <TabsTrigger value="generate">توليد مفاتيح</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>إضافة مفاتيح يدويًا</CardTitle>
              <CardDescription>أدخل مفاتيح التنشيط يدويًا لمنتج محدد.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">المنتج</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنتج" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="win10-pro">ويندوز 10 برو</SelectItem>
                    <SelectItem value="win11-pro">ويندوز 11 برو</SelectItem>
                    <SelectItem value="office-2021">أوفيس 2021 بروفيشنال بلس</SelectItem>
                    <SelectItem value="office-2019">أوفيس 2019 بروفيشنال بلس</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keys">مفاتيح التنشيط</Label>
                <Textarea
                  id="keys"
                  placeholder="أدخل مفاتيح التنشيط (كل مفتاح في سطر منفصل)"
                  className="min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground">
                  أدخل كل مفتاح تنشيط في سطر منفصل. سيتم تخصيص مفتاح واحد لكل طلب.
                </p>
              </div>

              <div className="flex justify-end">
                <Button>إضافة المفاتيح</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>استيراد مفاتيح من ملف</CardTitle>
              <CardDescription>استيراد مفاتيح التنشيط من ملف CSV أو TXT.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">المنتج</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنتج" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="win10-pro">ويندوز 10 برو</SelectItem>
                    <SelectItem value="win11-pro">ويندوز 11 برو</SelectItem>
                    <SelectItem value="office-2021">أوفيس 2021 بروفيشنال بلس</SelectItem>
                    <SelectItem value="office-2019">أوفيس 2019 بروفيشنال بلس</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>ملف المفاتيح</Label>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="mb-4 flex h-[150px] w-full items-center justify-center rounded-md border border-dashed">
                      <div className="flex flex-col items-center justify-center text-center">
                        <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                        <p className="mb-2 text-sm font-medium">اسحب وأفلت الملف هنا</p>
                        <p className="text-xs text-muted-foreground">CSV، TXT حتى 5MB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      اختر ملفًا
                    </Button>
                  </CardContent>
                </Card>
                <p className="text-xs text-muted-foreground">يجب أن يحتوي الملف على مفتاح واحد في كل سطر.</p>
              </div>

              <div className="flex justify-end">
                <Button>استيراد المفاتيح</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>توليد مفاتيح تنشيط</CardTitle>
              <CardDescription>توليد مفاتيح تنشيط عشوائية للمنتجات.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">المنتج</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنتج" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="win10-pro">ويندوز 10 برو</SelectItem>
                    <SelectItem value="win11-pro">ويندوز 11 برو</SelectItem>
                    <SelectItem value="office-2021">أوفيس 2021 بروفيشنال بلس</SelectItem>
                    <SelectItem value="office-2019">أوفيس 2019 بروفيشنال بلس</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="count">عدد المفاتيح</Label>
                <Input id="count" type="number" min="1" defaultValue="10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">صيغة المفتاح</Label>
                <Select defaultValue="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر صيغة المفتاح" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX">XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</SelectItem>
                    <SelectItem value="XXXX-XXXX-XXXX-XXXX">XXXX-XXXX-XXXX-XXXX</SelectItem>
                    <SelectItem value="XXXXXXXXXXXXXXXXXXXXXXXX">XXXXXXXXXXXXXXXXXXXXXXXX</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">حيث X يمثل حرفًا أو رقمًا عشوائيًا.</p>
              </div>

              <div className="flex justify-end">
                <Button>توليد المفاتيح</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
