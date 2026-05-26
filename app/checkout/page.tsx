"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"

export default function CheckoutPage() {

  const cart = useCartStore((state) => state.cart)

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  )

  return (
    <main className="min-h-screen bg-background text-foreground">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">

        <h1 className="text-4xl md:text-5xl font-bold mb-12">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div>

            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

              <h2 className="text-2xl font-bold mb-8">
                Shipping Details
              </h2>

              <div className="space-y-6">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4 outline-none focus:border-white transition"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4 outline-none focus:border-white transition"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4 outline-none focus:border-white transition"
                />

                <textarea
                  placeholder="Full Address"
                  className="w-full rounded-xl bg-black border border-zinc-800 px-4 py-4 outline-none focus:border-white transition min-h-[120px]"
                />

                <div className="grid grid-cols-2 gap-4">

                  <input
                    type="text"
                    placeholder="City"
                    className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4 outline-none focus:border-white transition"
                  />

                  <input
                    type="text"
                    placeholder="Pincode"
                    className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4 outline-none focus:border-white transition"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div>

            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 sticky top-24">

              <h2 className="text-2xl font-bold mb-8">
                Order Summary
              </h2>

              <div className="space-y-6">

                {cart.map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >

                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black">

                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />

                    </div>

                    <div className="flex-1">

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-zinc-500 text-sm">
                        Premium Hot Wheels Protector
                      </p>

                    </div>

                    <p className="font-bold">
                      ₹{item.price}
                    </p>

                  </div>

                ))}

              </div>

              {/* Totals */}
              <div className="border-t border-zinc-800 mt-8 pt-8 space-y-4">

                <div className="flex items-center justify-between text-zinc-400">

                  <p>Subtotal</p>

                  <p>₹{total}</p>

                </div>

                <div className="flex items-center justify-between text-zinc-400">

                  <p>Shipping</p>

                  <p>₹49</p>

                </div>

                <div className="flex items-center justify-between text-2xl font-bold pt-4">

                  <p>Total</p>

                  <p>₹{total + 49}</p>

                </div>

              </div>

              {/* Pay Button */}
              <Button
                className="w-full h-14 rounded-xl text-lg mt-10 active:scale-95 transition"
                onClick={async () => {

                  const response = await fetch(
                    "/api/create-order",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        amount: total + 49,
                      }),
                    }
                  )

                  const order = await response.json()

                  const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

                    amount: order.amount,

                    currency: order.currency,

                    name: "HW Shield",

                    description: "Hot Wheels Protector Purchase",

                    order_id: order.id,

                    handler: function () {

  useCartStore.getState().clearCart()

  window.location.href = "/success"

},

                    theme: {
                      color: "#000000",
                    },
                  }

                  const razorpay = new (window as any).Razorpay(
                    options
                  )

                  razorpay.open()

                }}
              >

                Proceed to Payment

              </Button>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}