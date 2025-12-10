"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Award, Clock, CheckCircle, MessageCircle, Globe, Facebook, Instagram, Menu, X, Gift, Video, Gamepad } from "lucide-react"

interface Currency {
  code: string
  symbol: string
  rate: number
}

interface LocationData {
  country_code: string
  currency: string
}

const currencyRates: Record<string, Currency> = {
  EGP: { code: "EGP", symbol: "ج.م", rate: 48.4475 },
  SAR: { code: "SAR", symbol: "ر.س", rate: 3.7519 },
  EUR: { code: "EUR", symbol: "€", rate: 0.866 },
  GBP: { code: "GBP", symbol: "£", rate: 0.752 },
  USD: { code: "USD", symbol: "$", rate: 1 },
}

const translations = {
  ar: {
    academyName: "أكاديمية أمة مسلمة",
    academyNameEn: "Muslim Ummah academy",
    heroTagline: "تعلم القرآن والتجويد مع أفضل المعلمين",
    heroSubtitle: "نقدم تعليماً متميزاً للقرآن الكريم وعلوم التجويد بأسلوب حديث وفعال",
    freeTrialBtn: "احصل على حصة تجريبية مجانية",
    aboutTitle: "من نحن",
    missionTitle: "رسالتنا",
    missionText:
      "نحن في أكاديمية أمة مسلمة نسعى لتعليم القرآن الكريم وعلوم التجويد بأسلوب مبسط وفعال. نؤمن بأن تعلم كتاب الله حق لكل مسلم، ونعمل على توفير بيئة تعليمية متميزة تجمع بين الأصالة والمعاصرة.",
    qualityEducation: "تعليم متميز",
    expertTeachers: "معلمون خبراء",
    certifiedPrograms: "شهادات معتمدة",
    servicesTitle: "خدماتنا",
    quranRecitation: "تلاوة القرآن",
    quranDesc: "تعلم التلاوة الصحيحة للقرآن الكريم",
    theoreticalTajweed: "التجويد النظري",
    theoreticalDesc: "دراسة قواعد التجويد النظرية",
    practicalTajweed: "التجويد العملي",
    practicalDesc: "تطبيق قواعد التجويد عملياً",
    simplifiedTafseer: "التفسير المبسط",
    tafseerDesc: "فهم معاني القرآن الكريم",
    pricingTitle: "خطط الأسعار",
    pricingSubtitle: "اختر الخطة المناسبة لك",
    basicPlan: "الخطة الأساسية",
    standardPlan: "الخطة المتوسطة",
    premiumPlan: "الخطة المتقدمة",
    mostPopular: "الأكثر شعبية",
    sessionsPerMonth: "حصص شهرياً",
    subscribeNow: "اشترك الآن",
    basicFeatures: ["تلاوة القرآن", "التجويد النظري", "الدراسات الإسلامية الأساسية"],
    standardFeatures: ["تلاوة القرآن", "التجويد النظري", "التجويد العملي", "التفسير المبسط"],
    premiumFeatures: ["تلاوة القرآن", "التجويد النظري", "التجويد العملي", "التفسير المبسط", "التاريخ الإسلامي"],
    ctaTitle: "ابدأ رحلتك التعليمية اليوم",
    ctaSubtitle: "احصل على حصة تجريبية مجانية واكتشف الفرق",
    footerTagline: "تعلم القرآن والتجويد مع أفضل المعلمين",
    videosTitle: "فيديوهات",
    videosSubtitle: "شاهد مقتطفات قصيرة عن محتوى الأكاديمية",
    copyright: "© 2024 أكاديمية أمة مسلمة. جميع الحقوق محفوظة.",

    // ----- navigation labels for top bar -----
    menuAbout: "من نحن",            // About Us
    menuPricing: "الباقات",         // Pricing plans
    menuVideos: "المحتوى",          // Content / videos
    menuServices: "خدماتنا",         // Our services
    menuTestimonials: "آراء الطلاب",  // Student testimonials
    menuContact: "تواصل معنا",       // Contact us
    subscribeTop: "اشترك الآن",       // Subscribe button label in top bar
  },
  en: {
    academyName: "Muslim Ummah academy",
    academyNameEn: "أكاديمية أمة مسلمة",
    heroTagline: "Learn Quran and Tajweed with Expert Teachers",
    heroSubtitle:
      "We provide excellent education for the Holy Quran and Tajweed sciences with modern and effective methods",
    freeTrialBtn: "Get Free Trial",
    aboutTitle: "About Us",
    missionTitle: "Our Mission",
    missionText:
      "At Muslim Ummah academy, we strive to teach the Holy Quran and Tajweed sciences in a simplified and effective manner. We believe that learning Allah's book is the right of every Muslim, and we work to provide an excellent educational environment that combines authenticity with modernity.",
    qualityEducation: "Quality Education",
    expertTeachers: "Expert Teachers",
    certifiedPrograms: "Certified Programs",
    servicesTitle: "Our Services",
    quranRecitation: "Quran Recitation",
    quranDesc: "Learn proper Quran recitation",
    theoreticalTajweed: "Theoretical Tajweed",
    theoreticalDesc: "Study theoretical Tajweed rules",
    practicalTajweed: "Practical Tajweed",
    practicalDesc: "Apply Tajweed rules practically",
    simplifiedTafseer: "Simplified Tafseer",
    tafseerDesc: "Understand Quran meanings",
    pricingTitle: "Pricing Plans",
    pricingSubtitle: "Choose the plan that suits you",
    basicPlan: "Basic Plan",
    standardPlan: "Standard Plan",
    premiumPlan: "Premium Plan",
    mostPopular: "Most Popular",
    sessionsPerMonth: "sessions/month",
    subscribeNow: "Subscribe Now",
    basicFeatures: ["Quran Recitation", "Theoretical Tajweed", "Basic Islamic Studies"],
    standardFeatures: ["Quran Recitation", "Theoretical Tajweed", "Practical Tajweed", "Simplified Tafseer"],
    premiumFeatures: [
      "Quran Recitation",
      "Theoretical Tajweed",
      "Practical Tajweed",
      "Simplified Tafseer",
      "Islamic History",
    ],
    ctaTitle: "Start Your Learning Journey Today",
    ctaSubtitle: "Get a free trial session and discover the difference",
    footerTagline: "Learn Quran and Tajweed with Expert Teachers",
    videosTitle: "Videos",
    videosSubtitle: "Watch short clips from our lessons",
    copyright: "© 2024 Muslim Ummah academy. All rights reserved.",

    // ----- navigation labels for top bar -----
    menuAbout: "About",           // About Us
    menuPricing: "Pricing",        // Pricing plans
    menuVideos: "Content",         // Content / videos
    menuServices: "Our Services",   // Our services
    menuTestimonials: "Testimonials",// Student testimonials
    menuContact: "Contact Us",      // Contact us
    subscribeTop: "Subscribe Now",   // Subscribe button label in top bar
  },
}

/* ---------- CountUp component ---------- */
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
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration)
              setVal(Math.floor(p * to))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration])

  const locale = typeof document !== "undefined" && document.dir === "rtl" ? "ar-EG" : "en-US"
  const formatted = new Intl.NumberFormat(locale).format(val)

  return (
    <div ref={ref} className={className}>
      <span className="tabular-nums">{prefix}{formatted}{suffix}</span>
    </div>
  )
}
/* -------------------------------------- */

/* ---------- Videos Section ---------- */
function VideosSection({ language }: { language: "ar" | "en" }) {
  const videoIds = ["nAMImHfDMmI", "FbNOMuPZK2I", "lTQiLyOL5kU", "nmQrYjJlBmg", "N1WfVkQsC2c"]
  const [index, setIndex] = useState(language === "ar" ? 0 : 1)

  useEffect(() => {
    setIndex(language === "ar" ? 0 : 1)
  }, [language])

  const prev = () => setIndex((i) => (i - 1 + videoIds.length) % videoIds.length)
  const next = () => setIndex((i) => (i + 1) % videoIds.length)

  const src = `https://www.youtube-nocookie.com/embed/${videoIds[index]}?rel=0&modestbranding=1&playsinline=1`
  const title = translations[language].videosTitle
  const subtitle = translations[language].videosSubtitle

  return (
    <section id="videos" className="py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 mb-10">{subtitle}</p>

          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px] md:max-w-[360px]">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-emerald-100">
              <div className="aspect-[9/16] bg-black">
                <iframe
                  key={src}
                  className="w-full h-full"
                  src={src}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <button
              onClick={prev}
              aria-label="Previous video"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow p-3 border border-emerald-100"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next video"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow p-3 border border-emerald-100"
            >
              ›
            </button>

            <div className="mt-5 flex items-center justify-center gap-2">
              {videoIds.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 w-2 rounded-full ${i === index ? "bg-emerald-700" : "bg-emerald-200"}`}
                  aria-label={`Go to video ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
/* -------------------------------------- */

/* ---------- Testimonials Section (NEW) ---------- */
function TestimonialsSection({
  language,
  whatsappLink,
}: {
  language: "ar" | "en"
  whatsappLink: string
}) {
  const images = [
    "/images/feed1.webp",
    "/images/feed2.webp",
    "/images/feed3.webp",
    "/images/feed4.webp",
    "/images/feed5.webp",
    "/images/feed6.webp",
    "/images/feed7.webp",
    "/images/feed8.webp",
    "/images/feed9.webp",
  ]
  const [i, setI] = useState(0)
  const isRTL = language === "ar"

  const prev = () => setI((v) => (v - 1 + images.length) % images.length)
  const next = () => setI((v) => (v + 1) % images.length)

  const title = isRTL ? "آراء الطلاب" : "Students’ Feedback"
  const subtitle = isRTL ? "مقتطفات من رسائل حقيقية لطلابنا" : "Real messages from our students"

  return (
    <section id="testimonials" className="py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 mb-10">{subtitle}</p>

          <div className="relative max-w-3xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-emerald-100 bg-white">
              <div className="w-full h-80 sm:h-[22rem] md:h-[26rem]">
                <img
                  key={images[i]}
                  src={images[i]}
                  alt={`testimonial ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-contain bg-white"
                />
              </div>
            </div>

            {/* arrows */}
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow p-3 border border-emerald-100 ${isRTL ? "right-2" : "left-2"}`}
            >
              {isRTL ? "›" : "‹"}
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow p-3 border border-emerald-100 ${isRTL ? "left-2" : "right-2"}`}
            >
              {isRTL ? "‹" : "›"}
            </button>

            {/* dots */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-2 w-2 rounded-full ${idx === i ? "bg-emerald-700" : "bg-emerald-200"}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <Button
            onClick={() => window.open(whatsappLink, "_blank")}
            className="mt-8 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold px-8 py-6 rounded-full shadow"
          >
            {isRTL ? "تواصل معنا الآن" : "Contact Us Now"}
          </Button>
        </div>
      </div>
    </section>
  )
}
/* -------------------------------------- */

export default function UmmahAcademyLanding() {
  const [language, setLanguage] = useState<"ar" | "en">("ar")
  const [currency, setCurrency] = useState<Currency>({ code: "USD", symbol: "$", rate: 1 })
  const [isLoading, setIsLoading] = useState(true)

  // state for mobile menu in top navigation bar
  const [menuOpen, setMenuOpen] = useState(false)

  const t = translations[language]
  const isRTL = language === "ar"

  const trackWhatsAppClick = () => {
    try {
      const fbqFn = (window as any)?.fbq
      if (typeof fbqFn === "function") {
        fbqFn("trackCustom", "WhatsAppClick")
      }
    } catch {}
  }

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

        const countryToCurrency: Record<string, string> = {
          EG: "EGP", SA: "SAR", AE: "AED", KW: "KWD", QA: "QAR", BH: "BHD", OM: "OMR",
          JO: "JOD", LB: "LBP", SY: "SYP", IQ: "IQD", YE: "YER", PS: "ILS",
          MA: "MAD", TN: "TND", DZ: "DZD", LY: "LYD", SD: "SDG",
          DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", BE: "EUR",
          AT: "EUR", PT: "EUR", IE: "EUR", FI: "EUR", GR: "EUR",
          GB: "GBP", US: "USD", CA: "CAD", AU: "AUD",
        }

        const detectedCurrency = countryToCurrency[data.country_code] || "USD"
        if (currencyRates[detectedCurrency]) setCurrency(currencyRates[detectedCurrency])

        const arabicCountries = ["EG","SA","AE","KW","QA","BH","OM","JO","LB","SY","IQ","YE","PS","MA","TN","DZ","LY","SD"]
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

  const toggleLanguage = () => setLanguage((prev) => (prev === "ar" ? "en" : "ar"))

  // helper for smooth scrolling to section and closing the menu
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
    // hide menu after navigation
    setMenuOpen(false)
  }

  // ======== WhatsApp link (dynamic by language) ========
  const waBase = "https://wa.me/201505532052?text="
  const waMsgAr = "أريد حجز حصة مجانية للتجربة"
  const waMsgEn = "get free trial"
  const whatsappLink = `${waBase}${encodeURIComponent(language === "ar" ? waMsgAr : waMsgEn)}`
  // =====================================================

  const plans = [
    { name: language === "ar" ? t.basicPlan : t.basicPlan, price: 15, sessions: 4, features: t.basicFeatures },
    { name: language === "ar" ? t.standardPlan : t.standardPlan, price: 30, sessions: 8, features: t.standardFeatures, popular: true },
    { name: language === "ar" ? t.premiumPlan : t.premiumPlan, price: 40, sessions: 12, features: t.premiumFeatures },
  ]

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

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-emerald-50 to-white ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Top Navigation Bar */}
      {/* Updated colours for the new visual identity. The bar now uses
        * the academy primary colour with slight transparency and a golden
        * border, reflecting the reference site's premium palette. */}
      <div className="fixed top-0 left-0 w-full z-50 bg-academy-primary/90 backdrop-blur border-b border-academy-gold">
        {/* Outer container controls alignment of the menu group. For RTL languages, we use justify-start so items align to the right; for LTR we use justify-end so items align to the right as well. */}
        <div className={`container mx-auto px-4 flex items-center ${isRTL ? 'justify-start' : 'justify-end'} py-3`}>
          {/* Button group maintains a consistent visual order: menu → language → subscribe. We flip row direction based on page direction so the DOM order always puts menu first on the right. */}
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* menu toggle button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={isRTL ? 'القائمة' : 'Menu'}
              className="p-2 rounded-md border border-transparent hover:bg-academy-secondary/30 focus:outline-none"
            >
              {menuOpen ? (
                <X className="h-6 w-6 text-academy-gold" />
              ) : (
                <Menu className="h-6 w-6 text-academy-gold" />
              )}
            </button>
            {/* language toggle inside top bar */}
            <Button
              onClick={toggleLanguage}
              className="bg-transparent text-academy-gold border border-academy-gold/50 hover:bg-academy-secondary/30"
              size="sm"
            >
              <Globe className="h-4 w-4" />
              <span className={isRTL ? 'mr-1' : 'ml-1'}>{language === 'ar' ? 'English' : 'العربية'}</span>
            </Button>
            {/* subscribe now button */}
            <Button
              onClick={() => {
                trackWhatsAppClick()
                window.open(whatsappLink, '_blank')
              }}
              className="bg-academy-gold hover:bg-academy-gold/90 text-academy-primary font-bold"
              size="sm"
            >
              <MessageCircle className="h-4 w-4" />
              <span className={isRTL ? 'mr-1' : 'ml-1'}>{t.subscribeTop}</span>
            </Button>
          </div>
        </div>
        {/* Dropdown menu for navigation. When open, center the menu items horizontally on the page and use consistent spacing. */}
        {menuOpen && (
          <div className="absolute w-full bg-white border-t border-emerald-100 shadow-md z-40" style={{ right: 0, left: 0 }}>
            <div className="container mx-auto px-4 py-6 flex justify-center">
              {/* limit the width so the menu doesn't stretch across the entire screen */}
              <ul className="flex flex-col items-center text-center space-y-5 max-w-xs w-full">
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="w-full text-emerald-800 hover:text-emerald-600 font-medium text-xl md:text-2xl"
                  >
                    {t.menuAbout}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="w-full text-emerald-800 hover:text-emerald-600 font-medium text-xl md:text-2xl"
                  >
                    {t.menuPricing}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('videos')}
                    className="w-full text-emerald-800 hover:text-emerald-600 font-medium text-xl md:text-2xl"
                  >
                    {t.menuVideos}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="w-full text-emerald-800 hover:text-emerald-600 font-medium text-xl md:text-2xl"
                  >
                    {t.menuServices}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('testimonials')}
                    className="w-full text-emerald-800 hover:text-emerald-600 font-medium text-xl md:text-2xl"
                  >
                    {t.menuTestimonials}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      trackWhatsAppClick()
                      window.open(whatsappLink, '_blank')
                      setMenuOpen(false)
                    }}
                    className="w-full text-emerald-800 hover:text-emerald-600 font-medium text-xl md:text-2xl"
                  >
                    {t.menuContact}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Add top padding to avoid content hidden behind fixed bar */}
      <div className="pt-20">

      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-r from-academy-primary to-academy-secondary min-h-screen flex items-center"
        style={{
          /* Compose the maroon overlay with the new hero image. The rgba values correspond to
             the primary colour but with transparency to ensure the text remains legible. */
          backgroundImage: `linear-gradient(rgba(122, 17, 44, 0.85), rgba(155, 34, 64, 0.85)), url('/images/student-child.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-academy-secondary/60 to-academy-primary/60"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-PFiwOQmUO2XqQEdFh8evsswZet7bO5.png"
                alt="Ummah Muslim Academy Logo"
                className="w-auto mx-auto mb-4 h-28"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-academy-gold mb-6">
              <span className="block">{isRTL ? t.academyName : t.academyNameEn}</span>
              <span className="block text-3xl md:text-4xl mt-4 text-academy-light">{isRTL ? t.academyNameEn : t.academyName}</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-academy-light/90 mb-4">{t.heroTagline}</p>
          <p className="text-lg md:text-xl text-academy-light/80 mb-8">{t.heroSubtitle}</p>
          <Button
            size="lg"
            className="bg-academy-gold hover:bg-academy-gold/90 text-academy-primary font-bold text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            onClick={() => {
              trackWhatsAppClick()
              window.open(whatsappLink, "_blank")
            }}
          >
            <MessageCircle className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t.freeTrialBtn}
          </Button>
        </div>
      </section>

      {/* Features Section (inspired by Zuwad) */}
      {/* This section highlights the key selling points of the academy.
          It overlays slightly on the hero area with a negative margin and
          uses a translucent backdrop for legibility. */}
      <section className="-mt-16 mb-12 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="bg-white/90 backdrop-blur-md border border-academy-gold rounded-2xl shadow-xl p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(() => {
              // Define feature content based on language direction. Arabic content appears when RTL.
              const features = isRTL
                ? [
                    {
                      icon: Gift,
                      title: 'حصة تجريبية مجانية',
                      desc: 'الجلسة الأولى بدون رسوم لقياس الفائدة',
                    },
                    {
                      icon: Users,
                      title: 'حصص فردية',
                      desc: 'حصة واحد لواحد (طالب لكل معلم)',
                    },
                    {
                      icon: Video,
                      title: 'جلسات مباشرة',
                      desc: 'المعلمون متواجدون للفيديو المباشر مع كل طالب',
                    },
                    {
                      icon: Gamepad,
                      title: 'أساليب تعليمية ممتعة',
                      desc: 'نستخدم أحدث طرق التعليم والألعاب التربوية',
                    },
                  ]
                : [
                    {
                      icon: Gift,
                      title: 'Free Trial Session',
                      desc: 'The first session is free of charge to measure the benefit',
                    },
                    {
                      icon: Users,
                      title: 'One‑on‑One Sessions',
                      desc: 'Sessions are one to one (one student per teacher)',
                    },
                    {
                      icon: Video,
                      title: 'Live Video Sessions',
                      desc: 'Teachers are available for live video with each student',
                    },
                    {
                      icon: Gamepad,
                      title: 'Fun Learning Methods',
                      desc: 'We use the newest teaching methods and educational games',
                    },
                  ]
              return features.map(({ icon: Icon, title, desc }, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-16 w-16 mb-4 rounded-full bg-academy-light border border-academy-gold">
                    <Icon className="h-8 w-8 text-academy-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-academy-primary mb-1">{title}</h3>
                    <p className="text-sm text-academy-primary/70 leading-relaxed">{desc}</p>
                </div>
              ))
            })()}
          </div>
        </div>
      </section>

      {/* Stats + Mission Section (صف واحد دائمًا) */}
      <section id="about" className="py-20 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 gap-4 md:gap-8 mb-14">
              {/* الطلاب */}
              <div className="rounded-2xl border border-academy-gold bg-academy-light/40 p-5 sm:p-8 shadow-sm flex flex-col items-center justify-between h-44 sm:h-52">
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-academy-primary leading-none">
                  {isRTL ? <CountUp to={1000} duration={1200} suffix="+" /> : <CountUp to={1000} duration={1200} prefix="+" />}
                </div>
                <div className="mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl font-bold text-academy-secondary">
                  {isRTL ? "طالب" : "Students"}
                </div>
                <p className="mt-1 text-academy-primary/70 text-sm sm:text-base">
                  {isRTL ? "أكثر من ألف طالب" : "More than one thousand learners"}
                </p>
              </div>

              {/* المعلّمون */}
              <div className="rounded-2xl border border-academy-gold bg-academy-light/40 p-5 sm:p-8 shadow-sm flex flex-col items-center justify-between h-44 sm:h-52">
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-academy-primary leading-none">
                  {isRTL ? <CountUp to={150} duration={1200} suffix="+" /> : <CountUp to={150} duration={1200} prefix="+" />}
                </div>
                <div className="mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl font-bold text-academy-secondary">
                  {isRTL ? "معلم/ـة" : "Teachers"}
                </div>
                <p className="mt-1 text-academy-primary/70 text-sm sm:text-base">
                  {isRTL ? "أكثر من مئة وخمسين معلمًا/ـة" : "Over one hundred fifty instructors"}
                </p>
              </div>

              {/* الدول */}
              <div className="rounded-2xl border border-academy-gold bg-academy-light/40 p-5 sm:p-8 shadow-sm flex flex-col items-center justify-between h-44 sm:h-52">
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-academy-primary leading-none">
                  {isRTL ? <CountUp to={12} duration={1200} suffix="+" /> : <CountUp to={12} duration={1200} prefix="+" />}
                </div>
                <div className="mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl font-bold text-academy-secondary">
                  {isRTL ? "دولة" : "Countries"}
                </div>
                <p className="mt-1 text-academy-primary/70 text-sm sm:text-base">
                  {isRTL ? "أكثر من 12 دولة" : "Serving 12+ countries"}
                </p>
              </div>
            </div>

            {/* رسالة الأكاديمية */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">{t.missionTitle}</h3>
              <p className="text-lg text-gray-700 leading-relaxed">{t.missionText}</p>
            </div>

            {/* الأيقونات الثلاثة */}
            <div className={`flex ${isRTL ? "justify-center gap-x-10 flex-row-reverse" : "justify-center gap-x-10"}`}>
              <div className="text-center">
                <div className="bg-yellow-100 rounded-full p-4 mb-2 inline-block">
                  <BookOpen className="h-8 w-8 text-emerald-800" />
                </div>
                <p className="font-semibold">{t.qualityEducation}</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 rounded-full p-4 mb-2 inline-block">
                  <Users className="h-8 w-8 text-emerald-800" />
                </div>
                <p className="font-semibold">{t.expertTeachers}</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 rounded-full p-4 mb-2 inline-block">
                  <Award className="h-8 w-8 text-emerald-800" />
                </div>
                <p className="font-semibold">{t.certifiedPrograms}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-emerald-50 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">{t.pricingTitle}</h2>
              <p className="text-lg text-gray-600">{t.pricingSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative hover:shadow-xl transition-all duration-300 ${
                    plan.popular ? "border-yellow-400 border-2 scale-105" : "border-gray-200"
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-emerald-800 font-bold">
                      {t.mostPopular}
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-emerald-800">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-emerald-700 mt-4">
                      {formatPrice(plan.price)}
                      <span className="text-lg text-gray-500 block">
                        {plan.sessions} {t.sessionsPerMonth}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className={`h-5 w-5 text-yellow-500 flex-shrink-0 ${isRTL ? "ml-3" : "mr-3"}`} />
                          <span className="text-emerald-800 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-yellow-400 hover:bg-yellow-300 text-emerald-800"
                          : "bg-emerald-800 hover:bg-emerald-700 text-white"
                      } font-bold py-3 rounded-full transition-all duration-200 hover:scale-105`}
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
        </div>
      </section>

      {/* Videos Section (NEW) */}
      <VideosSection language={language} />

      {/* Services with images */}
      <section id="services" className="py-20 bg-academy-light scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-academy-primary mb-6">{t.servicesTitle}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-academy-gold overflow-hidden">
                <CardHeader>
                  <img src="/images/1.webp" alt={t.quranRecitation} loading="lazy" className="w-full h-40 object-cover rounded-xl mb-4" />
                  <CardTitle className="text-academy-primary">{t.quranRecitation}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-academy-primary/70">{t.quranDesc}</p></CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-academy-gold overflow-hidden">
                <CardHeader>
                  <img src="/images/2.webp" alt={t.theoreticalTajweed} loading="lazy" className="w-full h-40 object-cover rounded-xl mb-4" />
                  <CardTitle className="text-academy-primary">{t.theoreticalTajweed}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-academy-primary/70">{t.theoreticalDesc}</p></CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-academy-gold overflow-hidden">
                <CardHeader>
                  <img src="/images/3.webp" alt={t.practicalTajweed} loading="lazy" className="w-full h-40 object-cover rounded-xl mb-4" />
                  <CardTitle className="text-academy-primary">{t.practicalTajweed}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-academy-primary/70">{t.practicalDesc}</p></CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-academy-gold overflow-hidden">
                <CardHeader>
                  <img src="/images/4.webp" alt={t.simplifiedTafseer} loading="lazy" className="w-full h-40 object-cover rounded-xl mb-4" />
                  <CardTitle className="text-academy-primary">{t.simplifiedTafseer}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-academy-primary/70">{t.tafseerDesc}</p></CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (NEW) */}
      <TestimonialsSection language={language} whatsappLink={whatsappLink} />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-academy-primary to-academy-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-academy-gold mb-6">{t.ctaTitle}</h2>
            <p className="text-xl text-academy-light/90 mb-8">{t.ctaSubtitle}</p>
            <Button
              size="lg"
              className="bg-academy-gold hover:bg-academy-gold/90 text-academy-primary font-bold text-xl px-12 py-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              onClick={() => {
                trackWhatsAppClick()
                window.open(whatsappLink, "_blank")
              }}
            >
              <MessageCircle className={`h-6 w-6 ${isRTL ? "ml-3" : "mr-3"}`} />
              {t.freeTrialBtn}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-academy-primary text-academy-light py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">{t.academyName}</h3>
          <p className="text-academy-light/80 mb-6">{t.footerTagline}</p>

          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://www.facebook.com/Ummah.Muslimah.academy" target="_blank" rel="noopener noreferrer" className="text-academy-light hover:text-academy-gold transition-colors duration-200">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/muslim.ummah.academy/" target="_blank" rel="noopener noreferrer" className="text-academy-light hover:text-academy-gold transition-colors duration-200">
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-academy-light hover:text-academy-gold transition-colors duration-200"
              onClick={trackWhatsAppClick}
            >
              <MessageCircle className="h-6 w-6" />
            </a>
          </div>

          <p className="text-academy-light/70 text-sm">{t.copyright}</p>
        </div>
      </footer>
      {/* Close padding container */}
      </div>
      {/* Close root container */}
    </div>
  )
}
