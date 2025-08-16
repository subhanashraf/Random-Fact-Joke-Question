"use client"

import React, { useState,Suspense } from "react"
import Head from "next/head"
import { useLanguage } from "@/components/language-provider"
import { Header } from "@/components/header"
import Footer from "@/components/Footer"

export default function ContactPage() {
  const { t } = useLanguage()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(null)
    setError(null)

    // Basic frontend validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("All fields are required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error("Failed to submit")

      setSuccess("Message sent successfully!")
      setName("")
      setEmail("")
      setMessage("")
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>{t("contact.title")}</title>
        <meta name="description" content={t("contact.description")} />
      </Head>
        <Suspense fallback={<div className="h-20 bg-background/80 backdrop-blur-md"></div>}>
        <Header />
      </Suspense>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("contact.title")}
          </h1>
          <p className="text-center text-gray-600 mb-8">{t("contact.description")}</p>

          {success && <div className="text-green-600 mb-4">{success}</div>}
          {error && <div className="text-red-600 mb-4">{error}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.nameLabel")}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("contact.namePlaceholder")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.emailLabel")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("contact.emailPlaceholder")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("contact.messageLabel")}</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("contact.messagePlaceholder")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : t("contact.sendButton")}
            </button>
          </form>
        </div>
      </main>
      
       <Suspense fallback={<div className="h-20 bg-background/80 backdrop-blur-md"></div>}>
        <Footer />
      </Suspense>
    </>
  )
}
