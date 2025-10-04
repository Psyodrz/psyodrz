import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { NavbarFloating } from "@/components/navbar-floating"
import { MobileOptimizer } from "@/components/mobile-optimizer"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { CustomCursor } from "@/components/custom-cursor"
import { CursorEffects } from "@/components/cursor-effects"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

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
      <body className={`font-sans ${poppins.variable}`}>
        <CustomCursor />
        <CursorEffects />
        <PerformanceMonitor />
        <MobileOptimizer />
        <NavbarFloating />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
