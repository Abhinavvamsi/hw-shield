"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
import { useCartStore } from "@/store/cart-store"

type ProductPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({
  params,
}: ProductPageProps) {

  const { id } = await params

  const product = products.find(
    (item) => item.id === Number(id)
  )

  if (!product) {
    notFound()
  }

  return (
    <ProductDetails product={product} />
  )
}

function ProductDetails({
  product,
}: {
  product: any
}) {

  const addToCart = useCartStore(
    (state) => state.addToCart
  )

  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Product Image */}
          <div className="relative h-[400px] md:h-[700px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900">

            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition duration-500"
            />

          </div>

          {/* Product Info */}
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

            {/* Quantity Selector */}
            <div className="mt-10">

              <p className="text-sm text-zinc-500 mb-4">
                Quantity
              </p>

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    setQuantity(
                      quantity > 1 ? quantity - 1 : 1
                    )
                  }
                  className="w-12 h-12 rounded-xl border border-zinc-700 text-xl"
                >
                  -
                </button>

                <div className="w-14 text-center text-xl font-semibold">
                  {quantity}
                </div>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="w-12 h-12 rounded-xl border border-zinc-700 text-xl"
                >
                  +
                </button>

              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <Button
                className="px-8 py-6 text-lg rounded-xl"
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
                      image: product.image,
                    })
                  }

                }}
              >
                Add to Cart
              </Button>

              <Button
  variant="outline"
  className="px-8 py-6 text-lg rounded-xl bg-transparent border-zinc-700"
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
        image: product.image,
      })
    }

    router.push("/checkout")

  }}
>
  Buy Now
</Button>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}