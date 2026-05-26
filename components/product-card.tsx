"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { useRouter } from "next/navigation"

type ProductCardProps = {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
}: ProductCardProps) {

  const addToCart = useCartStore((state) => state.addToCart)

  const router = useRouter()

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

          {/* Buttons */}
          <div className="flex gap-3 mt-6">

            {/* Add to Cart */}
            <Button
              className="flex-1 h-12 rounded-xl text-base font-semibold transition-all duration-150 hover:scale-105 active:scale-95"
              onClick={(e) => {

                e.preventDefault()

                addToCart({
                  id,
                  name,
                  price,
                  image,
                })

              }}
            >
              Add to Cart
            </Button>

            {/* Buy Now */}
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl text-base font-semibold border-zinc-700 hover:bg-white hover:text-black transition-all duration-150 hover:scale-105 active:scale-95"
              onClick={(e) => {

                e.preventDefault()

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