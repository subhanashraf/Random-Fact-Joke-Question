import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "Random Generator - Facts, Questions & Jokes",
  description:
    "Discover amazing facts, thought-provoking questions, and hilarious jokes. Perfect for kids and families!",
  generator: "Random Generator App",
  keywords: "random facts, questions, jokes, kids, family, education, fun, 随机事实, 问题, 笑话",
  authors: [{ name: "Random Generator Team" }],
  alternates: {
    languages: {
      en: "/en",
      zh: "/zh",
    },
  },
  openGraph: {
    title: "Random Generator - Facts, Questions & Jokes",
    description:
      "Discover amazing facts, thought-provoking questions, and hilarious jokes. Perfect for kids and families!",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Generator - Facts, Questions & Jokes",
    description:
      "Discover amazing facts, thought-provoking questions, and hilarious jokes. Perfect for kids and families!",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <link rel="alternate" hrefLang="en" href="/en/" />
        <link rel="alternate" hrefLang="zh" href="/zh/" />
        <link rel="alternate" hrefLang="x-default" href="/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Random Generator",
              description: "Discover amazing facts, thought-provoking questions, and hilarious jokes",
              url: "https://randomgenerator.com",
              applicationCategory: "Entertainment",
              operatingSystem: "Web Browser",
              inLanguage: ["en", "zh"],
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
