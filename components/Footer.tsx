
// components/Footer.tsx
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { language, setLanguage, t } = useLanguage()
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 mt-12">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

        {/* Logo / Website Name */}
        {/* <h2 className="text-lg font-semibold mb-4 md:mb-0">
          Random Generator
        </h2> */}

        <div className="flex items-center">
          <span className="text-yellow-400 text-2xl">🎲</span>
          <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-2xl font-bold ml-2">
            {t("websiteName")}
          </h1>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms & Conditions
          </Link>
        </nav>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-200 mt-4">
        © {new Date().getFullYear()} Random Generator. All rights reserved.
      </div>
    </footer>
  )
}
