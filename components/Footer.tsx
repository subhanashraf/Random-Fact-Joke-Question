// components/Footer.tsx
"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 mt-12">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo / Website Name */}
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-yellow-400 text-2xl">🎲</span>
          <h1 className="text-2xl font-bold ml-2">
            {t("websiteName")}
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link href="/" className="hover:underline">
            {t("footer.home")}
          </Link>
          <Link href="/about" className="hover:underline">
            {t("footer.about")}
          </Link>
          <Link href="/contact" className="hover:underline">
            {t("footer.contact")}
          </Link>
          <Link href="/privacy" className="hover:underline">
            {t("footer.privacy")}
          </Link>
          <Link href="/terms" className="hover:underline">
            {t("footer.terms")}
          </Link>
        </nav>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-200 mt-4">
        © {new Date().getFullYear()} {t("websiteName")}. {t("footer.rights")}
      </div>
    </footer>
  )
}
