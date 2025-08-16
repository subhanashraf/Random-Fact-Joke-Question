// app/about/page.tsx
import React from "react"
import Link from "next/link"

export const metadata = {
  title: "About Us | Random Generator",
  description:
    "Learn more about Random Generator - our mission to provide fun, educational, and family-friendly content including random facts, questions, and jokes.",
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="mb-4 text-lg leading-relaxed">
        Welcome to <strong>Random Generator</strong>! 🎉  
        Our mission is to make learning and entertainment fun for everyone.  
        We create a simple platform where you can discover random{" "}
        <span className="font-semibold">facts</span>, ask{" "}
        <span className="font-semibold">questions</span>, and laugh at{" "}
        <span className="font-semibold">jokes</span>.
      </p>

      <p className="mb-4 text-lg leading-relaxed">
        Whether you are a student, parent, or just curious, our platform
        provides clean, safe, and educational content suitable for all ages.  
        We believe that knowledge and humor should be shared freely and
        instantly.
      </p>

      <p className="mb-4 text-lg leading-relaxed">
        Our team is passionate about education and creativity. We work to
        deliver content that sparks curiosity, encourages learning, and brings
        smiles.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Thank you for visiting <strong>Random Generator</strong>. Keep
        exploring, keep learning, and keep laughing! 💡😂
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Home
        </Link>
        <Link
          href="/contact"
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300"
        >
          Contact Us
        </Link>
      </div>
    </main>
  )
}
