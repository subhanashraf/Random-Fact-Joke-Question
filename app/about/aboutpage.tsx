"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import {  Suspense } from "react"
import { Header } from "@/components/header"
import Footer from "@/components/Footer"
export default function AboutContent() {
  const { t } = useLanguage()

  return (
    <>
      <Suspense fallback={<div className="h-20 bg-background/80 backdrop-blur-md"></div>}>
        <Header />
      </Suspense>
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{t("about.title")}</h1>

      <p className="mb-4 text-lg leading-relaxed">{t("about.p1")}</p>
      <p className="mb-4 text-lg leading-relaxed">{t("about.p2")}</p>
      <p className="mb-4 text-lg leading-relaxed">{t("about.p3")}</p>
      <p className="mb-6 text-lg leading-relaxed">{t("about.p4")}</p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {t("about.homeBtn")}
        </Link>
        <Link
          href="/contact"
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300"
        >
          {t("about.contactBtn")}
        </Link>
      </div>
    </main>
    
       <Suspense fallback={<div className="h-20 bg-background/80 backdrop-blur-md"></div>}>
        <Footer />
      </Suspense>
    </>
  )
}
