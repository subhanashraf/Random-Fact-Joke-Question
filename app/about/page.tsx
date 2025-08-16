"use client"

import Head from "next/head"
import AboutContent from "./aboutpage"

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | Random Generator</title>
        <meta
          name="description"
          content="Learn more about Random Generator - our mission to provide fun, educational, and family-friendly content including random facts, questions, and jokes."
        />
      </Head>

      <AboutContent />
    </>
  )
}
