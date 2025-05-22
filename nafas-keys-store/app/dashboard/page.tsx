import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { DollarSign, Users, Package, ShoppingCart } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">لوحة التحكم</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("ar-SA", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,345 ر.س</div>
                <p className="text-xs text-muted-foreground">+20.1% من الشهر الماضي</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المستخدمين</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 مستخدم جديد هذا الشهر</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المنتجات</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 منتجات جديدة هذا الشهر</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الطلبات النشطة</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12</div>
                <p className="text-xs text-muted-foreground">+7 طلبات جديدة اليوم</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>نظرة عامة</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>أحدث المبيعات</CardTitle>
                <CardDescription>تم إجراء 12 عملية بيع هذا الشهر.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>تحليلات المبيعات</CardTitle>
                <CardDescription>تحليل المبيعات حسب الفئة والمنتج.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  سيتم إضافة الرسوم البيانية هنا عند ربط قاعدة البيانات
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>أكثر المنتجات مبيعاً</CardTitle>
                <CardDescription>المنتجات الأكثر مبيعاً هذا الشهر.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-[60%] font-medium">ويندوز 10 برو</div>
                    <div className="w-[40%]">
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-[75%] rounded-full bg-purple-600"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-[60%] font-medium">أوفيس 2021 بروفيشنال بلس</div>
                    <div className="w-[40%]">
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-[60%] rounded-full bg-purple-600"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-[60%] font-medium">ويندوز 11 برو</div>
                    <div className="w-[40%]">
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-full w-[45%] rounded-full bg-purple-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
