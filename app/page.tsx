"use client"

import { useCartStore } from "@/store/cart-store"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {

  const addToCart = useCartStore((state) => state.addToCart)
  const cart = useCartStore((state) => state.cart)

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">

      {/* Navbar */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <h1 className="text-2xl font-bold">
            HW Shield
          </h1>

          <div className="flex gap-6 text-zinc-300">

            <button className="hover:text-white transition">
              Shop
            </button>

            <button className="hover:text-white transition">
              Collections
            </button>

            <Link
                href="/cart"
                className="hover:text-white transition"
            >
              Cart ({cart.length})
            </Link>

          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="max-w-3xl">

          <p className="text-zinc-400 uppercase tracking-widest">
            Premium Protection
          </p>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight mt-4">
            Protect Your
            <span className="text-zinc-400"> Hot Wheels </span>
            Collection
          </h1>

          <p className="text-zinc-500 text-lg mt-6 max-w-xl">
            Premium acrylic and soft protectors built for collectors who value condition and display quality.
          </p>

          <div className="flex gap-4 mt-10">

            <Button className="rounded-xl px-8 py-6 text-lg">
              Shop Now
            </Button>

            <Button
              variant="outline"
              className="rounded-xl px-8 py-6 text-lg bg-transparent text-white border-zinc-700 hover:bg-zinc-900"
            >
              View Collection
            </Button>

          </div>

        </div>

      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="mb-10">

          <p className="text-zinc-500 uppercase tracking-widest text-sm">
            Featured Products
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Collector Favorites
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Product Card 1 */}
          <Link href="/products/1">

            <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-500 hover:-translate-y-2 transition duration-300 cursor-pointer">

              <div className="relative h-72 overflow-hidden">

                <Image
                  src="/images/IMG_3624-Large-1.jpeg"
                  alt="Mainline Protector"
                  fill
                  className="object-cover hover:scale-110 transition duration-500"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-semibold">
                  Mainline Protector
                </h3>

                <p className="text-zinc-500 mt-2">
                  Crystal clear protector for standard Hot Wheels mainline cards.
                </p>

                <div className="flex items-center justify-between mt-6">

                  <p className="text-2xl font-bold">
                    ₹39
                  </p>

                  <Button
                    onClick={(e) => {
                      e.preventDefault()

                      addToCart({
                        id: 1,
                        name: "Mainline Protector",
                        price: 39,
                        image: "/images/IMG_3624-Large-1.jpeg",
                      })
                    }}
                  >
                    Add to Cart
                  </Button>

                </div>

              </div>

            </div>

          </Link>

          {/* Product Card 2 */}
          <Link href="/products/2">

            <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-500 hover:-translate-y-2 transition duration-300 cursor-pointer">

              <div className="relative h-72 overflow-hidden">

                <Image
                  src="/images/IMG_3629.webp"
                  alt="Premium Protector"
                  fill
                  className="object-cover hover:scale-110 transition duration-500"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-semibold">
                  Premium Protector
                </h3>

                <p className="text-zinc-500 mt-2">
                  Premium protector built for Hot Wheels premium cards.
                </p>

                <div className="flex items-center justify-between mt-6">

                  <p className="text-2xl font-bold">
                    ₹79
                  </p>

                  <Button
                    onClick={(e) => {
                      e.preventDefault()

                      addToCart({
                        id: 2,
                        name: "Premium Protector",
                        price: 79,
                        image: "/images/IMG_3629.webp",
                      })
                    }}
                  >
                    Add to Cart
                  </Button>

                </div>

              </div>

            </div>

          </Link>

          {/* Product Card 3 */}
          <Link href="/products/3">

            <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-500 hover:-translate-y-2 transition duration-300 cursor-pointer">

              <div className="relative h-72 overflow-hidden">

                <Image
                  src="/images/mainline 5 pack.png"
                  alt="Mainline 5 Cars Protector"
                  fill
                  className="object-cover hover:scale-110 transition duration-500"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-semibold">
                  Mainline 5 Cars Protector
                </h3>

                <p className="text-zinc-500 mt-2">
                  Strong protector case designed for 5-pack Hot Wheels collections.
                </p>

                <div className="flex items-center justify-between mt-6">

                  <p className="text-2xl font-bold">
                    ₹149
                  </p>

                  <Button
                    onClick={(e) => {
                      e.preventDefault()

                      addToCart({
                        id: 3,
                        name: "Mainline 5 Cars Protector",
                        price: 149,
                        image: "/images/mainline 5 pack.png",
                      })
                    }}
                  >
                    Add to Cart
                  </Button>

                </div>

              </div>

            </div>

          </Link>

          {/* Product Card 4 */}
          <Link href="/products/4">

            <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-500 hover:-translate-y-2 transition duration-300 cursor-pointer">

              <div className="relative h-72 overflow-hidden">

                <Image
                  src="/images/Photoroom_20250213_125348-Large.webp"
                  alt="Premium 5 Cars Protector"
                  fill
                  className="object-cover hover:scale-110 transition duration-500"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-semibold">
                  Premium 5 Cars Protector
                </h3>

                <p className="text-zinc-500 mt-2">
                  Premium-grade protector for Hot Wheels premium 5-packs.
                </p>

                <div className="flex items-center justify-between mt-6">

                  <p className="text-2xl font-bold">
                    ₹199
                  </p>

                  <Button
                    onClick={(e) => {
                      e.preventDefault()

                      addToCart({
                        id: 4,
                        name: "Premium 5 Cars Protector",
                        price: 199,
                        image: "/images/Photoroom_20250213_125348-Large.webp",
                      })
                    }}
                  >
                    Add to Cart
                  </Button>

                </div>

              </div>

            </div>

          </Link>

          {/* Product Card 5 */}
          <Link href="/products/5">

            <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-500 hover:-translate-y-2 transition duration-300 cursor-pointer">

              <div className="relative h-72 overflow-hidden">

                <Image
                  src="/images/IMG_8002-Large.webp"
                  alt="Team Transport Protector"
                  fill
                  className="object-cover hover:scale-110 transition duration-500"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-semibold">
                  Team Transport Protector
                </h3>

                <p className="text-zinc-500 mt-2">
                  Collector-grade protector specially designed for Team Transport cards.
                </p>

                <div className="flex items-center justify-between mt-6">

                  <p className="text-2xl font-bold">
                    ₹249
                  </p>

                  <Button
                    onClick={(e) => {
                      e.preventDefault()

                      addToCart({
                        id: 5,
                        name: "Team Transport Protector",
                        price: 249,
                        image: "/images/IMG_8002-Large.webp",
                      })
                    }}
                  >
                    Add to Cart
                  </Button>

                </div>

              </div>

            </div>

          </Link>

          {/* Product Card 6 */}
          <Link href="/products/6">

            <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-500 hover:-translate-y-2 transition duration-300 cursor-pointer">

              <div className="relative h-72 overflow-hidden">

                <Image
                  src="/images/Photoroom_20250220_140312-Large.webp"
                  alt="Two Pack Protector"
                  fill
                  className="object-cover hover:scale-110 transition duration-500"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-semibold">
                  Two Pack Protector
                </h3>

                <p className="text-zinc-500 mt-2">
                  Durable protector for preserving Hot Wheels two-pack cards.
                </p>

                <div className="flex items-center justify-between mt-6">

                  <p className="text-2xl font-bold">
                    ₹99
                  </p>

                  <Button
                    onClick={(e) => {
                      e.preventDefault()

                      addToCart({
                        id: 6,
                        name: "Two Pack Protector",
                        price: 99,
                        image: "/images/Photoroom_20250220_140312-Large.webp",
                      })
                    }}
                  >
                    Add to Cart
                  </Button>

                </div>

              </div>

            </div>

          </Link>

        </div>

      </section>

    </main>
  )
}