import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { Geist_Mono, Exo as V0_Font_Exo, Geist_Mono as V0_Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _exo = V0_Font_Exo({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

export const metadata: Metadata = {
  title: "CarHub - Community Car Maintenance",
  description: "Connect with car enthusiasts, share maintenance guides, and discover events",
  generator: "v0.app",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/placeholder-logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CarHub",
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CarHub" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/service-worker.js'); }`,
          }}
        />
      </body>
    </html>
  )
}
