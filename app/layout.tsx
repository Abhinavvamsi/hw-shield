import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "HW Shield",
  description: "Premium Hot Wheels Protectors",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >

      <body>

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        <ClerkProvider>

  <ThemeProvider>

    {children}

  </ThemeProvider>

</ClerkProvider>

      </body>

    </html>
  )
}