import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="صورة المستخدم" />
          <AvatarFallback>مح</AvatarFallback>
        </Avatar>
        <div className="mr-4 space-y-1">
          <p className="text-sm font-medium leading-none">محمد أحمد</p>
          <p className="text-sm text-muted-foreground">mohammed@example.com</p>
        </div>
        <div className="mr-auto font-medium">+249.98 ر.س</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="صورة المستخدم" />
          <AvatarFallback>أح</AvatarFallback>
        </Avatar>
        <div className="mr-4 space-y-1">
          <p className="text-sm font-medium leading-none">أحمد علي</p>
          <p className="text-sm text-muted-foreground">ahmed@example.com</p>
        </div>
        <div className="mr-auto font-medium">+99.99 ر.س</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="صورة المستخدم" />
          <AvatarFallback>سا</AvatarFallback>
        </Avatar>
        <div className="mr-4 space-y-1">
          <p className="text-sm font-medium leading-none">سارة محمد</p>
          <p className="text-sm text-muted-foreground">sara@example.com</p>
        </div>
        <div className="mr-auto font-medium">+149.99 ر.س</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="صورة المستخدم" />
          <AvatarFallback>خا</AvatarFallback>
        </Avatar>
        <div className="mr-4 space-y-1">
          <p className="text-sm font-medium leading-none">خالد عبدالله</p>
          <p className="text-sm text-muted-foreground">khalid@example.com</p>
        </div>
        <div className="mr-auto font-medium">+219.98 ر.س</div>
      </div>
    </div>
  )
}
