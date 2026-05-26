"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

import { useCartStore } from "@/store/cart-store"

import ProductCard from "@/components/product-card"

import Navbar from "@/components/navbar"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

export default function Home() {

  const syncStock =
    useCartStore(
      (state) => state.syncStock
    )

  const [products, setProducts] =
    useState<Product[]>([])

  const [selectedCategory,
    setSelectedCategory
  ] = useState("All")

  useEffect(() => {

    async function fetchProducts() {

      const response = await fetch(
        "/api/get-products",
        {
          cache: "no-store",
        }
      )

      const data =
        await response.json()

      setProducts(data)

      data.forEach(
        (product: Product) => {

          syncStock(
            product.id,
            product.stock
          )

        }
      )

    }

    fetchProducts()

  }, [])

  const categories = [

    "All",

    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    ),

  ]

  const filteredProducts =

    selectedCategory === "All"

      ? products

      : products.filter(
          (product) =>
            product.category ===
            selectedCategory
        )

  return (

    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background text-foreground transition-colors duration-300">

      {/* Global Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">

        <div className="max-w-3xl">

          <p className="text-zinc-500 uppercase tracking-widest text-sm md:text-base">

            Premium Protection

          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mt-4">

            Protect Your

            <span className="text-zinc-500 dark:text-zinc-400">

              {" "}Hot Wheels{" "}

            </span>

            Collection

          </h1>

          <p className="text-zinc-500 text-base md:text-lg mt-6 max-w-xl leading-relaxed">

            Premium acrylic and soft protectors built for collectors who value condition and display quality.

          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <a href="#products">

              <Button className="rounded-xl px-8 py-6 text-lg">

                Shop Now

              </Button>

            </a>

            <a href="#products">

              <Button
                variant="outline"
                className="rounded-xl px-8 py-6 text-lg bg-transparent border-zinc-700 hover:bg-zinc-900 dark:hover:bg-zinc-900"
              >

                View Collection

              </Button>

            </a>

          </div>

        </div>

      </section>

      {/* Products Section */}
      <section
        id="products"
        className="max-w-7xl mx-auto px-4 md:px-6 pb-20"
      >

        <div className="mb-10">

          <p className="text-zinc-500 uppercase tracking-widest text-sm">

            Featured Products

          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">

            Collector Favorites

          </h2>

        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 md:gap-4 mb-10">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`px-4 md:px-5 py-2 rounded-full border transition text-sm md:text-base ${
                selectedCategory === category
                  ? "bg-white text-black border-white"
                  : "border-zinc-700 text-zinc-400 hover:border-white hover:text-white dark:hover:text-white"
              }`}
            >

              {category}

            </button>

          ))}

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
              stock={product.stock}
            />

          ))}

        </div>

      </section>

    </main>

  )

}