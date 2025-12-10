"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  Award,
  Clock,
  CheckCircle,
  MessageCircle,
  Globe,
  Facebook,
  Instagram,
  Menu,
  X,
  Sparkles,
  Star,
  PlayCircle,
} from "lucide-react"

interface Currency {
  code: string
  symbol: string
  rate: number
}

interface LocationData {
  country_code: string
}

type Language = "ar" | "en"

const currencyRates: Record<string, Currency> = {
  EGP: { code: "EGP", symbol: "ج.م", rate: 48.4475 },
  SAR: { code: "SAR", symbol: "ر.س", rate: 3.7519 },
  EUR: { code: "EUR", symbol: "€", rate: 0.866 },
  GBP: { code: "GBP", symbol: "£", rate: 0.752 },
  USD: { code: "USD", symbol: "$", rate: 1 },
}

const translations: Record<
  Language,
  {
    academyName: string
    academyNameEn: string

    // nav
    menuAbout: string
    menuPricing: string
    menuVideos: string
    menuServices: string
    menuTestimonials: string
    menuContact: string
    subscribeTop: string

    // hero
    heroAyah: string
    heroTagline: string
    heroSubtitle: string
    heroPrimaryCta: string
    heroSecondaryCta: string

    // why us / about
    whyUsTitle: string
    whyUsSubtitle: string
    statsTitle: string
    statsSubtitle: string
    missionTitle: string
    missionText: string

    // services / programs
    servicesTitle: string
    servicesSubtitle: string

    // special tracks
    tracksTitle: string
    tracksSubtitle: string
    competitionsTitle: string
    competitionsText: string
    superProgramTitle: string
    superProgramText: string
    qudsTitle: string
    qudsText: string

    // videos
    videosTitle: string
    videosSubtitle: string

    // testimonials
    testimonialsTitle: string
    testimonialsSubtitle: string

    // pricing
    pricingTitle: string
    pricingSubtitle: string
    basicPlan: string
    standardPlan: string
    premiumPlan: string
    sessionsPerMonth: string
    mostPopular: string
    subscribeNow: string

    // CTA / contact / footer
    ctaTitle: string
    ctaSubtitle: string
    contactTitle: string
    contactSubtitle: string
    footerRights: string
  }
> = {
  ar: {
    academyName: "أكاديمية أمة مسلمة",
    academyNameEn: "Muslim Ummah Academy",

    menuAbout: "عن الأكاديمية",
    menuPricing: "الأسعار",
    menuVideos: "محتوى الأكاديمية",
    menuServices: "مواد الأكاديمية",
    menuTestimonials: "آراء العملاء",
    menuContact: "تواصل معنا",
    subscribeTop: "احجز حصتك المجانية",

    heroAyah: "خَيْرُكُم مَن تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    heroTagline: "منصة متخصصة لتعليم القرآن والتجويد أونلاين",
    heroSubtitle:
      "حصص مباشرة، معلمين ومعلمات مجازين، ومحتوى تفاعلي يناسب الكبار والأطفال في أي مكان في العالم.",
    heroPrimaryCta: "احجز حصتك المجانية الآن",
    heroSecondaryCta: "شاهد محتوى الأكاديمية",

    whyUsTitle: "لماذا أكاديمية أمة مسلمة؟",
    whyUsSubtitle: "كل ما تحتاجه لرحلة قرآنية ثابتة ومنظمة… في مكان واحد.",
    statsTitle: "ليست مجرد أرقام",
    statsSubtitle: "أثر حقيقي في حياة مئات الطلاب والأُسر حول العالم.",
    missionTitle: "رسالتنا",
    missionText:
      "نسعى في أكاديمية أمة مسلمة إلى ربط القلوب بكتاب الله حفظًا وتجويدًا وفهمًا، بأسلوب يجمع بين الأصالة والوسائل التعليمية الحديثة، مع متابعة حقيقية لكل طالب وطالبة.",

    servicesTitle: "مواد الأكاديمية",
    servicesSubtitle: "مسارات تعليمية متكاملة تناسب مختلف الأعمار والمستويات.",

    tracksTitle: "برامج ومسارات مميزة",
    tracksSubtitle: "تجارب تعليمية تضيف الحماس والمتعة إلى حفظ القرآن.",
    competitionsTitle: "مسابقات أمة",
    competitionsText:
      "مسابقات شهرية ورمضانية لتحفيز الطلاب على المراجعة، مع جوائز وشهادات تميّز المتفوّقين وتشجع الباقين.",
    superProgramTitle: "برنامج سوبر أمة",
    superProgramText:
      "برنامج مكثّف لطلاب النخبة، مجموعات صغيرة، متابعة لصيقة، وخطط حفظ تسابق الزمن بإتقان وهدوء.",
    qudsTitle: "برنامج قُدسنا",
    qudsText:
      "برنامج تعريفي تربوي عن فلسطين والقدس والمسجد الأقصى، يعرّف الأطفال بهوية الأمة وقضاياها العادلة بقصص ونشاطات ممتعة.",

    videosTitle: "من قلب الأكاديمية",
    videosSubtitle:
      "مقاطع من حصص حقيقية ومواد تعريفية توضّح طريقة الشرح، الانضباط، والتعامل مع الطلاب.",

    testimonialsTitle: "آراء أولياء الأمور والطلاب",
    testimonialsSubtitle: "قصص نجاح حقيقية من أسر اطمأنّت إلى أن أبناءها في أيدٍ أمينة.",

    pricingTitle: "خطط مرنة تناسبك",
    pricingSubtitle: "اختر عدد الحصص الأسبوعية بما يناسب وقتك وميزانيتك، بدون التزام معقّد.",
    basicPlan: "خطة البداية",
    standardPlan: "الخطة المتقدمة",
    premiumPlan: "خطة النخبة",
    sessionsPerMonth: "حصص شهريًا",
    mostPopular: "الأكثر اختيارًا",
    subscribeNow: "اشترك الآن",

    ctaTitle: "جاهز لتكون رحلتك مع القرآن أكثر ثباتًا وتنظيمًا؟",
    ctaSubtitle:
      "أرسل لنا رسالة عبر واتساب ودع فريق الأكاديمية يساعدك على اختيار الخطة الأنسب لك ولأطفالك.",
    contactTitle: "تواصل معنا مباشرة",
    contactSubtitle: "فريق الدعم جاهز للإجابة عن أسئلتك بالعربية أو الإنجليزية.",
    footerRights: "جميع الحقوق محفوظة © أكاديمية أمة مسلمة",
  },

  en: {
    academyName: "Muslim Ummah Academy",
    academyNameEn: "أكاديمية أمة مسلمة",

    menuAbout: "About",
    menuPricing: "Pricing",
    menuVideos: "Content",
    menuServices: "Programs",
    menuTestimonials: "Testimonials",
    menuContact: "Contact",
    subscribeTop: "Book a free lesson",

    heroAyah: '“The best of you are those who learn the Qur\'an and teach it.”',
    heroTagline: "Qur'an & Tajweed online for the whole family",
    heroSubtitle:
      "Live one‑to‑one sessions with qualified teachers and engaging, structured curriculums for children and adults.",
    heroPrimaryCta: "Book your free lesson",
    heroSecondaryCta: "Watch academy content",

    whyUsTitle: "Why Muslim Ummah Academy?",
    whyUsSubtitle: "Everything you need for a consistent Qur'an journey – in one place.",
    statsTitle: "More than just numbers",
    statsSubtitle: "Real impact in the lives of students and families around the world.",
    missionTitle: "Our mission",
    missionText:
      "We help children and adults connect deeply with the Qur’an through memorisation, tajweed and understanding, in a warm, faith‑centred learning environment.",

    servicesTitle: "Academy programs",
    servicesSubtitle: "Structured learning paths for different ages and levels.",

    tracksTitle: "Special tracks & experiences",
    tracksSubtitle: "Add excitement and motivation to your Qur'an journey.",
    competitionsTitle: "Ummah competitions",
    competitionsText:
      "Monthly and Ramadan competitions that encourage revision, with prizes and certificates for high achievers.",
    superProgramTitle: "Super Ummah program",
    superProgramText:
      "An intensive track for high‑commitment students, with small groups, close follow‑up and ambitious memorisation plans.",
    qudsTitle: "Our Quds program",
    qudsText:
      "A values‑based program about Palestine, Al‑Quds and Al‑Aqsa, building a strong connection with the Ummah’s central cause through stories and activities.",

    videosTitle: "Inside the academy",
    videosSubtitle:
      "Short clips from real sessions that show how teachers interact with students.",

    testimonialsTitle: "What parents & students say",
    testimonialsSubtitle:
      "Genuine feedback from families who trusted us with their Qur’an journey.",

    pricingTitle: "Flexible plans",
    pricingSubtitle:
      "Choose the number of weekly sessions that best fits your schedule and your budget.",
    basicPlan: "Starter plan",
    standardPlan: "Focused plan",
    premiumPlan: "Elite plan",
    sessionsPerMonth: "sessions / month",
    mostPopular: "Most popular",
    subscribeNow: "Subscribe now",

    ctaTitle: "Ready to make your Qur'an journey more consistent?",
    ctaSubtitle:
      "Send us a WhatsApp message and our team will help you choose the best plan for you or your children.",
    contactTitle: "Contact us directly",
    contactSubtitle: "Our support team can help in both Arabic and English.",
    footerRights: "All rights reserved © Muslim Ummah Academy",
  },
}

/* ---------- CountUp component (for stats like Zuwad) ---------- */
function CountUp({
  to = 1000,
  duration = 1200,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to?: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          const start = performance.now()

          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration)
            setVal(Math.floor(progress * to))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      })
    })

    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration])

  const locale =
    typeof document !== "undefined" && document.documentElement.dir === "rtl" ? "ar-EG" : "en-US"
  const formatted = new Intl.NumberFormat(locale).format(val)

  return (
    <div ref={ref} className={className}>
      <span className="tabular-nums">
        {prefix}
        {formatted}
        {suffix}
      </span>
    </div>
  )
}

/* ---------- Videos Section (Reels-style مثل زواد) ---------- */
function VideosSection({ language }: { language: Language }) {
  const videoIds = ["nAMImHfDMmI", "FbNOMuPZK2I", "lTQiLyOL5kU", "nmQrYjJlBmg", "N1WfVkQsC2c"]
  const [index, setIndex] = useState(language === "ar" ? 0 : 1)

  useEffect(() => {
    setIndex(language === "ar" ? 0 : 1)
  }, [language])

  const prev = () => setIndex((i) => (i - 1 + videoIds.length) % videoIds.length)
  const next = () => setIndex((i) => (i + 1) % videoIds.length)

  const t = translations[language]
  const isRTL = language === "ar"
  const src = `https://www.youtube-nocookie.com/embed/${videoIds[index]}?rel=0&modestbranding=1&playsinline=1`

  return (
    <section id="videos" className="py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <Badge className="mb-3 bg-emerald-100 text-emerald-800 border-emerald-200">
            <PlayCircle className="h-4 w-4 mx-1" />
            <span>{isRTL ? "لقطات حقيقية" : "Real sessions"}</span>
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-3">
            {t.videosTitle}
          </h2>
          <p className="text-lg text-emerald-800/80">{t.videosSubtitle}</p>
        </div>

        <div className="max-w-[360px] sm:max-w-[380px] md:max-w-[420px] mx-auto">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-emerald-100 bg-black">
              <div className="aspect-[9/16]">
                <iframe
                  key={videoIds[index]}
                  src={src}
                  title="Ummah Academy video"
                  loading="lazy"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <button
              onClick={prev}
              aria-label="Previous video"
              className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow p-3 border border-emerald-100 ${
                isRTL ? "right-2" : "left-2"
              }`}
            >
              {isRTL ? "›" : "‹"}
            </button>
            <button
              onClick={next}
              aria-label="Next video"
              className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow p-3 border border-emerald-100 ${
                isRTL ? "left-2" : "right-2"
              }`}
            >
              {isRTL ? "‹" : "›"}
            </button>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {videoIds.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  i === index ? "bg-emerald-700 w-6" : "bg-emerald-200"
                }`}
                aria-label={`Go to video ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Testimonials Section (سلايدر + صور فيد مثل زواد) ---------- */
function TestimonialsSection({
  language,
  whatsappLink,
}: {
  language: Language
  whatsappLink: string
}) {
  const isRTL = language === "ar"

  const testimonials = [
    {
      nameAr: "أم عبد الله",
      nameEn: "Umm Abdullah",
      roleAr: "والدة طالبة (10 سنوات)",
      roleEn: "Parent of a 10‑year‑old",
      quoteAr:
        "من أول شهر لاحظنا فرقًا واضحًا في تلاوة ابنتنا، والأجمل أن الحصة أصبحت من أحب الأوقات لديها.",
      quoteEn:
        "From the first month we noticed a clear difference in our daughter’s recitation – and the sessions became her favourite time of the week.",
    },
    {
      nameAr: "أبو ياسين",
      nameEn: "Abu Yaseen",
      roleAr: "والد طالبين",
      roleEn: "Parent of two students",
      quoteAr:
        "وجود معلمات ملتزمات ومتابعة دائمة مع ولي الأمر جعلنا نشعر أن أبناءنا في بيئة تربوية قبل أن تكون تعليمية.",
      quoteEn:
        "Committed teachers and constant follow‑up made us feel our kids are in a nurturing environment, not just an online class.",
    },
    {
      nameAr: "سمية",
      nameEn: "Sumayyah",
      roleAr: "طالبة تجويد للكبار",
      roleEn: "Adult tajweed student",
      quoteAr:
        "كنت أخشى دروس التجويد عبر الإنترنت، لكن طريقة الشرح والتطبيق جعلتني أحب علم التجويد لأول مرة.",
      quoteEn:
        "I used to be intimidated by tajweed rules, but the way they explained and applied them made me love this science for the first time.",
    },
  ]

  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  const current = testimonials[index]

  return (
    <section id="testimonials" className="py-20 bg-emerald-50/80 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <Badge className="mb-3 bg-white text-emerald-800 border-emerald-200">
            <Star className="h-4 w-4 mx-1" />
            <span>{isRTL ? "تجارب حقيقية" : "Real experiences"}</span>
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-3">
            {isRTL ? "آراء أولياء الأمور والطلاب" : "What parents & students say"}
          </h2>
          <p className="text-lg text-emerald-800/80">
            {isRTL
              ? "ثقة تُبنى على متابعة قريبة ونتائج ملموسة في تلاوة الأبناء."
              : "Trust built on close follow‑up and visible improvement in recitation."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden border-emerald-100 bg-white/90">
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* صورة من الفيد (مثل زواد) */}
                <div className="relative w-full md:w-1/2">
                  <div className="aspect-square rounded-3xl overflow-hidden border border-emerald-100 shadow-md">
                    <img
                      src={`/images/feed${index + 1}.webp`}
                      alt="Testimonial screenshot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-emerald-800 text-yellow-300 shadow-lg">
                    {isRTL ? "من حسابات حقيقية" : "From real accounts"}
                  </Badge>
                </div>

                {/* نص التقييم */}
                <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                  <div
                    className={`flex items-center gap-2 mb-4 ${
                      isRTL ? "justify-end" : "justify-start"
                    }`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-500">
                      {isRTL ? "تقييم 5/5" : "Rated 5/5"}
                    </span>
                  </div>
                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-4">
                    {isRTL ? current.quoteAr : current.quoteEn}
                  </p>
                  <p className="font-semibold text-emerald-900">
                    {isRTL ? current.nameAr : current.nameEn}
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    {isRTL ? current.roleAr : current.roleEn}
                  </p>
                  <Button
                    variant="outline"
                    className="border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                    onClick={() => window.open(whatsappLink, "_blank")}
                  >
                    <MessageCircle className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {isRTL ? "اسأل عن تجربة غيرك" : "Ask about their experience"}
                  </Button>
                </div>
              </div>
            </CardContent>

            {/* الأسهم */}
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow p-3 border border-emerald-100 ${
                isRTL ? "right-3" : "left-3"
              }`}
            >
              {isRTL ? "›" : "‹"}
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow p-3 border border-emerald-100 ${
                isRTL ? "left-3" : "right-3"
              }`}
            >
              {isRTL ? "‹" : "›"}
            </button>
          </Card>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  i === index ? "bg-emerald-800 w-6" : "bg-emerald-200"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------- */
/* ---------- MAIN LANDING PAGE ---------- */
/* -------------------------------------- */

export default function UmmahAcademyLanding() {
  const [language, setLanguage] = useState<Language>("ar")
  const [currency, setCurrency] = useState<Currency>(currencyRates.USD)
  const [isLoading, setIsLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  const t = translations[language]
  const isRTL = language === "ar"

  const trackWhatsAppClick = () => {
    try {
      const fbqFn = (window as any)?.fbq
      if (typeof fbqFn === "function") {
        fbqFn("trackCustom", "WhatsAppClick")
      }
    } catch {
      // ignore
    }
  }

  // كشف الدولة والعملة واللغة (مثل الموقع الحالي)
  useEffect(() => {
    const detectLocationAndCurrency = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        })

        clearTimeout(timeoutId)

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const data: LocationData = await response.json()

        const countryToCurrency: Record<string, keyof typeof currencyRates> = {
          EG: "EGP",
          SA: "SAR",
          AE: "SAR",
          KW: "SAR",
          QA: "SAR",
          BH: "SAR",
        }

        const detectedCurrency = countryToCurrency[data.country_code] || "USD"
        if (currencyRates[detectedCurrency]) setCurrency(currencyRates[detectedCurrency])

        const arabicCountries = ["EG", "SA", "AE", "KW", "QA", "BH", "OM", "JO", "LB", "SY", "IQ", "YE", "PS", "MA", "TN", "DZ", "LY", "SD"]
        setLanguage(arabicCountries.includes(data.country_code) ? "ar" : "en")
      } catch (error) {
        console.error("Error detecting location:", error)
        setCurrency(currencyRates.USD)
        setLanguage("ar")
      } finally {
        setIsLoading(false)
      }
    }

    detectLocationAndCurrency()
  }, [])

  const formatPrice = (usdPrice: number) => {
    const convertedPrice = Math.round(usdPrice * currency.rate)
    return `${currency.symbol}${convertedPrice}`
  }

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"))

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
    setMenuOpen(false)
  }

  // رابط واتساب
  const waBase = "https://wa.me/201505532052?text="
  const waMsgAr = "أريد حجز حصة مجانية للتجربة من خلال أكاديمية أمة مسلمة"
  const waMsgEn = "I would like to book a free trial lesson with Muslim Ummah Academy"
  const whatsappLink = `${waBase}${encodeURIComponent(language === "ar" ? waMsgAr : waMsgEn)}`

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800 mx-auto mb-4"></div>
          <p className="text-emerald-800">جاري التحميل... Loading...</p>
        </div>
      </div>
    )
  }

  // بيانات الإحصائيات (تشبه "ليست مجرد أرقام" في زواد)
  const stats = [
    {
      icon: Users,
      value: 1200,
      labelAr: "طالب وطالبة",
      labelEn: "students",
      hintAr: "من أكثر من 40 دولة",
      hintEn: "from 40+ countries",
    },
    {
      icon: Award,
      value: 50,
      labelAr: "معلم ومعلمة",
      labelEn: "teachers",
      hintAr: "متخصصون ومجازون بالقراءات",
      hintEn: "qualified & ijāzah‑holding",
    },
    {
      icon: Clock,
      value: 5,
      labelAr: "سنوات خبرة أونلاين",
      labelEn: "years of experience",
      hintAr: "خبرة في التعليم عن بعد",
      hintEn: "in online Qur'an teaching",
    },
  ]

  // مميزات "لماذا نحن؟" مأخوذة من فكرة موقع زواد
  const heroFeatures = [
    {
      icon: Sparkles,
      titleAr: "الحصة الأولى مجانًا",
      titleEn: "First lesson is free",
      descAr: "جرّب التجربة قبل الاشتراك، بدون أي التزام أو رسوم.",
      descEn: "Try the experience before subscribing – no commitment, no fees.",
    },
    {
      icon: BookOpen,
      titleAr: "حصص فردية أو مجموعات صغيرة",
      titleEn: "1‑to‑1 or small groups",
      descAr: "جلسات مريحة تضمن وقتًا كافيًا لكل طالب أو طالبة.",
      descEn: "Comfortable sessions that give each student enough attention.",
    },
    {
      icon: Users,
      titleAr: "معلمات ومعلمون ملتزمون",
      titleEn: "Committed teachers",
      descAr: "معلمات ومعلمون ثقات، متابعة مستمرة مع ولي الأمر.",
      descEn: "Trustworthy teachers with continuous follow‑up with parents.",
    },
    {
      icon: CheckCircle,
      titleAr: "محتوى تفاعلي للأطفال",
      titleEn: "Interactive content for kids",
      descAr: "أوراق عمل وألعاب تعليمية تثبت الحفظ وتحبّب الطفل في القرآن.",
      descEn: "Worksheets and activities that make kids love Qur'an learning.",
    },
  ]

  // برامج الأكاديمية (مستوحاة من أقسام "مواد زُواد")
  const programs = [
    {
      icon: BookOpen,
      titleAr: "القرآن الكريم للأطفال",
      titleEn: "Qur’an for kids",
      levelAr: "من 5 إلى 14 سنة",
      levelEn: "Ages 5–14",
      descAr: "حفظ ومراجعة بأساليب ممتعة تناسب الأطفال، مع تركيز على الأخلاق والآداب.",
      descEn:
        "Memorisation and revision with enjoyable methods, plus focus on manners and values.",
      badgeAr: "الأكثر طلبًا",
      badgeEn: "Most popular",
    },
    {
      icon: BookOpen,
      titleAr: "القرآن لغير الناطقين بالعربية",
      titleEn: "Qur’an for non‑Arabic speakers",
      levelAr: "للكبار والصغار",
      levelEn: "For adults & kids",
      descAr: "تعليم الحروف، التلاوة الصحيحة، وبناء مفردات عربية أساسية.",
      descEn:
        "Learn letters, correct recitation and build essential Arabic vocabulary.",
      badgeAr: "مخصص للجاليات",
      badgeEn: "Ideal for diaspora",
    },
    {
      icon: Award,
      titleAr: "كورس التجويد للكبار",
      titleEn: "Tajweed for adults",
      levelAr: "مستوى تمهيدي ومتقدم",
      levelEn: "Introductory & advanced levels",
      descAr: "شرح مبسّط لقواعد التجويد مع تطبيق مباشر وتقييم منتظم.",
      descEn:
        "Clear explanation of tajweed rules with direct application and frequent feedback.",
      badgeAr: "للباحثين عن الإتقان",
      badgeEn: "For serious learners",
    },
    {
      icon: Users,
      titleAr: "التربية الإسلامية (للأطفال)",
      titleEn: "Islamic studies for kids",
      levelAr: "قيم وسلوك وأذكار",
      levelEn: "Values, manners & adhkār",
      descAr: "أساسيات العقيدة والعبادة والسلوك اليومي بلغة محببة للأطفال.",
      descEn:
        "Basic aqeedah, worship and daily manners taught in a child‑friendly way.",
      badgeAr: "بناء شخصية قرآنية",
      badgeEn: "Build a Qur’anic character",
    },
  ]

  // برامج خاصة (مسابقات – سوبر أمة – قدسنا)
  const specialTracks = [
    {
      titleAr: "مسابقات أمة",
      titleEn: "Ummah competitions",
      descAr:
        "مسابقات شهرية ورمضانية في الحفظ والمراجعة، مع لوحات شرف وجوائز تحفيزية.",
      descEn:
        "Monthly and Ramadan competitions in memorisation and revision, with leaderboards and prizes.",
      pointsAr: [
        "أسئلة تفاعلية تناسب العمر",
        "شهادات إلكترونية للفائزين",
        "تحفيز دائم على المراجعة",
      ],
      pointsEn: [
        "Age‑appropriate interactive questions",
        "Digital certificates for winners",
        "Constant motivation to revise",
      ],
    },
    {
      titleAr: "برنامج سوبر أمة",
      titleEn: "Super Ummah program",
      descAr:
        "مسار مكثف لطلاب لديهم أهداف كبيرة في الحفظ، بخطط أسبوعية دقيقة ومتابعة لصيقة.",
      descEn:
        "Intensive track for highly‑motivated students, with detailed weekly plans and close follow‑up.",
      pointsAr: [
        "مجموعات صغيرة جدًا",
        "خطة حفظ ومراجعة متوازنة",
        "تقارير شهرية لولي الأمر",
      ],
      pointsEn: [
        "Very small groups",
        "Balanced memorisation + revision plan",
        "Monthly reports for parents",
      ],
    },
    {
      titleAr: "برنامج قُدسنا",
      titleEn: "Our Quds program",
      descAr:
        "برنامج تعريفي عن فلسطين والقدس والمسجد الأقصى يزرع الانتماء ويعرّف الأطفال بالقضية.",
      descEn:
        "Program about Palestine, Al‑Quds and Al‑Aqsa that builds a deep sense of identity and awareness.",
      pointsAr: [
        "قصص وحكايات ملهمة",
        "أنشطة ورسومات عن القدس",
        "تعريف مبسّط بتاريخ القضية",
      ],
      pointsEn: [
        "Inspiring stories and narratives",
        "Activities and drawings about Al‑Quds",
        "Simplified introduction to the history of the cause",
      ],
    },
  ]

  // خطط الأسعار (قابلة للتعديل حسب رغبتك)
  const pricingPlans = [
    {
      key: "basic",
      name: t.basicPlan,
      usdPrice: 29,
      sessions: language === "ar" ? "4" : "4",
      highlight: false,
    },
    {
      key: "standard",
      name: t.standardPlan,
      usdPrice: 49,
      sessions: language === "ar" ? "8" : "8",
      highlight: true,
    },
    {
      key: "premium",
      name: t.premiumPlan,
      usdPrice: 79,
      sessions: language === "ar" ? "12" : "12",
      highlight: false,
    },
  ]

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-emerald-50 to-white ${
        isRTL ? "rtl" : "ltr"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* شريط علوي ثابت (هيدر) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-emerald-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* لوجو + اسم الأكاديمية */}
          <div className="flex items-center gap-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-PFiwOQmUO2XqQEdFh8evsswZet7bO5.png"
              alt="Ummah Muslimah Academy Logo"
              className="h-10 w-10 rounded-full border border-emerald-100 object-cover bg-white"
            />
            <div className="leading-tight">
              <div className="font-semibold text-emerald-900 text-sm md:text-base">
                {isRTL ? t.academyName : t.academyNameEn}
              </div>
              <p className="text-xs text-emerald-600 hidden sm:block">
                {isRTL
                  ? "تعليم القرآن والتجويد أونلاين"
                  : "Online Qur'an & Tajweed academy"}
              </p>
            </div>
          </div>

          {/* قائمة ديسكتوب */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-emerald-800 hover:text-emerald-600"
            >
              {t.menuAbout}
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium text-emerald-800 hover:text-emerald-600"
            >
              {t.menuServices}
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-sm font-medium text-emerald-800 hover:text-emerald-600"
            >
              {t.menuPricing}
            </button>
            <button
              onClick={() => scrollToSection("videos")}
              className="text-sm font-medium text-emerald-800 hover:text-emerald-600"
            >
              {t.menuVideos}
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-medium text-emerald-800 hover:text-emerald-600"
            >
              {t.menuTestimonials}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-emerald-800 hover:text-emerald-600"
            >
              {t.menuContact}
            </button>
          </nav>

          {/* أزرار اللغة + واتساب + منيو موبايل */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="border-emerald-200 text-emerald-800 bg-white/70 hover:bg-emerald-50"
            >
              <Globe className="h-4 w-4" />
              <span className={isRTL ? "mr-1" : "ml-1"}>
                {language === "ar" ? "English" : "العربية"}
              </span>
            </Button>

            <Button
              size="sm"
              className="bg-emerald-800 text-yellow-300 hover:bg-emerald-900 hidden sm:inline-flex"
              onClick={() => {
                trackWhatsAppClick()
                window.open(whatsappLink, "_blank")
              }}
            >
              <MessageCircle className="h-4 w-4" />
              <span className={isRTL ? "mr-1" : "ml-1"}>{t.subscribeTop}</span>
            </Button>

            {/* زر منيو موبايل */}
            <button
              className="md:hidden p-2 rounded-full border border-emerald-100 hover:bg-emerald-50"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={isRTL ? "القائمة" : "Menu"}
            >
              {menuOpen ? (
                <X className="h-5 w-5 text-emerald-800" />
              ) : (
                <Menu className="h-5 w-5 text-emerald-800" />
              )}
            </button>
          </div>
        </div>

        {/* قائمة موبايل منسدلة */}
        {menuOpen && (
          <div className="md:hidden border-t border-emerald-100 bg-white/95">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <button
                onClick={() => scrollToSection("about")}
                className="w-full text-emerald-800 hover:text-emerald-600 text-sm font-medium"
              >
                {t.menuAbout}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="w-full text-emerald-800 hover:text-emerald-600 text-sm font-medium"
              >
                {t.menuServices}
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="w-full text-emerald-800 hover:text-emerald-600 text-sm font-medium"
              >
                {t.menuPricing}
              </button>
              <button
                onClick={() => scrollToSection("videos")}
                className="w-full text-emerald-800 hover:text-emerald-600 text-sm font-medium"
              >
                {t.menuVideos}
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="w-full text-emerald-800 hover:text-emerald-600 text-sm font-medium"
              >
                {t.menuTestimonials}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full text-emerald-800 hover:text-emerald-600 text-sm font-medium"
              >
                {t.menuContact}
              </button>

              <Button
                size="sm"
                className="mt-2 bg-emerald-800 text-yellow-300 hover:bg-emerald-900 w-full"
                onClick={() => {
                  trackWhatsAppClick()
                  window.open(whatsappLink, "_blank")
                }}
              >
                <MessageCircle className="h-4 w-4" />
                <span className={isRTL ? "mr-1" : "ml-1"}>{t.subscribeTop}</span>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* محتوى الصفحة */}
      <main className="pt-24 md:pt-28">
        {/* هيرو – مستوحى من هيرو زواد لكن بالهوية الخضراء */}
        <section
          id="hero"
          className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <div className="grid gap-12 items-center md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              {/* نص الهيرو */}
              <div className={isRTL ? "md:pl-10" : "md:pr-10"}>
                <Badge className="mb-4 bg-yellow-400 text-emerald-900 border-none rounded-full px-4 py-1 text-xs md:text-sm">
                  {t.heroAyah}
                </Badge>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
                  {t.heroTagline}
                </h1>
                <p className="text-lg md:text-xl text-white/80 mb-6 max-w-xl">
                  {t.heroSubtitle}
                </p>

                {/* مميزات سريعة تحت الهيرو (مثل 4 نقاط في زواد) */}
                <div className="grid grid-cols-2 gap-3 mb-8 max-w-xl">
                  {heroFeatures.slice(0, 2).map((f, idx) => {
                    const Icon = f.icon
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-2xl bg-emerald-900/40 border border-emerald-700/60 px-3 py-2"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-950/60 border border-emerald-700">
                          <Icon className="h-4 w-4 text-yellow-300" />
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-50 font-medium">
                          {isRTL ? f.titleAr : f.titleEn}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* أزرار CTA */}
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    size="lg"
                    className="bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-semibold shadow-lg"
                    onClick={() => {
                      trackWhatsAppClick()
                      window.open(whatsappLink, "_blank")
                    }}
                  >
                    <MessageCircle className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t.heroPrimaryCta}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-emerald-200 bg-white/5 text-white hover:bg-white/10"
                    onClick={() => scrollToSection("videos")}
                  >
                    <PlayCircle className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t.heroSecondaryCta}
                  </Button>
                </div>

                {/* أرقام سريعة في الهيرو */}
                <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                  <div>
                    <p className="text-sm text-emerald-100">
                      {isRTL ? "طلاب نشطون" : "Active students"}
                    </p>
                    <p className="text-2xl font-bold text-yellow-300">
                      {isRTL ? (
                        <CountUp to={1200} suffix="+" />
                      ) : (
                        <CountUp to={1200} prefix="+" />
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-emerald-100">
                      {isRTL ? "دول حول العالم" : "Countries"}
                    </p>
                    <p className="text-2xl font-bold text-yellow-300">
                      {isRTL ? (
                        <CountUp to={40} suffix="+" />
                      ) : (
                        <CountUp to={40} prefix="+" />
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-emerald-100">
                      {isRTL ? "سنوات خبرة" : "Years online"}
                    </p>
                    <p className="text-2xl font-bold text-yellow-300">
                      <CountUp to={5} suffix={isRTL ? "+" : "+"} />
                    </p>
                  </div>
                </div>
              </div>

              {/* عمود الصورة / الكارت (بديل لصورة الهيرو في زواد) */}
              <div className="relative">
                <div className="relative rounded-3xl bg-emerald-900/40 border border-emerald-700/70 shadow-2xl p-4 md:p-5">
                  <div className="rounded-2xl overflow-hidden border border-emerald-700/70 mb-4">
                    <img
                      src="/images/hero-quran.avif"
                      alt="Child reading Qur'an"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs text-emerald-100">
                          {isRTL ? "رحلتك مع القرآن تبدأ من هنا" : "Your Qur'an journey starts here"}
                        </p>
                        <p className="font-semibold text-white">
                          {isRTL ? t.academyName : t.academyNameEn}
                        </p>
                      </div>
                      <Badge className="bg-yellow-400 text-emerald-900 border-none">
                        <Sparkles className="h-3 w-3 mx-1" />
                        {isRTL ? "حصة مجانية" : "Free trial"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs text-emerald-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-300" />
                        <span>{isRTL ? "متابعة أسبوعية" : "Weekly follow‑up"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-300" />
                        <span>{isRTL ? "أوقات مرنة" : "Flexible timings"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-yellow-300" />
                        <span>{isRTL ? "مجموعات صغيرة" : "Small groups"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-300" />
                        <span>{isRTL ? "شهادات معتمدة" : "Certificates"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* كارت صغير عائم مثل Pop-up */}
                <div className="absolute -bottom-6 -left-2 md:-left-6 bg-white/95 rounded-2xl shadow-lg border border-emerald-100 px-4 py-3 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-emerald-900">
                      {isRTL ? "حفظ – تجويد – تربية" : "Hifdh • Tajweed • Tarbiyah"}
                    </p>
                    <p className="text-emerald-600">
                      {isRTL ? "منهج متكامل للأسرة" : "A complete path for families"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* عن الأكاديمية + ليست مجرد أرقام */}
        <section id="about" className="py-20 bg-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
              {/* النص عن الرسالة */}
              <div>
                <Badge className="mb-3 bg-emerald-100 text-emerald-800 border-emerald-200">
                  {isRTL ? "عن الأكاديمية" : "About the academy"}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
                  {t.whyUsTitle}
                </h2>
                <p className="text-lg text-emerald-800/90 mb-6">{t.whyUsSubtitle}</p>
                <h3 className="text-xl font-semibold text-emerald-900 mb-2">{t.missionTitle}</h3>
                <p className="text-emerald-800/90 leading-relaxed mb-8">{t.missionText}</p>

                {/* 4 مميزات في كروت صغيرة */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {heroFeatures.map((f, idx) => {
                    const Icon = f.icon
                    return (
                      <Card
                        key={idx}
                        className="border-emerald-100 bg-emerald-50/60 hover:bg-emerald-50 transition-colors"
                      >
                        <CardContent className="flex items-start gap-3 p-4">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-emerald-100">
                            <Icon className="h-4 w-4 text-emerald-700" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-emerald-900">
                              {isRTL ? f.titleAr : f.titleEn}
                            </p>
                            <p className="text-xs text-emerald-700">
                              {isRTL ? f.descAr : f.descEn}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* الإحصائيات (ليست مجرد أرقام) */}
              <div>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-emerald-900 mb-1">
                    {t.statsTitle}
                  </h3>
                  <p className="text-sm text-emerald-700">{t.statsSubtitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {stats.map((s, idx) => {
                    const Icon = s.icon
                    return (
                      <Card
                        key={idx}
                        className="border-emerald-100 bg-gradient-to-b from-emerald-50 to-white"
                      >
                        <CardContent className="p-4 flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100">
                              <Icon className="h-4 w-4 text-emerald-800" />
                            </div>
                            <p className="text-xl font-extrabold text-emerald-900 leading-none">
                              {isRTL ? (
                                <CountUp to={s.value} suffix="+" />
                              ) : (
                                <CountUp to={s.value} prefix="+" />
                              )}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-emerald-900">
                            {isRTL ? s.labelAr : s.labelEn}
                          </p>
                          <p className="text-xs text-emerald-700">
                            {isRTL ? s.hintAr : s.hintEn}
                          </p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* مواد الأكاديمية (برامج) – مشابه لقسم مواد زواد */}
        <section id="services" className="py-20 bg-emerald-50/70 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Badge className="mb-3 bg-white text-emerald-800 border-emerald-200">
                <BookOpen className="h-4 w-4 mx-1" />
                <span>{isRTL ? "مسارات متدرجة" : "Structured tracks"}</span>
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-3">
                {t.servicesTitle}
              </h2>
              <p className="text-lg text-emerald-800/80">{t.servicesSubtitle}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {programs.map((p, idx) => {
                const Icon = p.icon
                return (
                  <Card
                    key={idx}
                    className="border-emerald-100 bg-white/90 hover:-translate-y-1 hover:shadow-lg transition-all"
                  >
                    <CardHeader className="flex flex-row items-center justify-between gap-3 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                          <Icon className="h-5 w-5 text-emerald-800" />
                        </div>
                        <div>
                          <CardTitle className="text-base md:text-lg text-emerald-900">
                            {isRTL ? p.titleAr : p.titleEn}
                          </CardTitle>
                          <p className="text-xs text-emerald-700">
                            {isRTL ? p.levelAr : p.levelEn}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-400 text-emerald-900 border-none">
                        {isRTL ? p.badgeAr : p.badgeEn}
                      </Badge>
                    </CardHeader>
                    <CardContent className="pt-0 text-sm text-emerald-800 leading-relaxed">
                      {isRTL ? p.descAr : p.descEn}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* برامج ومسارات خاصة – مسابقات + سوبر أمة + قدسنا */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="mb-3 bg-emerald-100 text-emerald-800 border-emerald-200">
                <Sparkles className="h-4 w-4 mx-1" />
                <span>{isRTL ? "أكثر من مجرد دروس" : "More than just classes"}</span>
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-3">
                {t.tracksTitle}
              </h2>
              <p className="text-lg text-emerald-800/80">{t.tracksSubtitle}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {specialTracks.map((track, idx) => (
                <Card
                  key={idx}
                  className="border-emerald-100 bg-emerald-50/60 hover:bg-emerald-50 transition-colors flex flex-col"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-emerald-900">
                      {isRTL ? track.titleAr : track.titleEn}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 flex-1 flex flex-col gap-3 text-sm text-emerald-800">
                    <p>{isRTL ? track.descAr : track.descEn}</p>
                    <ul className="space-y-1 text-xs">
                      {(isRTL ? track.pointsAr : track.pointsEn).map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-3.5 w-3.5 text-emerald-700" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* قسم الفيديوهات (تم تنفيذه أعلاه) */}
        <VideosSection language={language} />

        {/* قسم الأسعار – شبيه بقسم التسعير في لاندينج احترافية */}
        <section id="pricing" className="py-20 bg-emerald-50/70 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <Badge className="mb-3 bg-white text-emerald-800 border-emerald-200">
                <Clock className="h-4 w-4 mx-1" />
                <span>{isRTL ? "اختر عدد الحصص" : "Pick your weekly sessions"}</span>
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-3">
                {t.pricingTitle}
              </h2>
              <p className="text-lg text-emerald-800/80 mb-2">{t.pricingSubtitle}</p>
              <p className="text-xs text-emerald-700">
                {isRTL
                  ? `الأسعار تقريبية بناءً على عملتك الحالية (${currency.code}).`
                  : `Prices are approximate in your local currency (${currency.code}).`}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.key}
                  className={`flex flex-col border-emerald-100 bg-white/90 ${
                    plan.highlight ? "ring-2 ring-yellow-400 shadow-lg scale-[1.02]" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <CardTitle className="text-xl text-emerald-900">
                        {plan.name}
                      </CardTitle>
                      {plan.highlight && (
                        <Badge className="bg-yellow-400 text-emerald-900 border-none text-xs">
                          {t.mostPopular}
                        </Badge>
                      )}
                    </div>
                    <p className="text-2xl font-extrabold text-emerald-900">
                      {formatPrice(plan.usdPrice)}
                    </p>
                    <p className="text-xs text-emerald-700">
                      {plan.sessions} {t.sessionsPerMonth}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0 flex-1 flex flex-col gap-3 text-xs text-emerald-800">
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 text-emerald-700" />
                        <span>
                          {isRTL
                            ? "حصص مباشرة عبر زوم مع معلمات/معلمين مختصين."
                            : "Live Zoom sessions with qualified teachers."}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 text-emerald-700" />
                        <span>
                          {isRTL
                            ? "متابعة دورية وتقارير دورية بالمستوى."
                            : "Regular follow‑up and progress reports."}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 text-emerald-700" />
                        <span>
                          {isRTL
                            ? "إمكانية تعديل عدد الحصص عند الحاجة."
                            : "Flexibility to adjust sessions when needed."}
                        </span>
                      </li>
                    </ul>
                    <Button
                      className="mt-3 bg-emerald-800 text-yellow-300 hover:bg-emerald-900"
                      onClick={() => {
                        trackWhatsAppClick()
                        window.open(whatsappLink, "_blank")
                      }}
                    >
                      <MessageCircle className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                      {t.subscribeNow}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* التقييمات */}
        <TestimonialsSection language={language} whatsappLink={whatsappLink} />

        {/* قسم CTA النهائي مثل بنر قوي */}
        <section className="py-20 bg-gradient-to-r from-emerald-900 to-emerald-800">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t.ctaTitle}
              </h2>
              <p className="text-lg text-white/85 mb-8">{t.ctaSubtitle}</p>
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-semibold shadow-lg"
                onClick={() => {
                  trackWhatsAppClick()
                  window.open(whatsappLink, "_blank")
                }}
              >
                <MessageCircle className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t.heroPrimaryCta}
              </Button>
            </div>
          </div>
        </section>

        {/* قسم تواصل معنا (Contact) */}
        <section id="contact" className="py-16 bg-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-2">
                {t.contactTitle}
              </h2>
              <p className="text-emerald-800/80">{t.contactSubtitle}</p>
            </div>

            <div className="max-w-xl mx-auto grid gap-6 md:grid-cols-2">
              <Card className="border-emerald-100 bg-emerald-50/60">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <MessageCircle className="h-8 w-8 text-emerald-800" />
                  <p className="font-semibold text-emerald-900">
                    {isRTL ? "تواصل فوري عبر واتساب" : "Instant WhatsApp support"}
                  </p>
                  <p className="text-sm text-emerald-700">
                    {isRTL
                      ? "استفسارات – حجز – مساعدة في اختيار الخطة المناسبة."
                      : "Ask questions, book a slot or get help picking the right plan."}
                  </p>
                  <Button
                    className="mt-1 bg-emerald-800 text-yellow-300 hover:bg-emerald-900"
                    onClick={() => {
                      trackWhatsAppClick()
                      window.open(whatsappLink, "_blank")
                    }}
                  >
                    <MessageCircle className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {isRTL ? "ابدأ المحادثة الآن" : "Start chat now"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-emerald-100 bg-emerald-50/40">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <Users className="h-8 w-8 text-emerald-800" />
                  <p className="font-semibold text-emerald-900">
                    {isRTL ? "تابعنا على السوشيال" : "Follow us on social"}
                  </p>
                  <p className="text-sm text-emerald-700">
                    {isRTL
                      ? "شاهد مزيدًا من المقاطع والتقييمات اليومية من داخل الأكاديمية."
                      : "See more clips, feedback and daily moments from inside the academy."}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <a
                      href="https://www.facebook.com/Ummah.Muslimah.academy"
                      target="_blank"
                      rel="noreferrer"
                      className="h-9 w-9 rounded-full bg-emerald-800 text-yellow-300 flex items-center justify-center hover:bg-emerald-900"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.instagram.com/muslim.ummah.academy/"
                      target="_blank"
                      rel="noreferrer"
                      className="h-9 w-9 rounded-full bg-emerald-800 text-yellow-300 flex items-center justify-center hover:bg-emerald-900"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* فوتر */}
      <footer className="border-t border-emerald-100 bg-emerald-900 text-white py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm">
          <p>{t.footerRights}</p>
          <div className="flex items-center gap-4 text-emerald-100/80">
            <span>{isRTL ? "سياسة الخصوصية" : "Privacy policy"}</span>
            <span>•</span>
            <span>{isRTL ? "شروط الاستخدام" : "Terms of use"}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
