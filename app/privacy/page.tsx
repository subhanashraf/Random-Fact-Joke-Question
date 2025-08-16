// app/privacy/page.tsx
"use client"

import React from "react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import {  Suspense } from "react"
import { Header } from "@/components/header"
import Footer from "@/components/Footer"

export default function PrivacyPolicyPage() {
  const { t } = useLanguage()

  return (
    <>
      <Suspense fallback={<div className="h-20 bg-background/80 backdrop-blur-md"></div>}>
        <Header />
      </Suspense>
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {t("privacy.title")}
        </h1>

        <p className="text-gray-600 mb-4">{t("privacy.intro")}</p>

        {/* Sections */}
        <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-700">
          {t("privacy.sections.aiService.title")}
        </h2>
        <p className="text-gray-600 mb-4">{t("privacy.sections.aiService.content")}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-700">
          {t("privacy.sections.dataCollection.title")}
        </h2>
        <p className="text-gray-600 mb-4">{t("privacy.sections.dataCollection.content")}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-700">
          {t("privacy.sections.aiContent.title")}
        </h2>
        <p className="text-gray-600 mb-4">{t("privacy.sections.aiContent.content")}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-700">
          {t("privacy.sections.license.title")}
        </h2>
        <p className="text-gray-600 mb-4">{t("privacy.sections.license.content")}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-700">
          {t("privacy.sections.thirdParty.title")}
        </h2>
        <p className="text-gray-600 mb-4">{t("privacy.sections.thirdParty.content")}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-700">
          {t("privacy.sections.updates.title")}
        </h2>
        <p className="text-gray-600 mb-4">{t("privacy.sections.updates.content")}</p>

        <p className="text-gray-600 mt-6">
          {t("privacy.contact")}{" "}
          <Link
            href="/contact"
            className="text-purple-600 font-medium hover:underline"
          >
            {t("contact.title")}
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
