import Script from "next/script"
import type { Metadata } from "next"
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
    <html lang="en" suppressHydrationWarning>

      <body>

        <ThemeProvider>

          {children}

        </ThemeProvider>

        <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      </body>

    </html>
  )
}