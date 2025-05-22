import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function Faq() {
  const faqs = [
    {
      question: "هل المفاتيح أصلية 100%؟",
      answer:
        "نعم، جميع المفاتيح التي نقدمها أصلية 100% ومضمونة. نحن نحصل على المفاتيح مباشرة من الموزعين المعتمدين ونقدم ضمان استرداد الأموال في حال واجهت أي مشكلة.",
    },
    {
      question: "كيف يتم تسليم المفاتيح بعد الشراء؟",
      answer:
        "يتم تسليم المفاتيح فوراً بعد إتمام عملية الدفع عبر البريد الإلكتروني المسجل في حسابك. كما يمكنك الوصول إلى المفاتيح التي اشتريتها من خلال حسابك الشخصي في أي وقت.",
    },
    {
      question: "هل يمكنني استخدام المفتاح على أكثر من جهاز؟",
      answer:
        "يعتمد ذلك على نوع المنتج. بشكل عام، مفاتيح أنظمة التشغيل مثل ويندوز مخصصة لجهاز واحد فقط. أما بالنسبة لبرامج أوفيس، فبعض الإصدارات تدعم التثبيت على عدة أجهزة. يرجى قراءة وصف المنتج للتأكد من عدد الأجهزة المدعومة.",
    },
    {
      question: "ما هي طرق الدفع المتاحة؟",
      answer:
        "نحن نقبل مجموعة متنوعة من طرق الدفع بما في ذلك بطاقات الائتمان (فيزا، ماستركارد)، مدى، آبل باي، وغيرها من وسائل الدفع الإلكترونية الآمنة.",
    },
    {
      question: "ماذا لو لم يعمل المفتاح؟",
      answer:
        "في حالة نادرة جداً إذا لم يعمل المفتاح، يرجى التواصل مع فريق الدعم الفني على الفور. سنقوم إما بتوفير مفتاح بديل أو استرداد أموالك بالكامل خلال 30 يوماً من تاريخ الشراء.",
    },
    {
      question: "هل تقدمون خصومات للطلبات الكبيرة؟",
      answer:
        "نعم، نحن نقدم خصومات خاصة للشركات والمؤسسات التعليمية والطلبات الكبيرة. يرجى التواصل معنا عبر البريد الإلكتروني للحصول على عرض سعر مخصص.",
    },
  ]

  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="section-title text-center">الأسئلة الشائعة</h2>
        <p className="section-description">
          إليك إجابات على الأسئلة الأكثر شيوعاً. إذا لم تجد إجابة لسؤالك، يرجى التواصل معنا
        </p>

        <div className="mx-auto mt-8 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="py-4 text-right font-medium text-gray-900 hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
