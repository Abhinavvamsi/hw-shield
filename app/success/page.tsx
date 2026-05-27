"use client"

import Link from "next/link"

import { useSearchParams }
from "next/navigation"

import Navbar from "@/components/navbar"

import { Button }
from "@/components/ui/button"

export default function SuccessPage() {

  const searchParams =
    useSearchParams()

  const orderId =
    searchParams.get(
      "orderId"
    )

  return (

    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center">

          <div className="text-7xl mb-6">

            🎉

          </div>

          <h1 className="text-5xl font-bold">

            Payment Successful

          </h1>

          <p className="text-zinc-400 text-lg mt-6 leading-relaxed">

            Thank you for shopping with HW Shield.

            Your order has been placed successfully.

          </p>

          {/* Order ID */}
          <div className="mt-10 bg-black border border-zinc-800 rounded-2xl p-6">

            <p className="text-red-500 text-sm uppercase tracking-widest">

              Order ID

            </p>

            <p className="text-3xl font-bold mt-3 break-all">

              {orderId}

            </p>

          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">

            <Link href="/track-order">

              <Button
                className="rounded-xl px-8 py-6 text-lg"
              >

                Track Order

              </Button>

            </Link>

            <Link href="/">

              <Button
                variant="outline"
                className="rounded-xl px-8 py-6 text-lg"
              >

                Continue Shopping

              </Button>

            </Link>

          </div>

        </div>

      </div>

    </main>

  )

}