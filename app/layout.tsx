import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { inter, oswald } from "@/lib/fonts" // Importamos las fuentes

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body>{children}</body>
    </html>
  )
}
