import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "أحمد محمد",
      role: "مطور برمجيات",
      content:
        "تجربة رائعة مع مفاتيح نَفَس! اشتريت مفتاح ويندوز 10 برو وتم تسليمه فوراً. التنشيط تم بنجاح ولم أواجه أي مشاكل.",
      avatar: "/placeholder.svg?height=100&width=100&query=avatar1",
      rating: 5,
    },
    {
      name: "سارة أحمد",
      role: "مصممة جرافيك",
      content:
        "أفضل موقع لشراء مفاتيح أوفيس. السعر ممتاز مقارنة بالمواقع الأخرى والدعم الفني سريع جداً في الرد على استفساراتي.",
      avatar: "/placeholder.svg?height=100&width=100&query=avatar2",
      rating: 5,
    },
    {
      name: "محمد علي",
      role: "طالب جامعي",
      content:
        "كنت متردد في البداية، لكن بعد شراء مفتاح أوفيس 2021 وتجربته، أصبحت أثق تماماً في مفاتيح نَفَس. سأعود للشراء مرة أخرى.",
      avatar: "/placeholder.svg?height=100&width=100&query=avatar3",
      rating: 4,
    },
  ]

  return (
    <section className="relative overflow-hidden py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary"></div>
        <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-accent"></div>
        <div className="absolute right-1/3 top-1/3 h-48 w-48 rounded-full bg-gradient-to-r from-primary to-accent"></div>
      </div>
      
      <div className="container-custom relative">
        <div className="mb-16 text-center">
          <h2 className="gradient-text section-title inline-block">آراء عملائنا</h2>
          <p className="section-description mx-auto max-w-2xl">نفخر بثقة عملائنا ونسعى دائماً لتقديم أفضل خدمة ممكنة</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`animate-slideUp opacity-0 [animation-delay:${index * 200}ms] [animation-fill-mode:forwards]`}
            >
              <Card className="group relative h-full overflow-hidden rounded-2xl border-0 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover">
                {/* Quote icon with gradient */}
                <div className="absolute -right-3 -top-3 h-12 w-12 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 p-3 transition-transform duration-500 group-hover:scale-110">
                  <Quote className="h-6 w-6 text-primary" />
                </div>
                
                <CardContent className="p-8 pt-12">
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 transition-all duration-300 ${
                          i < testimonial.rating 
                            ? "fill-amber-400 text-amber-400" 
                            : "fill-gray-200 text-gray-200"
                        } group-hover:${i < testimonial.rating ? "fill-amber-500 text-amber-500" : ""}`}
                      />
                    ))}
                  </div>
                  <p className="mb-8 text-gray-700 leading-relaxed">{testimonial.content}</p>
                  <div className="flex items-center">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary-100 shadow-sm transition-all duration-300 group-hover:border-primary">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="mr-4">
                      <h4 className="font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
