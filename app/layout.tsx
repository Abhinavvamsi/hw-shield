import { ClerkProvider } from "@clerk/nextjs"

import type { Metadata } from "next"

import Script from "next/script"

import "./globals.css"

import { Toaster } from "sonner"

import {
  ThemeProvider,
} from "@/components/theme-provider"

export const metadata: Metadata = {

  title: "HW Shield",

  description:
    "Premium Hot Wheels Protectors",

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

        {/* Razorpay */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        {/* Clerk */}
        <ClerkProvider>

          {/* Theme */}
          <ThemeProvider>

            {/* App */}
            {children}

            {/* Toasts */}
            <Toaster
              position="top-right"
              richColors
              closeButton
            />

          </ThemeProvider>

        </ClerkProvider>

      </body>

    </html>

  )

}