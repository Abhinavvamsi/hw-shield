"use client"

import { useState } from "react"

import Image from "next/image"

import Navbar from "@/components/navbar"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import { useCartStore } from "@/store/cart-store"

import { toast } from "sonner"

import {
  RedirectToSignIn,
  useUser,
} from "@clerk/nextjs"

export default function CheckoutPage() {

  const cart = useCartStore(
    (state) => state.cart
  )

  const { user } = useUser()

  if (!user) {

    return <RedirectToSignIn />

  }

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.price *
      item.quantity,
    0
  )

  const [customer,
    setCustomer
  ] = useState(
    user.fullName || ""
  )

  const [email,
    setEmail
  ] = useState(
    user.primaryEmailAddress
      ?.emailAddress || ""
  )

  const [phone,
    setPhone
  ] = useState("")

  const [address,
    setAddress
  ] = useState("")

  const [city,
    setCity
  ] = useState("")

  const [pincode,
    setPincode
  ] = useState("")

  return (

    <main className="min-h-screen bg-background text-foreground">

      {/* Global Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold">

              Checkout

            </h1>

            <p className="text-zinc-500 mt-4">

              Complete your order securely.

            </p>

          </div>

          <Link href="/cart">

            <Button
              variant="outline"
              className="rounded-xl"
            >

              Back to Cart

            </Button>

          </Link>

        </div>

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
                  value={customer}
                  onChange={(e) =>
                    setCustomer(
                      e.target.value
                    )
                  }
                  className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4 outline-none focus:border-white transition"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4 outline-none focus:border-white transition"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4 outline-none focus:border-white transition"
                />

                <textarea
                  placeholder="Full Address"
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl bg-black border border-zinc-800 px-4 py-4 outline-none focus:border-white transition min-h-[120px]"
                />

                <div className="grid grid-cols-2 gap-4">

                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) =>
                      setCity(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4 outline-none focus:border-white transition"
                  />

                  <input
                    type="text"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) =>
                      setPincode(
                        e.target.value
                      )
                    }
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

                {cart.map((item) => (

                  <div
                    key={item.id}
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
                      {" "}×{" "}
                      {item.quantity}

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

                  if (
                    !customer ||
                    !email ||
                    !phone ||
                    !address ||
                    !city ||
                    !pincode
                  ) {

                    toast.error(
                      "Please fill all fields"
                    )

                    return

                  }

                  const response =
                    await fetch(
                      "/api/create-order",
                      {
                        method: "POST",

                        headers: {
                          "Content-Type":
                            "application/json",
                        },

                        body: JSON.stringify({

                          amount:
                            total + 49,

                        }),

                      }
                    )

                  const order =
                    await response.json()

                  const options = {

                    key:
                      process.env
                        .NEXT_PUBLIC_RAZORPAY_KEY_ID,

                    amount:
                      order.amount,

                    currency:
                      order.currency,

                    name:
                      "HW Shield",

                    description:
                      "Hot Wheels Protector Purchase",

                    order_id:
                      order.id,

                    handler:
                      async function (
                        response: any
                      ) {

                        const saveOrderResponse =
                          await fetch(
                            "/api/save-order",
                            {

                              method:
                                "POST",

                              headers: {
                                "Content-Type":
                                  "application/json",
                              },

                              body:
                                JSON.stringify({

                                  userId:
                                    user.id,

                                  customer,

                                  email,

                                  phone,

                                  address,

                                  city,

                                  pincode,

                                  products:
                                    cart,

                                  totalAmount:
                                    total + 49,

                                  paymentId:
                                    response
                                      .razorpay_payment_id,

                                }),

                            }
                          )

                        const savedOrder =
                          await saveOrderResponse.json()

                        useCartStore
                          .getState()
                          .clearCart()

                        window.location.href =
                          `/success?orderId=${savedOrder.orderId}`

                      },

                    theme: {
                      color:
                        "#000000",
                    },

                  }

                  const razorpay =
                    new (
                      window as any
                    ).Razorpay(
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