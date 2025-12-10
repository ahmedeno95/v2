"use client"

import {
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

type Language = "ar" | "en"

interface Currency {
  code: string
  symbol: string
  rate: number
}

interface LocationData {
  country_code: string
}

/* ---------- العملات (أسعار تقريبية) ---------- */
const currencyRates: Record<string, Currency> = {
  EGP: { code: "EGP", symbol: "ج.م", rate: 48.4475 },
  SAR: { code: "SAR", symbol: "ر.س", rate: 3.7519 },
  EUR: { code: "EUR", symbol: "€", rate: 0.866 },
  GBP: { code: "GBP", symbol: "£", rate: 0.752 },
  USD: { code: "USD", symbol: "$", rate: 1 },
}

/* ---------- النصوص (ترجمة عربية / إنجليزية) ---------- */
const translations: Record<
  Language,
  {
    academyName: string
    academyNameEn: string

    menuAbout: string
    menuPrograms: string
    menuPricing: string
    menuVideos: string
    menuTestimonials: string
    menuContact: string
    subscribeTop: string

    heroAyah: string
    heroTagline: string
    heroSubtitle: string
    heroPrimaryCta: string
    heroSecondaryCta: string

    whyUsTitle: string
    whyUsSubtitle: string
    missionTitle: string
    missionText: string
    statsTitle: string
    statsSubtitle: string

    programsTitle: string
    programsSubtitle: string

    tracksTitle: string
    tracksSubtitle: string
    qudsTitle: string
    qudsText: string

    videosTitle: string
    videosSubtitle: string

    testimonialsTitle: string
    testimonialsSubtitle: string

    pricingTitle: string
    pricingSubtitle: string
    basicPlan: string
    standardPlan: string
    premiumPlan: string
    sessionsPerMonth: string
    mostPopular: string
    subscribeNow: string

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
    menuPrograms: "مواد الأكاديمية",
    menuPricing: "الأسعار",
    menuVideos: "الفيديوهات",
    menuTestimonials: "آراء العملاء",
    menuContact: "تواصل معنا",
    subscribeTop: "احجز حصتك المجانية",

    heroAyah: "خَيْرُكُم مَن تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    heroTagline: "منصة متخصصة لتعليم القرآن والتجويد أونلاين",
    heroSubtitle:
      "حصص مباشرة، معلمات ومعلمون مجازون، ومتابعة حقيقية لكل طالب وطالبة في أجواء مريحة من البيت.",
    heroPrimaryCta: "احجز حصة مجانية الآن",
    heroSecondaryCta: "شاهد محتوى الأكاديمية",

    whyUsTitle: "لماذا أكاديمية أمة مسلمة؟",
    whyUsSubtitle:
      "نقدّم تجربة قرآنية متكاملة: حفظ، تجويد، تربية إيمانية، وارتباط فعلي بكتاب الله وقضايا الأمة.",
    missionTitle: "رسالتنا",
    missionText:
      "نغرس في قلوب أبنائنا حبّ القرآن والاعتزاز بالهوية الإسلامية، من خلال حصص تفاعلية، معلمين ثقات، ومتابعة مستمرة مع أولياء الأمور.",
    statsTitle: "ليست مجرد أرقام",
    statsSubtitle:
      "وراء كل رقم طالب/ـة وأُسرة تغيّر علاقتهم بالقرآن للأفضل ولله الحمد.",

    programsTitle: "مواد الأكاديمية",
    programsSubtitle:
      "مسارات مرنة للكبار والأطفال، لغير الناطقين بالعربية، ولمن يرغبون في الإتقان والحفظ طويل المدى.",

    tracksTitle: "برامج ومسارات مميّزة",
    tracksSubtitle:
      "مسابقات، مسار مكثّف، وبرنامج قُدسنا.. لتكون رحلة القرآن حيّة وفاعلة في حياة الطفل.",
    qudsTitle: "برنامج قُدسنا",
    qudsText:
      "برنامج قيم يحكي للأطفال عن فلسطين والقدس والمسجد الأقصى بقصص وأنشطة تربوية تعزّز الانتماء للقضية.",

    videosTitle: "من داخل الأكاديمية",
    videosSubtitle:
      "لقطات من حصص حقيقية توضّح طريقة الشرح، الجو العام، والتعامل التربوي مع الطلاب.",

    testimonialsTitle: "ماذا يقول أولياء الأمور والطلاب؟",
    testimonialsSubtitle:
      "ثقة تُبنى على نتائج ملموسة في التلاوة والسلوك وانضباط الأبناء.",

    pricingTitle: "خطط اشتراك مرنة",
    pricingSubtitle:
      "اختر عدد الحصص الأسبوعية بما يناسب وقتك وميزانيتك، مع إمكانية تعديل الخطة لاحقًا.",
    basicPlan: "خطة البداية",
    standardPlan: "الخطة المتقدمة",
    premiumPlan: "خطة النخبة",
    sessionsPerMonth: "حصص شهريًا",
    mostPopular: "الأكثر اختيارًا",
    subscribeNow: "اشترك الآن",

    ctaTitle: "جاهز لتبدأ أنت وأبناؤك رحلة ثابتة مع القرآن؟",
    ctaSubtitle:
      "راسلنا على واتساب لفهم احتياجك، واختيار المعلمة/المعلم والخطة الأنسب لأسرتك.",
    contactTitle: "تواصل مباشر مع فريق الأكاديمية",
    contactSubtitle:
      "نسعد بالرد على استفساراتك بالعربية أو الإنجليزية عبر واتساب والسوشيال.",
    footerRights: "جميع الحقوق محفوظة © أكاديمية أمة مسلمة",
  },

  en: {
    academyName: "Muslim Ummah Academy",
    academyNameEn: "أكاديمية أمة مسلمة",

    menuAbout: "About",
    menuPrograms: "Programs",
    menuPricing: "Pricing",
    menuVideos: "Videos",
    menuTestimonials: "Testimonials",
    menuContact: "Contact",
    subscribeTop: "Book a free lesson",

    heroAyah: '“The best of you are those who learn the Qur\'an and teach it.”',
    heroTagline: "Qur'an & Tajweed online for the whole family",
    heroSubtitle:
      "Live one‑to‑one and small‑group sessions with trusted teachers, tailored for children and adults around the world.",
    heroPrimaryCta: "Book your free lesson",
    heroSecondaryCta: "Watch academy content",

    whyUsTitle: "Why Muslim Ummah Academy?",
    whyUsSubtitle:
      "We combine Qur’an memorisation, tajweed and Islamic character‑building in a warm, structured learning experience.",
    missionTitle: "Our mission",
    missionText:
      "To nurture a generation that loves the Qur’an and feels connected to the Ummah through gentle, consistent guidance and inspiring teachers.",
    statsTitle: "More than just numbers",
    statsSubtitle:
      "Each number is a real family whose Qur’an journey has changed, alhamdulillah.",

    programsTitle: "Academy programs",
    programsSubtitle:
      "Flexible tracks for children, adults and non‑Arabic speakers, from basics to long‑term hifdh.",

    tracksTitle: "Special tracks & experiences",
    tracksSubtitle:
      "Competitions, an intensive Super Ummah track, and our Quds program to connect hearts with Palestine.",
    qudsTitle: "Our Quds program",
    qudsText:
      "A values‑based program introducing children to Palestine, Al‑Quds and Al‑Aqsa through stories and activities.",

    videosTitle: "Inside the academy",
    videosSubtitle:
      "Short clips from real sessions so you can see how our teachers interact with students.",

    testimonialsTitle: "What parents & students say",
    testimonialsSubtitle:
      "Trust built on consistent follow‑up, gentle teachers and clear progress.",

    pricingTitle: "Flexible plans",
    pricingSubtitle:
      "Choose your weekly sessions and adjust later as your schedule changes.",
    basicPlan: "Starter plan",
    standardPlan: "Focused plan",
    premiumPlan: "Elite plan",
    sessionsPerMonth: "sessions / month",
    mostPopular: "Most popular",
    subscribeNow: "Subscribe now",

    ctaTitle: "Ready to make your Qur'an journey more consistent?",
    ctaSubtitle:
      "Message us on WhatsApp and our team will help you design the best plan for you or your children.",
    contactTitle: "Contact our team",
    contactSubtitle:
      "We’re happy to assist in Arabic and English via WhatsApp and social media.",
    footerRights: "All rights reserved © Muslim Ummah Academy",
  },
}

/* ---------- عدّاد للأرقام (مثل زواد) ---------- */
function CountUp({
  to,
  duration = 1200,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const [val, setVal] = useState(0)
  const ref = useRef<any>(null)
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
    typeof document !== "undefined" && document.documentElement.dir === "rtl"
      ? "ar-EG"
      : "en-US"

  const formatted = new Intl.NumberFormat(locale).format(val)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

/* ---------- كومبوننت بسيط للأنيميشن عند الظهور ---------- */
function AnimatedSection({
  id,
  className = "",
  children,
  delay = 0,
}: {
  id?: string
  className?: string
  children: ReactNode
  delay?: number
}) {
  const ref = useRef<any>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={`section-fade ${
        visible ? "section-fade-visible" : ""
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  )
}

/* ---------- قسم الفيديوهات (Reels-style) ---------- */
function VideosSection({ language }: { language: Language }) {
  const videoIds = ["nAMImHfDMmI", "FbNOMuPZK2I", "lTQiLyOL5kU", "nmQrYjJlBmg"]
  const [index, setIndex] = useState(0)
  const isRTL = language === "ar"
  const t = translations[language]

  const src = `https://www.youtube-nocookie.com/embed/${videoIds[index]}?rel=0&modestbranding=1&playsinline=1`

  const prev = () =>
    setIndex((i) => (i - 1 + videoIds.length) % videoIds.length)
  const next = () => setIndex((i) => (i + 1) % videoIds.length)

  return (
    <AnimatedSection
      id="videos"
      className="py-20 bg-[#f9f2f6] scroll-mt-28"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <Badge className="mb-3 bg-[#f7d66e]/20 text-[#f7d66e] border-[#f7d66e]/40">
            <PlayCircle className="h-4 w-4 mx-1" />
            <span>
              {isRTL ? "لقطات من حصص حقيقية" : "Real session snippets"}
            </span>
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#3c0020] mb-3 tracking-tight">
            {t.videosTitle}
          </h2>
          <p className="text-lg text-[#5b1734]/80">
            {t.videosSubtitle}
          </p>
        </div>

        <div className="max-w-[360px] sm:max-w-[380px] md:max-w-[420px] mx-auto">
          <div className="relative">
            <div className="rounded-[32px] overflow-hidden soft-shadow bg-black border border-[#f7d66e]/30 hero-float">
              <div className="aspect-[9/16]">
                <iframe
                  key={videoIds[index]}
                  src={src}
                  title="Ummah Academy video"
                  className="w-full h-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <button
              onClick={prev}
              aria-label="Previous video"
              className={`video-nav-btn ${
                isRTL ? "right-2" : "left-2"
              }`}
            >
              {isRTL ? "›" : "‹"}
            </button>
            <button
              onClick={next}
              aria-label="Next video"
              className={`video-nav-btn ${
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
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "bg-[#f7d66e] w-6"
                    : "bg-[#e3bfd6] w-2.5"
                }`}
                aria-label={`Go to video ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

/* ---------- قسم التقييمات ---------- */
function TestimonialsSection({
  language,
  whatsappLink,
}: {
  language: Language
  whatsappLink: string
}) {
  const isRTL = language === "ar"
  const t = translations[language]

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
  const current = testimonials[index]

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  return (
    <AnimatedSection
      id="testimonials"
      className="py-20 bg-[#fdf7f0] scroll-mt-28"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <Badge className="mb-3 bg-[#f7d66e]/20 text-[#f7d66e] border-[#f7d66e]/40">
            <Star className="h-4 w-4 mx-1" />
            <span>{isRTL ? "تجارب حقيقية" : "Real experiences"}</span>
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#3c0020] mb-3 tracking-tight">
            {t.testimonialsTitle}
          </h2>
          <p className="text-lg text-[#5b1734]/80">
            {t.testimonialsSubtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden border-[#f1c5e0]/60 bg-white/95 soft-shadow">
            <CardContent className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
              {/* صورة طفل بالمصحف */}
              <div className="relative w-full md:w-1/2">
                <div className="overflow-hidden rounded-[28px] border border-[#f1c5e0]/70 soft-shadow">
                  <img
                    src="/images/boy-with-quran.webp"
                    alt="Happy student holding the Qur'an"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#8f1238] text-[#f7d66e] shadow-lg border-none text-xs">
                  {isRTL ? "من قصص نجاح طلابنا" : "From our success stories"}
                </Badge>
              </div>

              {/* نص التقييم */}
              <div
                className={`flex-1 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`flex items-center gap-2 mb-4 ${
                    isRTL ? "justify-end" : "justify-start"
                  }`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-[#f7d66e] fill-[#f7d66e]"
                    />
                  ))}
                  <span className="text-xs text-gray-500">
                    {isRTL ? "تقييم 5/5" : "Rated 5/5"}
                  </span>
                </div>

                <p className="text-lg md:text-xl text-[#3c0020] leading-relaxed mb-4">
                  {isRTL ? current.quoteAr : current.quoteEn}
                </p>
                <p className="font-semibold text-[#8f1238]">
                  {isRTL ? current.nameAr : current.nameEn}
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  {isRTL ? current.roleAr : current.roleEn}
                </p>

                <Button
                  variant="outline"
                  className="border-[#f1c5e0] text-[#8f1238] hover:bg-[#fdf0f7]"
                  onClick={() => window.open(whatsappLink, "_blank")}
                >
                  <MessageCircle
                    className={`h-4 w-4 ${
                      isRTL ? "ml-2" : "mr-2"
                    }`}
                  />
                  {isRTL
                    ? "اسأل عن تجربة غيرك"
                    : "Ask about their experience"}
                </Button>
              </div>
            </CardContent>

            {/* أسهم السلايدر */}
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className={`slider-arrow ${
                isRTL ? "right-3" : "left-3"
              }`}
            >
              {isRTL ? "›" : "‹"}
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className={`slider-arrow ${
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
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "bg-[#8f1238] w-6"
                    : "bg-[#e5c9da] w-2.5"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

/* ============================= */
/* ======= الصفحة الرئيسية ====== */
/* ============================= */

export default function UmmahAcademyLanding() {
  const [language, setLanguage] = useState<Language>("ar")
  const [currency, setCurrency] = useState<Currency>(currencyRates.USD)
  const [isLoading, setIsLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)

  const t = translations[language]
  const isRTL = language === "ar"

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
      labelEn: "years online",
      hintAr: "خبرة في التعليم عن بعد",
      hintEn: "experience in online teaching",
    },
  ]

  const heroFeatures = [
    {
      icon: Sparkles,
      titleAr: "الحصة الأولى مجانًا",
      titleEn: "First lesson is free",
      descAr:
        "جرّب التجربة قبل الاشتراك، بدون أي التزام أو رسوم.",
      descEn:
        "Try the experience before subscribing, with no commitment or fees.",
    },
    {
      icon: Users,
      titleAr: "حصص فردية ومجموعات صغيرة",
      titleEn: "1‑to‑1 & small groups",
      descAr:
        "إتاحة وقت كافٍ لكل طالب مع متابعة شخصية.",
      descEn:
        "Plenty of time for each student with personal follow‑up.",
    },
    {
      icon: BookOpen,
      titleAr: "محتوى تفاعلي للأطفال",
      titleEn: "Interactive content for kids",
      descAr:
        "ألعاب تعليمية وأوراق عمل تجعل الحفظ ممتعًا.",
      descEn:
        "Games and worksheets that make memorisation enjoyable.",
    },
    {
      icon: Award,
      titleAr: "تقارير دورية لولي الأمر",
      titleEn: "Regular parent reports",
      descAr:
        "متابعة شهرية واضحة للمستوى والالتزام.",
      descEn:
        "Clear monthly reports on progress and commitment.",
    },
  ]

  const programs = [
    {
      icon: BookOpen,
      titleAr: "القرآن للأطفال",
      titleEn: "Qur’an for kids",
      levelAr: "من 5 إلى 14 سنة",
      levelEn: "Ages 5–14",
      descAr:
        "حفظ، تلاوة، آداب، وقصص تربوية في جو مرح من البيت.",
      descEn:
        "Memorisation, recitation, manners and stories in a joyful setting.",
      highlight: true,
    },
    {
      icon: BookOpen,
      titleAr: "القرآن لغير الناطقين بالعربية",
      titleEn: "Qur’an for non‑Arabic speakers",
      levelAr: "مستويات متعددة للكبار والصغار",
      levelEn: "Levels for adults & kids",
      descAr:
        "تعليم الحروف، المخارج الصحيحة، وبناء مفردات عربية أساسية.",
      descEn:
        "Learn letters, correct pronunciation and essential Arabic vocabulary.",
      highlight: false,
    },
    {
      icon: Award,
      titleAr: "تجويد للكبار",
      titleEn: "Tajweed for adults",
      levelAr: "من التمهيدي حتى الإتقان",
      levelEn: "From basics to mastery",
      descAr:
        "شرح مبسّط مع تطبيق عملي وتقييمات صوتية منتظمة.",
      descEn:
        "Clear explanations with practical application and regular feedback.",
      highlight: false,
    },
    {
      icon: Users,
      titleAr: "قيم وتربية إسلامية",
      titleEn: "Islamic values & tarbiyah",
      levelAr: "للأطفال والمراهقين",
      levelEn: "For kids & teens",
      descAr:
        "سلوكيات يومية، أذكار، وقصص نبوية تبني شخصية قرآنية.",
      descEn:
        "Daily manners, adhkār and prophetic stories to build a Qur’anic character.",
      highlight: false,
    },
  ]

  const specialTracks = [
    {
      titleAr: "مسابقات أمة",
      titleEn: "Ummah competitions",
      descAr:
        "مسابقات شهرية ورمضانية في الحفظ والمراجعة مع لوحات شرف وجوائز تحفيزية.",
      descEn:
        "Monthly and Ramadan competitions with leaderboards and motivating prizes.",
      pointsAr: [
        "تشجيع دائم على المراجعة",
        "جوائز وشهادات مميزة",
        "مناسب لمختلف الأعمار",
      ],
      pointsEn: [
        "Continuous revision motivation",
        "Special prizes & certificates",
        "Suitable for various ages",
      ],
    },
    {
      titleAr: "برنامج سوبر أمة",
      titleEn: "Super Ummah program",
      descAr:
        "مسار مكثّف لطلاب لديهم أهداف كبيرة في الحفظ مع مجموعات صغيرة وخطط أسبوعية دقيقة.",
      descEn:
        "Intensive track for highly‑motivated students with small groups and detailed weekly plans.",
      pointsAr: [
        "مجموعات محدودة جدًا",
        "خطة متوازنة بين الحفظ والمراجعة",
        "تقارير لصيقة لولي الأمر",
      ],
      pointsEn: [
        "Very small groups",
        "Balanced hifdh + revision plans",
        "Close reporting for parents",
      ],
    },
    {
      titleAr: translations.ar.qudsTitle,
      titleEn: translations.en.qudsTitle,
      descAr: translations.ar.qudsText,
      descEn: translations.en.qudsText,
      pointsAr: [
        "قصص عن فلسطين والقدس والأقصى",
        "أنشطة ورسومات للأطفال",
        "تعزيز الانتماء لقضايا الأمة",
      ],
      pointsEn: [
        "Stories about Palestine and Al‑Quds",
        "Activities and crafts for kids",
        "Strengthening belonging to the Ummah",
      ],
    },
  ]

  const pricingPlans = [
    {
      key: "basic",
      usdPrice: 29,
      sessions: 4,
      name: t.basicPlan,
      highlight: false,
    },
    {
      key: "standard",
      usdPrice: 49,
      sessions: 8,
      name: t.standardPlan,
      highlight: true,
    },
    {
      key: "premium",
      usdPrice: 79,
      sessions: 12,
      name: t.premiumPlan,
      highlight: false,
    },
  ]

  /* ---------- تتبع زر واتساب (لو عندك fbq) ---------- */
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

  /* ---------- كشف الدولة / العملة / اللغة ---------- */
  useEffect(() => {
    const detectLocationAndCurrency = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const res = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        })

        clearTimeout(timeoutId)

        if (!res.ok) throw new Error("Network error")

        const data: LocationData = await res.json()

        const countryToCurrency: Record<string, keyof typeof currencyRates> = {
          EG: "EGP",
          SA: "SAR",
          AE: "SAR",
          KW: "SAR",
          QA: "SAR",
          BH: "SAR",
        }

        const detectedCurrency = countryToCurrency[data.country_code] || "USD"
        if (currencyRates[detectedCurrency]) {
          setCurrency(currencyRates[detectedCurrency])
        }

        const arabicCountries = [
          "EG",
          "SA",
          "AE",
          "KW",
          "QA",
          "BH",
          "OM",
          "JO",
          "LB",
          "SY",
          "IQ",
          "YE",
          "PS",
          "MA",
          "TN",
          "DZ",
          "LY",
          "SD",
        ]

        setLanguage(
          arabicCountries.includes(data.country_code) ? "ar" : "en"
        )
      } catch {
        setCurrency(currencyRates.USD)
        setLanguage("ar")
      } finally {
        setIsLoading(false)
      }
    }

    detectLocationAndCurrency()
  }, [])

  /* ---------- أنيميشن دخول الهيرو ---------- */
  useEffect(() => {
    const timeout = setTimeout(() => setPageLoaded(true), 80)
    return () => clearTimeout(timeout)
  }, [])

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"))

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  const formatPrice = (usdPrice: number) => {
    const converted = Math.round(usdPrice * currency.rate)
    return `${currency.symbol}${converted}`
  }

  const waBase = "https://wa.me/201505532052?text="
  const waMsgAr =
    "أريد حجز حصة تجريبية مجانية مع أكاديمية أمة مسلمة"
  const waMsgEn =
    "I would like to book a free trial lesson with Muslim Ummah Academy"
  const whatsappLink = `${waBase}${encodeURIComponent(
    language === "ar" ? waMsgAr : waMsgEn
  )}`

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf3f8]">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-2 border-[#f7d66e] border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-[#8f1238] text-sm">
            {isRTL ? "جاري تجهيز الأكاديمية..." : "Loading the academy..."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className={`min-h-screen bg-[#fff6f2] text-[#3c0020] ${
          isRTL ? "rtl" : "ltr"
        }`}
      >
        {/* الهيدر – ثابت مثل زواد */}
        <header className="fixed top-0 left-0 right-0 z-50">
          <div className="container mx-auto px-4">
            <div className="mt-3 bg-[#8f1238] text-white rounded-[999px] shadow-xl flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 border border-[#f7d66e]/30 header-blur">
              {/* لوجو + اسم الأكاديمية */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-[#f7d66e]/40 soft-shadow-sm">
                  <span className="text-xs font-extrabold tracking-[0.14em] text-[#8f1238]">
                    أمة
                  </span>
                </div>
                <div className="leading-tight hidden sm:block">
                  <p className="font-semibold text-xs sm:text-sm">
                    {isRTL ? t.academyName : t.academyNameEn}
                  </p>
                  <p className="text-[10px] text-[#fbeaf6]">
                    {isRTL
                      ? "تعليم القرآن والتجويد أونلاين"
                      : "Online Qur'an & Tajweed academy"}
                  </p>
                </div>
              </div>

              {/* القائمة – ديسكتوب */}
              <nav className="hidden md:flex items-center gap-5 text-xs font-medium">
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-[#f7d66e] transition-colors"
                >
                  {t.menuAbout}
                </button>
                <button
                  onClick={() => scrollToSection("programs")}
                  className="hover:text-[#f7d66e] transition-colors"
                >
                  {t.menuPrograms}
                </button>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="hover:text-[#f7d66e] transition-colors"
                >
                  {t.menuPricing}
                </button>
                <button
                  onClick={() => scrollToSection("videos")}
                  className="hover:text-[#f7d66e] transition-colors"
                >
                  {t.menuVideos}
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="hover:text-[#f7d66e] transition-colors"
                >
                  {t.menuTestimonials}
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-[#f7d66e] transition-colors"
                >
                  {t.menuContact}
                </button>
              </nav>

              {/* يمين الهيدر */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="border-[#f7d66e]/40 text-white bg-white/10 hover:bg-white/20 text-[11px] h-8 px-2"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span className={isRTL ? "mr-1" : "ml-1"}>
                    {language === "ar" ? "English" : "العربية"}
                  </span>
                </Button>

                <Button
                  size="sm"
                  className="hidden sm:inline-flex bg-[#f7d66e] text-[#3c0020] hover:bg-[#ffe086] text-[11px] h-8 px-3 soft-shadow-sm"
                  onClick={() => {
                    trackWhatsAppClick()
                    window.open(whatsappLink, "_blank")
                  }}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span className={isRTL ? "mr-1" : "ml-1"}>
                    {t.subscribeTop}
                  </span>
                </Button>

                {/* منيو موبايل */}
                <button
                  className="md:hidden h-8 w-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-label={isRTL ? "القائمة" : "Menu"}
                >
                  {menuOpen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Menu className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* قائمة موبايل منسدلة */}
            {menuOpen && (
              <div className="mt-3 mb-2 rounded-3xl bg-[#8f1238] text-white shadow-lg border border-[#f7d66e]/30 md:hidden">
                <div className="px-5 py-3 flex flex-col gap-2 text-sm">
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-left py-1 hover:text-[#f7d66e]"
                  >
                    {t.menuAbout}
                  </button>
                  <button
                    onClick={() => scrollToSection("programs")}
                    className="text-left py-1 hover:text-[#f7d66e]"
                  >
                    {t.menuPrograms}
                  </button>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="text-left py-1 hover:text-[#f7d66e]"
                  >
                    {t.menuPricing}
                  </button>
                  <button
                    onClick={() => scrollToSection("videos")}
                    className="text-left py-1 hover:text-[#f7d66e]"
                  >
                    {t.menuVideos}
                  </button>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="text-left py-1 hover:text-[#f7d66e]"
                  >
                    {t.menuTestimonials}
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-left py-1 hover:text-[#f7d66e]"
                  >
                    {t.menuContact}
                  </button>

                  <Button
                    className="mt-2 bg-[#f7d66e] text-[#3c0020] hover:bg-[#ffe086]"
                    onClick={() => {
                      trackWhatsAppClick()
                      window.open(whatsappLink, "_blank")
                    }}
                  >
                    <MessageCircle
                      className={`h-4 w-4 ${
                        isRTL ? "ml-2" : "mr-2"
                      }`}
                    />
                    {t.subscribeTop}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* محتوى الصفحة */}
        <main className="pt-28 md:pt-32">
          {/* ====== HERO ====== */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#fff5ef] via-[#ffeae4] to-[#fbeaf6]">
            <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
              <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
                {/* نص الهيرو */}
                <div
                  className={`transition-all duration-700 ease-out ${
                    pageLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  } ${isRTL ? "md:pl-10" : "md:pr-10"}`}
                >
                  <Badge className="mb-4 bg-[#f7d66e]/30 text-[#8f1238] border-[#f7d66e]/40 rounded-full px-4 py-1 text-xs font-semibold">
                    {t.heroAyah}
                  </Badge>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#3c0020] leading-tight mb-4 tracking-tight">
                    {t.heroTagline}
                  </h1>
                  <p className="text-base md:text-lg text-[#5b1734]/85 mb-6 max-w-xl">
                    {t.heroSubtitle}
                  </p>

                  {/* مميزات سريعة */}
                  <div className="grid grid-cols-2 gap-3 mb-7 max-w-xl">
                    {heroFeatures.slice(0, 2).map((f, idx) => {
                      const Icon = f.icon
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-2xl bg-white/80 border border-[#f1c5e0]/60 px-3 py-2 soft-shadow-sm"
                        >
                          <div className="icon-bubble h-8 w-8 rounded-2xl bg-[#8f1238] flex items-center justify-center border border-[#f7d66e]/50">
                            <Icon className="h-4 w-4 text-[#f7d66e]" />
                          </div>
                          <div className="text-[11px] font-semibold text-[#3c0020]">
                            {isRTL ? f.titleAr : f.titleEn}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      size="lg"
                      className="bg-[#f7d66e] hover:bg-[#ffe086] text-[#3c0020] font-semibold px-6 py-2 rounded-full soft-shadow-sm hover:-translate-y-0.5 transition-transform"
                      onClick={() => {
                        trackWhatsAppClick()
                        window.open(whatsappLink, "_blank")
                      }}
                    >
                      <MessageCircle
                        className={`h-5 w-5 ${
                          isRTL ? "ml-2" : "mr-2"
                        }`}
                      />
                      {t.heroPrimaryCta}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#8f1238]/40 text-[#8f1238] bg-white/70 hover:bg-white rounded-full px-6 py-2 hover:-translate-y-0.5 transition-transform soft-shadow-sm"
                      onClick={() => scrollToSection("videos")}
                    >
                      <PlayCircle
                        className={`h-5 w-5 ${
                          isRTL ? "ml-2" : "mr-2"
                        }`}
                      />
                      {t.heroSecondaryCta}
                    </Button>
                  </div>

                  {/* أرقام سريعة */}
                  <div className="mt-8 grid grid-cols-3 gap-4 max-w-md text-xs">
                    <div>
                      <p className="text-[#5b1734]/80 mb-1">
                        {isRTL ? "طلاب نشطون" : "Active students"}
                      </p>
                      <p className="text-xl font-extrabold text-[#3c0020]">
                        <CountUp
                          to={1200}
                          suffix={isRTL ? "+" : "+"}
                        />
                      </p>
                    </div>
                    <div>
                      <p className="text-[#5b1734]/80 mb-1">
                        {isRTL ? "دول حول العالم" : "Countries"}
                      </p>
                      <p className="text-xl font-extrabold text-[#3c0020]">
                        <CountUp
                          to={40}
                          suffix={isRTL ? "+" : "+"}
                        />
                      </p>
                    </div>
                    <div>
                      <p className="text-[#5b1734]/80 mb-1">
                        {isRTL ? "سنوات خبرة" : "Years online"}
                      </p>
                      <p className="text-xl font-extrabold text-[#3c0020]">
                        <CountUp
                          to={5}
                          suffix={isRTL ? "+" : "+"}
                        />
                      </p>
                    </div>
                  </div>
                </div>

                {/* صورة الهيرو */}
                <div
                  className={`relative transition-all duration-700 ease-out ${
                    pageLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                >
                  <div className="relative rounded-[32px] overflow-hidden soft-shadow hero-float border border-[#f1c5e0]/60">
                    <img
                      src="/images/banner-mobile.webp"
                      alt="Child learning online"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3c0020]/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* بطاقة صغيرة عائمة */}
                  <div className="absolute -bottom-5 -left-1 md:-left-4 bg-white/95 rounded-2xl border border-[#f1c5e0]/70 px-4 py-3 soft-shadow flex items-center gap-3">
                    <div className="icon-bubble h-9 w-9 rounded-2xl bg-[#8f1238] flex items-center justify-center border border-[#f7d66e]/50">
                      <Award className="h-4 w-4 text-[#f7d66e]" />
                    </div>
                    <div className="text-[11px]">
                      <p className="font-semibold text-[#3c0020]">
                        {isRTL
                          ? "أكثر من 5 سنوات خبرة"
                          : "5+ years experience"}
                      </p>
                      <p className="text-[#5b1734]/80">
                        {isRTL
                          ? "معلمات ومعلمون مجازون"
                          : "Qualified, trusted teachers"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ====== عن الأكاديمية ====== */}
          <AnimatedSection
            id="about"
            className="py-20 bg-white scroll-mt-28"
          >
            <div className="container mx-auto px-4">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
                {/* نص */}
                <div>
                  <Badge className="mb-3 bg-[#8f1238]/10 text-[#8f1238] border-[#8f1238]/20">
                    {isRTL ? "عن الأكاديمية" : "About the academy"}
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#3c0020] mb-3 tracking-tight">
                    {t.whyUsTitle}
                  </h2>
                  <p className="text-lg text-[#5b1734]/85 mb-6">
                    {t.whyUsSubtitle}
                  </p>

                  <h3 className="text-xl font-bold text-[#3c0020] mb-2">
                    {t.missionTitle}
                  </h3>
                  <p className="text-sm text-[#5b1734]/85 mb-7 leading-relaxed">
                    {t.missionText}
                  </p>

                  {/* مميزات */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {heroFeatures.map((f, idx) => {
                      const Icon = f.icon
                      return (
                        <Card
                          key={idx}
                          className="border-[#f1c5e0]/70 bg-[#fff8fb] hover:bg-[#fff1f7] transition-colors soft-shadow-sm"
                        >
                          <CardContent className="flex items-start gap-3 p-4">
                            <div className="icon-bubble h-9 w-9 rounded-2xl bg-[#8f1238] flex items-center justify-center border border-[#f7d66e]/50">
                              <Icon className="h-4 w-4 text-[#f7d66e]" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-semibold text-[#3c0020]">
                                {isRTL ? f.titleAr : f.titleEn}
                              </p>
                              <p className="text-[11px] text-[#5b1734]/80">
                                {isRTL ? f.descAr : f.descEn}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>

                {/* صورة طالبة في المسجد */}
                <div className="relative">
                  <div className="rounded-[32px] overflow-hidden soft-shadow border border-[#f1c5e0]/70">
                    <img
                      src="/images/student-child.jpg"
                      alt="Girl reading Qur'an"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#8f1238] text-[#f7d66e] text-xs px-4 py-2 rounded-full shadow-lg border border-[#f7d66e]/50">
                    {isRTL
                      ? "بيئة آمنة، تعليم من البيت، أثر حقيقي في شخصيات الأبناء."
                      : "Safe online environment, real impact on students’ character."}
                  </div>
                </div>
              </div>

              {/* الإحصائيات */}
              <div className="mt-14">
                <h3 className="text-xl font-bold text-[#3c0020] mb-2">
                  {t.statsTitle}
                </h3>
                <p className="text-sm text-[#5b1734]/80 mb-5">
                  {t.statsSubtitle}
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {stats.map((s, idx) => {
                    const Icon = s.icon
                    return (
                      <Card
                        key={idx}
                        className="border-[#f1c5e0]/80 bg-[#fff7fb] soft-shadow-sm"
                      >
                        <CardContent className="p-4 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div className="icon-bubble h-8 w-8 rounded-2xl bg-[#8f1238] flex items-center justify-center border border-[#f7d66e]/50">
                              <Icon className="h-4 w-4 text-[#f7d66e]" />
                            </div>
                            <p className="text-2xl font-extrabold text-[#3c0020]">
                              <CountUp
                                to={s.value}
                                suffix={isRTL ? "+" : "+"}
                              />
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-[#3c0020]">
                            {isRTL ? s.labelAr : s.labelEn}
                          </p>
                          <p className="text-[11px] text-[#5b1734]/80">
                            {isRTL ? s.hintAr : s.hintEn}
                          </p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ====== مواد الأكاديمية ====== */}
          <AnimatedSection
            id="programs"
            className="py-20 bg-[#fdf3f8] scroll-mt-28"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-10">
                <Badge className="mb-3 bg-white text-[#8f1238] border-[#f1c5e0]/70">
                  <BookOpen className="h-4 w-4 mx-1" />
                  <span>
                    {isRTL
                      ? "مسارات متدرجة للأطفال والكبار"
                      : "Structured tracks for all ages"}
                  </span>
                </Badge>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#3c0020] mb-3 tracking-tight">
                  {t.programsTitle}
                </h2>
                <p className="text-lg text-[#5b1734]/85">
                  {t.programsSubtitle}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {programs.map((p, idx) => {
                  const Icon = p.icon
                  return (
                    <Card
                      key={idx}
                      className={`border-[#f1c5e0]/80 bg-white/95 soft-shadow hover:-translate-y-1 hover:shadow-xl transition-all ${
                        p.highlight
                          ? "ring-2 ring-[#f7d66e]"
                          : ""
                      }`}
                    >
                      <CardHeader className="flex flex-row items-center justify-between gap-3 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="icon-bubble h-10 w-10 rounded-2xl bg-[#8f1238] flex items-center justify-center border border-[#f7d66e]/60">
                            <Icon className="h-5 w-5 text-[#f7d66e]" />
                          </div>
                          <div>
                            <CardTitle className="text-base md:text-lg text-[#3c0020]">
                              {isRTL ? p.titleAr : p.titleEn}
                            </CardTitle>
                            <p className="text-xs text-[#5b1734]/80">
                              {isRTL ? p.levelAr : p.levelEn}
                            </p>
                          </div>
                        </div>
                        {p.highlight && (
                          <Badge className="bg-[#f7d66e] text-[#3c0020] border-none text-[10px]">
                            {isRTL ? "الأكثر طلبًا" : "Most popular"}
                          </Badge>
                        )}
                      </CardHeader>
                      <CardContent className="pt-0 text-sm text-[#5b1734]/90 leading-relaxed">
                        {isRTL ? p.descAr : p.descEn}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* خلفية زخرفية بصورة مصحف عن قرب */}
              <div className="mt-12 rounded-[32px] overflow-hidden soft-shadow border border-[#f1c5e0]/70">
                <div className="relative">
                  <img
                    src="/images/quran-close.webp"
                    alt="Qur'an close up"
                    className="w-full h-60 md:h-72 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3c0020]/80 via-[#3c0020]/60 to-transparent" />
                  <div
                    className={`absolute inset-y-0 ${
                      isRTL ? "right-0" : "left-0"
                    } flex items-center px-6 sm:px-10`}
                  >
                    <div
                      className={`max-w-md text-white ${
                        isRTL ? "text-right" : "text-left"
                      } text-sm sm:text-base`}
                    >
                      <p className="font-semibold mb-2">
                        {isRTL
                          ? "اهتمام خاص بالتجويد وتصحيح التلاوة"
                          : "Special focus on tajweed & proper recitation"}
                      </p>
                      <p className="opacity-90">
                        {isRTL
                          ? "نساعد الطالب أن يقرأ القرآن كما أُنزل؛ مخارج سليمة، أحكام مضبوطة، وتدرّج يناسب قدراته."
                          : "We help students recite the Qur’an with correct makhārij and tajweed, step by step at their pace."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ====== برامج خاصة (مسابقات / سوبر / قُدسنا) ====== */}
          <AnimatedSection className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-10">
                <Badge className="mb-3 bg-[#8f1238]/10 text-[#8f1238] border-[#8f1238]/20">
                  <Sparkles className="h-4 w-4 mx-1" />
                  <span>
                    {isRTL
                      ? "أكثر من مجرد حصص عادية"
                      : "More than regular classes"}
                  </span>
                </Badge>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#3c0020] mb-3 tracking-tight">
                  {t.tracksTitle}
                </h2>
                <p className="text-lg text-[#5b1734]/85">
                  {t.tracksSubtitle}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {/* عمود 1 & 2 عاديين */}
                {specialTracks.slice(0, 2).map((track, idx) => (
                  <Card
                    key={idx}
                    className="border-[#f1c5e0]/80 bg-[#fff7fb] soft-shadow h-full flex flex-col"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-[#3c0020]">
                        {isRTL ? track.titleAr : track.titleEn}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-sm text-[#5b1734]/90 flex-1 flex flex-col gap-3">
                      <p>{isRTL ? track.descAr : track.descEn}</p>
                      <ul className="space-y-1 text-[11px]">
                        {(isRTL
                          ? track.pointsAr
                          : track.pointsEn
                        ).map((pt, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-[#8f1238]" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}

                {/* عمود قُدسنا مع خلفية القبة */}
                <Card className="relative overflow-hidden border-none soft-shadow h-full flex flex-col">
                  <div className="relative h-40">
                    <img
                      src="/images/Quds-zuwad.webp"
                      alt="Al Aqsa & Quds program"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000]/70 via-[#000]/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs text-[#e6f9e0]">
                        {isRTL
                          ? "غرس حب فلسطين والقدس في قلوب أبنائنا"
                          : "Planting love for Palestine & Al‑Quds in children’s hearts"}
                      </p>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-[#3c0020]">
                      {isRTL
                        ? specialTracks[2].titleAr
                        : specialTracks[2].titleEn}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-[#5b1734]/90 flex-1 flex flex-col gap-3">
                    <p>
                      {isRTL
                        ? specialTracks[2].descAr
                        : specialTracks[2].descEn}
                    </p>
                    <ul className="space-y-1 text-[11px]">
                      {(isRTL
                        ? specialTracks[2].pointsAr
                        : specialTracks[2].pointsEn
                      ).map((pt, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-[#8f1238]" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedSection>

          {/* ====== فيديوهات ====== */}
          <VideosSection language={language} />

          {/* ====== الأسعار ====== */}
          <AnimatedSection
            id="pricing"
            className="py-20 bg-[#fdf3f8] scroll-mt-28"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-10">
                <Badge className="mb-3 bg-white text-[#8f1238] border-[#f1c5e0]/70">
                  <Clock className="h-4 w-4 mx-1" />
                  <span>
                    {isRTL
                      ? "اختر عدد الحصص الأسبوعية"
                      : "Choose your weekly sessions"}
                  </span>
                </Badge>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#3c0020] mb-3 tracking-tight">
                  {t.pricingTitle}
                </h2>
                <p className="text-lg text-[#5b1734]/85 mb-2">
                  {t.pricingSubtitle}
                </p>
                <p className="text-[11px] text-[#5b1734]/75">
                  {isRTL
                    ? `الأسعار تقريبية بعملة بلدك (${currency.code}).`
                    : `Prices are approximate in your local currency (${currency.code}).`}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                {pricingPlans.map((plan) => (
                  <Card
                    key={plan.key}
                    className={`flex flex-col bg-white/95 border-[#f1c5e0]/80 soft-shadow ${
                      plan.highlight
                        ? "ring-2 ring-[#f7d66e] scale-[1.02]"
                        : ""
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <CardTitle className="text-lg text-[#3c0020]">
                          {plan.name}
                        </CardTitle>
                        {plan.highlight && (
                          <Badge className="bg-[#f7d66e] text-[#3c0020] border-none text-[10px]">
                            {t.mostPopular}
                          </Badge>
                        )}
                      </div>
                      <p className="text-2xl font-extrabold text-[#3c0020]">
                        {formatPrice(plan.usdPrice)}
                      </p>
                      <p className="text-xs text-[#5b1734]/80">
                        {plan.sessions} {t.sessionsPerMonth}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col gap-3 text-[11px] text-[#5b1734]/90">
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-[#8f1238]" />
                          <span>
                            {isRTL
                              ? "حصص مباشرة عبر زوم مع معلمين ومعلمات مختصين."
                              : "Live Zoom sessions with qualified teachers."}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-[#8f1238]" />
                          <span>
                            {isRTL
                              ? "متابعة وتقارير دورية بالمستوى."
                              : "Regular follow‑up and progress reports."}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-[#8f1238]" />
                          <span>
                            {isRTL
                              ? "إمكانية تعديل عدد الحصص عند الحاجة."
                              : "Flexibility to adjust sessions as needed."}
                          </span>
                        </li>
                      </ul>
                      <Button
                        className="mt-3 bg-[#8f1238] text-[#f7d66e] hover:bg-[#a01a47] rounded-full soft-shadow-sm"
                        onClick={() => {
                          trackWhatsAppClick()
                          window.open(whatsappLink, "_blank")
                        }}
                      >
                        <MessageCircle
                          className={`h-4 w-4 ${
                            isRTL ? "ml-2" : "mr-2"
                          }`}
                        />
                        {t.subscribeNow}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* ====== التقييمات ====== */}
          <TestimonialsSection
            language={language}
            whatsappLink={whatsappLink}
          />

          {/* ====== قسم الدعوة النهائي ====== */}
          <AnimatedSection className="py-20 bg-gradient-to-r from-[#8f1238] via-[#6b0023] to-[#8f1238]">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 items-center text-white">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
                    {t.ctaTitle}
                  </h2>
                  <p className="text-base md:text-lg text-white/90 mb-6">
                    {t.ctaSubtitle}
                  </p>
                  <Button
                    size="lg"
                    className="bg-[#f7d66e] text-[#3c0020] hover:bg-[#ffe086] rounded-full px-7 py-2 soft-shadow-sm hover:-translate-y-0.5 transition-transform"
                    onClick={() => {
                      trackWhatsAppClick()
                      window.open(whatsappLink, "_blank")
                    }}
                  >
                    <MessageCircle
                      className={`h-5 w-5 ${
                        isRTL ? "ml-2" : "mr-2"
                      }`}
                    />
                    {t.heroPrimaryCta}
                  </Button>
                </div>

                <div className="relative">
                  <div className="rounded-[28px] overflow-hidden soft-shadow border border-white/30 bg-white/10">
                    <img
                      src="/images/boy-praying.webp"
                      alt="Boy praying in the mosque"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3c0020]/70 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ====== تواصل معنا ====== */}
          <AnimatedSection
            id="contact"
            className="py-16 bg-white scroll-mt-28"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#3c0020] mb-2 tracking-tight">
                  {t.contactTitle}
                </h2>
                <p className="text-sm md:text-base text-[#5b1734]/85">
                  {t.contactSubtitle}
                </p>
              </div>

              <div className="max-w-xl mx-auto grid gap-6 md:grid-cols-2">
                <Card className="border-[#f1c5e0]/80 bg-[#fff7fb] soft-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <MessageCircle className="h-8 w-8 text-[#8f1238]" />
                    <p className="font-semibold text-[#3c0020] text-sm">
                      {isRTL
                        ? "تواصل فوري عبر واتساب"
                        : "Instant WhatsApp support"}
                    </p>
                    <p className="text-[11px] text-[#5b1734]/85">
                      {isRTL
                        ? "استفسارات – حجز – مساعدة في اختيار الخطة المناسبة."
                        : "Ask questions, book a slot or get help choosing the right plan."}
                    </p>
                    <Button
                      className="mt-1 bg-[#8f1238] text-[#f7d66e] hover:bg-[#a01a47] rounded-full px-6 soft-shadow-sm"
                      onClick={() => {
                        trackWhatsAppClick()
                        window.open(whatsappLink, "_blank")
                      }}
                    >
                      <MessageCircle
                        className={`h-4 w-4 ${
                          isRTL ? "ml-2" : "mr-2"
                        }`}
                      />
                      {isRTL
                        ? "ابدأ المحادثة الآن"
                        : "Start chat now"}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-[#f1c5e0]/80 bg-[#fff7fb] soft-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <Users className="h-8 w-8 text-[#8f1238]" />
                    <p className="font-semibold text-[#3c0020] text-sm">
                      {isRTL
                        ? "تابعنا على السوشيال ميديا"
                        : "Follow us on social media"}
                    </p>
                    <p className="text-[11px] text-[#5b1734]/85">
                      {isRTL
                        ? "شاهد لقطات من الحصص والتقييمات اليومية."
                        : "See clips from sessions and daily feedback."}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <a
                        href="https://www.facebook.com/Ummah.Muslimah.academy"
                        target="_blank"
                        rel="noreferrer"
                        className="icon-bubble h-9 w-9 rounded-full bg-[#8f1238] flex items-center justify-center text-[#f7d66e]"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                      <a
                        href="https://www.instagram.com/muslim.ummah.academy/"
                        target="_blank"
                        rel="noreferrer"
                        className="icon-bubble h-9 w-9 rounded-full bg-[#8f1238] flex items-center justify-center text-[#f7d66e]"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedSection>
        </main>

        {/* ====== الفوتر ====== */}
        <footer className="border-t border-[#f1c5e0]/80 bg-[#3c0020] text-white py-4">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px]">
            <p>{t.footerRights}</p>
            <div className="flex items-center gap-3 text-white/70">
              <span>
                {isRTL ? "سياسة الخصوصية" : "Privacy policy"}
              </span>
              <span>•</span>
              <span>
                {isRTL ? "شروط الاستخدام" : "Terms of use"}
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* ====== ستايل عام للخطوط والأنيميشن (مثل زواد) ====== */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Nunito:wght@400;600;700;800&display=swap");

        html[dir="rtl"],
        html[dir="rtl"] body {
          font-family: "Cairo", system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
        }

        html[dir="ltr"],
        html[dir="ltr"] body {
          font-family: "Nunito", system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
        }

        .soft-shadow-sm {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
        }

        .soft-shadow {
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.09);
        }

        .header-blur {
          backdrop-filter: blur(14px);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0.14)
          );
        }

        .hero-float {
          animation: heroFloat 8s ease-in-out infinite alternate;
        }

        @keyframes heroFloat {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-10px);
          }
        }

        .section-fade {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }

        .section-fade-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .icon-bubble {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .icon-bubble:hover {
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
        }

        .slider-arrow,
        .video-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.98);
          border-radius: 999px;
          border: 1px solid rgba(191, 128, 164, 0.5);
          padding: 0.55rem 0.75rem;
          font-size: 0.9rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.14);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .slider-arrow:hover,
        .video-nav-btn:hover {
          transform: translateY(-50%) translateY(-2px);
          background: #fff7fb;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
        }

        .video-nav-btn {
          top: 50%;
        }
      `}</style>
    </>
  )
}
