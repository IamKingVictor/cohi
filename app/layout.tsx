import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LenisProvider from "@/components/LenisProvider"
import Navigation from "@/components/Navigation"
import GlobalBackground from "@/components/GlobalBackground"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "COHI Branding Agency",
  description: "Culture. Owns. Human. Influence.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LenisProvider>
          <GlobalBackground />
          <Navigation />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
