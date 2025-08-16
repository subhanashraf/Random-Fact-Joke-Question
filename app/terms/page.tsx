"use client"

import React from "react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

import { Header } from "@/components/header"
import Footer from "@/components/Footer"
import { Suspense } from "react"
export default function TermsPage() {
  const { t } = useLanguage() // t() reads from your en/zh JSON

  return (
    <>
      <Suspense fallback={<div className="h-20 bg-background/80 backdrop-blur-md"></div>}>
        <Header />
      </Suspense>
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t("terms.title")}
        </h1>

        {/* Introduction */}
        <p className="text-gray-600 mb-4">{t("terms.intro")}</p>

        {/* Sections */}
        {Object.values(t("terms.sections")).map((section: any, index: number) => (
          <div key={index}>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-blue-700">{section.title}</h2>
            <p className="text-gray-600 mb-4">{section.content}</p>
          </div>
        ))}

        {/* Contact */}
        <p className="text-gray-600 mt-6">
          {t("terms.contact")}{" "}
          <Link
            href="/contact"
            className="text-blue-600 font-medium hover:underline"
          >
            {t("footer.contact")}
          </Link>
          .
        </p>
      </div>
    </main>
    
       <Suspense fallback={<div className="h-20 bg-background/80 backdrop-blur-md"></div>}>
        <Footer />
      </Suspense>
    </>
  )
}
