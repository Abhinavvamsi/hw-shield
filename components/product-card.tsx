"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"

type ProductCardProps = {
  id: string
  name: string
  price: number
  image: string
  description: string
  stock: number
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
  stock,
}: ProductCardProps) {

  const addToCart = useCartStore(
    (state) => state.addToCart
  )

  const router = useRouter()

  const { user } = useUser()

  return (

    <Link href={`/products/${id}`}>

      <div className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-500 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 cursor-pointer">

        {/* Product Image */}
        <div className="relative h-72 overflow-hidden">

          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

        </div>

        {/* Product Info */}
        <div className="p-6">

          <h3 className="text-2xl font-bold">
            {name}
          </h3>

          <p className="text-zinc-500 mt-3 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center justify-between mt-8">

            <p className="text-3xl font-bold">
              ₹{price}
            </p>

          </div>

          {/* Stock Status */}
          <p
            className={`mt-4 font-medium ${
              stock > 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >

            {stock > 0
              ? `In Stock: ${stock}`
              : "Out of Stock"}

          </p>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">

            {/* Add to Cart */}
            <Button
              disabled={stock === 0}
              className="flex-1 h-12 rounded-xl text-base font-semibold transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={(e) => {

                e.preventDefault()

                if (!user) {

                  router.push("/sign-in")

                  return

                }

                addToCart({
                  id,
                  name,
                  price,
                  image,
                  stock,
                })

              }}
            >

              Add to Cart

            </Button>

            {/* Buy Now */}
            <Button
              disabled={stock === 0}
              variant="outline"
              className="flex-1 h-12 rounded-xl text-base font-semibold border-zinc-700 hover:bg-white hover:text-black transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={(e) => {

                e.preventDefault()

                if (!user) {

                  router.push("/sign-in")

                  return

                }

                addToCart({
                  id,
                  name,
                  price,
                  image,
                })

                router.push("/checkout")

              }}
            >

              Buy Now

            </Button>

          </div>

        </div>

      </div>

    </Link>

  )
}