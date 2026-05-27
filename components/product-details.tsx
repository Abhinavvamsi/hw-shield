"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import Image from "next/image"

import Navbar from "@/components/navbar"

import { Button } from "@/components/ui/button"

import { useCartStore } from "@/store/cart-store"

import { toast } from "sonner"

export default function ProductDetails({
  product,
}: {
  product: any
}) {

  const addToCart = useCartStore(
    (state) => state.addToCart
  )

  const [quantity,
    setQuantity
  ] = useState(1)

  const [selectedImage,
    setSelectedImage
  ] = useState(0)

  const router = useRouter()

  return (

    <>

      <Navbar />

      <main className="min-h-screen bg-background text-foreground transition-colors duration-300">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            {/* LEFT SIDE */}
            <div>

              {/* Main Product Image */}
              <div className="relative h-[400px] md:h-[700px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 group">

                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />

              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-4 mt-5 overflow-x-auto pb-2">

                {product.images.map(
                  (
                    image: string,
                    index: number
                  ) => (

                    <button
                      key={index}
                      onClick={() =>
                        setSelectedImage(index)
                      }
                      className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                        selectedImage === index
                          ? "border-white scale-105"
                          : "border-zinc-800 hover:border-zinc-500"
                      }`}
                    >

                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />

                    </button>

                  )
                )}

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col justify-center">

              <p className="text-zinc-500 uppercase tracking-widest text-sm">

                {product.category}

              </p>

              <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">

                {product.name}

              </h1>

              <p className="text-4xl font-bold mt-6">

                ₹{product.price}

              </p>

              <p className="text-zinc-500 mt-8 leading-relaxed text-lg">

                {product.description}

              </p>

              {/* Stock */}
              <p
                className={`mt-6 font-semibold ${
                  product.stock > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >

                {product.stock > 0
                  ? `In Stock: ${product.stock}`
                  : "Out of Stock"}

              </p>

              {/* Quantity */}
              <div className="mt-10">

                <p className="text-sm text-zinc-500 mb-4">

                  Quantity

                </p>

                <div className="flex items-center gap-4">

                  <button
                    onClick={() =>
                      setQuantity(
                        quantity > 1
                          ? quantity - 1
                          : 1
                      )
                    }
                    className="w-12 h-12 rounded-xl border border-zinc-700 text-xl hover:border-white transition"
                  >

                    -

                  </button>

                  <div className="w-14 text-center text-xl font-semibold">

                    {quantity}

                  </div>

                  <button
                    onClick={() =>
                      setQuantity(
                        quantity + 1
                      )
                    }
                    className="w-12 h-12 rounded-xl border border-zinc-700 text-xl hover:border-white transition"
                  >

                    +

                  </button>

                </div>

              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">

                {/* Add To Cart */}
                <Button
                  disabled={product.stock === 0}
                  className="px-8 py-6 text-lg rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
                  onClick={() => {

                    for (
                      let i = 0;
                      i < quantity;
                      i++
                    ) {

                      addToCart({

                        id: product.id,

                        name: product.name,

                        price: product.price,

                        image:
                          product.images[0],

                        stock:
                          product.stock,

                      })

                    }

                    toast.success(
                      "Added to cart 🛒"
                    )

                  }}
                >

                  Add to Cart

                </Button>

                {/* Buy Now */}
                <Button
                  disabled={product.stock === 0}
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-xl bg-transparent border-zinc-700 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
                  onClick={() => {

                    for (
                      let i = 0;
                      i < quantity;
                      i++
                    ) {

                      addToCart({

                        id: product.id,

                        name: product.name,

                        price: product.price,

                        image:
                          product.images[0],

                        stock:
                          product.stock,

                      })

                    }

                    router.push(
                      "/checkout"
                    )

                  }}
                >

                  Buy Now

                </Button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </>

  )

}