"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SuccessPage() {

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">

      <div className="max-w-2xl w-full text-center bg-zinc-900 border border-zinc-800 rounded-3xl p-10 md:p-16">

        <div className="text-7xl mb-6">
          🎉
        </div>

        <h1 className="text-4xl md:text-5xl font-bold">
          Payment Successful
        </h1>

        <p className="text-zinc-500 text-lg mt-6 leading-relaxed">
          Thank you for shopping with HW Shield.
          Your order has been placed successfully.
        </p>

        <div className="mt-10">

          <Link href="/">

            <Button className="h-14 px-10 rounded-xl text-lg active:scale-95 transition">

              Continue Shopping

            </Button>

          </Link>

        </div>

      </div>

    </main>
  )
}