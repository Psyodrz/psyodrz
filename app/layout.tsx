import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { NavbarFloating } from "@/components/navbar-floating"
import { MobileOptimizer } from "@/components/mobile-optimizer"

export const metadata: Metadata = {
  title: "Aditya Srivastava — Portfolio",
  description: "Full Stack Developer — projects, skills, and contact.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark antialiased">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <MobileOptimizer />
        <NavbarFloating />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
