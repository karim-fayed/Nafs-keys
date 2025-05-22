import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, User, Mail, Phone, ShoppingBag, Key, Clock, Shield } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// هذه البيانات ستأتي من قاعدة البيانات لاحقًا
const users = {
  "USR-001": {
    id: "USR-001",
    name: "محمد أحمد",
    email: "mohammed@example.com",
    phone: "+966 5XXXXXXXX",
    role: "customer",
    status: "active",
    registeredDate: "2025-04-15",
    lastLogin: "2025-05-20",
    orders: [
      {
        id: "ORD-12345",
        date: "2025-05-20",
        total: 249.98,
        status: "completed",
      },
      {
        id: "ORD-12340",
        date: "2025-04-25",
        total: 99.99,
        status: "completed",
      },
    ],
    keys: [
      {
        id: "KEY-67890",
        product: "ويندوز 10 برو",
        purchaseDate: "2025-05-20",
        status: "used",
      },
      {
        id: "KEY-67891",
        product: "أوفيس 2021 بروفيشنال بلس",
        purchaseDate: "2025-05-20",
        status: "used",
      },
      {
        id: "KEY-67893",
        product: "ويندوز 10 برو",
        purchaseDate: "2025-04-25",
        status: "used",
      },
    ],
  },
  "ADM-001": {
    id: "ADM-001",
    name: "عبدالرحمن محمد",
    email: "admin@nafaskeys.com",
    phone: "+966 5XXXXXXXX",
    role: "admin",
    status: "active",
    registeredDate: "2025-01-01",
    lastLogin: "2025-05-21",
    orders: [],
    keys: [],
  },
}

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const user = users[params.id as keyof typeof users]

  if (!user) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">المستخدم غير موجود</h2>
        <p className="mb-4 text-muted-foreground">لم يتم العثور على المستخدم المطلوب</p>
        <Button asChild>
          <Link href="/dashboard/users">العودة إلى المستخدمين</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">تفاصيل المستخدم</h2>
          <p className="text-muted-foreground">عرض وتعديل معلومات المستخدم.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/users">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة
            </Link>
          </Button>
          <Button type="submit">حفظ التغييرات</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Badge
                variant="outline"
                className={
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                }
              >
                {user.role === "admin" ? "مدير" : "عميل"}
              </Badge>
              <Badge
                variant="outline"
                className={
                  user.status === "active"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100"
                }
              >
                {user.status === "active" ? "نشط" : "غير نشط"}
              </Badge>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center">
                <User className="ml-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">رقم المستخدم</p>
                  <p className="text-sm text-muted-foreground">{user.id}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="ml-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">البريد الإلكتروني</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="ml-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">رقم الهاتف</p>
                  <p className="text-sm text-muted-foreground">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="ml-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">تاريخ التسجيل</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.registeredDate).toLocaleDateString("ar-SA")}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="ml-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">آخر تسجيل دخول</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.lastLogin).toLocaleDateString("ar-SA")}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center">
                <ShoppingBag className="ml-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">عدد الطلبات</p>
                  <p className="text-sm text-muted-foreground">{user.orders.length}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Key className="ml-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">عدد المفاتيح</p>
                  <p className="text-sm text-muted-foreground">{user.keys.length}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
              <TabsTrigger value="orders">الطلبات</TabsTrigger>
              <TabsTrigger value="keys">المفاتيح</TabsTrigger>
              <TabsTrigger value="security">الأمان</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>المعلومات الشخصية</CardTitle>
                  <CardDescription>تعديل المعلومات الشخصية للمستخدم.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input id="phone" type="tel" defaultValue={user.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">الدور</Label>
                      <Select defaultValue={user.role}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الدور" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">مدير</SelectItem>
                          <SelectItem value="customer">عميل</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="status">الحالة</Label>
                        <p className="text-sm text-muted-foreground">تفعيل أو تعطيل حساب المستخدم.</p>
                      </div>
                      <Switch id="status" defaultChecked={user.status === "active"} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>طلبات المستخدم</CardTitle>
                  <CardDescription>جميع الطلبات التي قام بها المستخدم.</CardDescription>
                </CardHeader>
                <CardContent>
                  {user.orders.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>رقم الطلب</TableHead>
                            <TableHead>التاريخ</TableHead>
                            <TableHead>المجموع</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead className="text-left">الإجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {user.orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{new Date(order.date).toLocaleDateString("ar-SA")}</TableCell>
                              <TableCell>{order.total.toFixed(2)} ر.س</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    order.status === "completed"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : order.status === "processing"
                                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                        : "bg-red-100 text-red-800 hover:bg-red-100"
                                  }
                                >
                                  {order.status === "completed"
                                    ? "مكتمل"
                                    : order.status === "processing"
                                      ? "قيد المعالجة"
                                      : "ملغي"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={`/dashboard/orders/${order.id}`}>عرض</Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <ShoppingBag className="mb-2 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-1 text-lg font-medium">لا توجد طلبات</h3>
                      <p className="text-sm text-muted-foreground">لم يقم هذا المستخدم بإجراء أي طلبات بعد.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="keys" className="space-y-4 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>مفاتيح المستخدم</CardTitle>
                  <CardDescription>جميع مفاتيح التنشيط التي يملكها المستخدم.</CardDescription>
                </CardHeader>
                <CardContent>
                  {user.keys.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>رقم المفتاح</TableHead>
                            <TableHead>المنتج</TableHead>
                            <TableHead>تاريخ الشراء</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead className="text-left">الإجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {user.keys.map((key) => (
                            <TableRow key={key.id}>
                              <TableCell className="font-medium">{key.id}</TableCell>
                              <TableCell>{key.product}</TableCell>
                              <TableCell>{new Date(key.purchaseDate).toLocaleDateString("ar-SA")}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    key.status === "available"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  }
                                >
                                  {key.status === "available" ? "متاح" : "مستخدم"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={`/dashboard/keys/${key.id}`}>عرض</Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Key className="mb-2 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-1 text-lg font-medium">لا توجد مفاتيح</h3>
                      <p className="text-sm text-muted-foreground">لم يقم هذا المستخدم بشراء أي مفاتيح تنشيط بعد.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الأمان</CardTitle>
                  <CardDescription>إدارة إعدادات الأمان وكلمة المرور للمستخدم.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">تغيير كلمة المرور</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                        <Input id="newPassword" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>

                      <Button>تغيير كلمة المرور</Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">التحقق بخطوتين</h3>
                        <p className="text-sm text-muted-foreground">تفعيل التحقق بخطوتين لزيادة أمان الحساب.</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-red-600">حظر المستخدم</h3>
                        <p className="text-sm text-muted-foreground">حظر المستخدم من الوصول إلى حسابه.</p>
                      </div>
                      <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                        <Shield className="ml-2 h-4 w-4" />
                        حظر المستخدم
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
