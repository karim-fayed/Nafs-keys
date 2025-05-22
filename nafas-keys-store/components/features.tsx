import { Shield, Clock, CreditCard, Award, Zap, HeadphonesIcon } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: "مفاتيح أصلية 100%",
      description: "جميع المفاتيح أصلية ومضمونة من الشركات المصنعة",
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "تسليم فوري",
      description: "استلم مفتاح التنشيط فوراً بعد إتمام عملية الدفع",
    },
    {
      icon: <CreditCard className="h-10 w-10" />,
      title: "دفع آمن",
      description: "طرق دفع متعددة وآمنة لضمان حماية معلوماتك",
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "ضمان مدى الحياة",
      description: "جميع المفاتيح مضمونة مدى الحياة مع دعم فني مستمر",
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "تنشيط سهل",
      description: "خطوات بسيطة وسريعة لتنشيط منتجك بنجاح",
    },
    {
      icon: <HeadphonesIcon className="h-10 w-10" />,
      title: "دعم فني 24/7",
      description: "فريق دعم فني متاح على مدار الساعة لمساعدتك",
    },
  ]

  return (
    <section className="bg-gradient-hero py-16">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="section-title mb-2">لماذا تختار مفاتيح نَفَس؟</h2>
          <p className="section-description mb-0">نحن نقدم أفضل الخدمات لعملائنا لضمان تجربة شراء مميزة وآمنة</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-hover animate-slideUp rounded-xl border-0 bg-white/90 p-6 shadow-card transition-all hover:shadow-card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 inline-flex rounded-full bg-primary-50 p-3 text-primary">
                <div className="h-10 w-10 text-primary-600">{feature.icon}</div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
