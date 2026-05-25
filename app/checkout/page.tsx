"use client"

import { useCartStore } from "@/store/cart-store"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {

  const cart = useCartStore((state) => state.cart)

  const totalPrice = cart.reduce(
    (total, item) => total + item.price,
    0
  )

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-4xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold mb-12">
          Checkout
        </h1>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="space-y-4">

            {cart.map((item, index) => (

              <div
                key={index}
                className="flex justify-between"
              >

                <p>{item.name}</p>

                <p>₹{item.price}</p>

              </div>

            ))}

          </div>

          <div className="border-t border-zinc-800 mt-8 pt-8 flex items-center justify-between">

            <div>

              <p className="text-zinc-500">
                Total
              </p>

              <h2 className="text-4xl font-bold mt-2">
                ₹{totalPrice}
              </h2>

            </div>

            <Button className="px-8 py-6 text-lg rounded-xl">
              Proceed to Payment
            </Button>

          </div>

        </div>

      </div>

    </main>
  )
}