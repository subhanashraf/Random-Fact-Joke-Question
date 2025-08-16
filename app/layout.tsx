import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://random-fact-joke-question.vercel.app/"),
  title: {
    default: "Random Generator - Facts, Questions & Jokes | Educational Fun for All Ages",
    template: "%s | Random Generator",
  },
  description:
    "Generate amazing random facts, thought-provoking questions, and hilarious jokes instantly! Educational and entertaining content perfect for kids, families, and learners of all ages.",
  keywords: [
    "random facts generator",
    "random questions generator",
    "random jokes generator",
    "educational content",
    "kids learning",
    "family entertainment",
    "fun facts",
    "trivia questions",
    "clean jokes",
    "随机事实生成器",
    "随机问题生成器",
    "随机笑话生成器",
    "教育内容",
    "儿童学习",
    "家庭娱乐",
  ],
  authors: [{ name: "Random Generator Team", url: "https://random-fact-joke-question.vercel.app/" }],
  creator: "Random Generator Team",
  publisher: "Random Generator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "zh-CN": "/zh",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    url: "https://random-fact-joke-question.vercel.app/",
    siteName: "Random Generator",
    title: "Random Generator - Facts, Questions & Jokes | Educational Fun",
    description:
      "Generate amazing random facts, thought-provoking questions, and hilarious jokes instantly! Perfect for kids, families, and learners.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Random Generator - Educational Fun for All Ages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@randomgenerator",
    creator: "@randomgenerator",
    title: "Random Generator - Facts, Questions & Jokes",
    description: "Generate amazing random facts, thought-provoking questions, and hilarious jokes instantly!",
    images: ["/twitter-image.png"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "education",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
     
     <meta name="google-adsense-account" content="ca-pub-4747537655684073"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light dark" />
       <link rel="icon" href="cd8df6f2-2fd3-4c27-bc5b-8fb3d8bfd0bf-removebg-preview.png" sizes="32x32" />
        <link rel="icon" href="cd8df6f2-2fd3-4c27-bc5b-8fb3d8bfd0bf-removebg-preview.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="cd8df6f2-2fd3-4c27-bc5b-8fb3d8bfd0bf-removebg-preview.png" />
        <link rel="manifest" href="/manifest.json" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

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
              alternateName: "随机生成器",
              description: "Generate amazing random facts, thought-provoking questions, and hilarious jokes instantly",
              url: "https://random-fact-joke-question.vercel.app/",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web Browser",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              inLanguage: ["en-US", "zh-CN"],
              audience: {
                "@type": "Audience",
                audienceType: "Children, Families, Students, Educators",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              creator: {
                "@type": "Organization",
                name: "Random Generator Team",
              },
              datePublished: "2024-01-01",
              dateModified: new Date().toISOString().split("T")[0],
              keywords: "random facts, questions, jokes, education, kids, family",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "1250",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />

        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen"  cz-shortcut-listen="true">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey="random-generator-theme"
        >
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
