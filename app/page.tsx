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

  images: string[]

  category: string

  stock: number

}

export default function Home() {

  const syncStock =
    useCartStore(
      (state) => state.syncStock
    )

  const [products,
    setProducts
  ] = useState<Product[]>([])

  const [loading,
    setLoading
  ] = useState(true)

  const [selectedCategory,
    setSelectedCategory
  ] = useState("All")

  const [search,
    setSearch
  ] = useState("")

  useEffect(() => {

    async function fetchProducts() {

      try {

        const response =
          await fetch(
            "/api/get-products",
            {
              cache: "no-store",
            }
          )

        const data =
          await response.json()

        /* Small delay for smooth skeleton animation */
        await new Promise(
          (resolve) =>
            setTimeout(resolve, 1200)
        )

        setProducts(data)

        data.forEach(
          (product: Product) => {

            syncStock(
              product.id,
              product.stock
            )

          }
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }

    }

    fetchProducts()

  }, [syncStock])

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
    products.filter((product) => {

      const matchesCategory =

        selectedCategory === "All"

          ? true

          : product.category ===
            selectedCategory

      const matchesSearch =

        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        product.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      return (
        matchesCategory &&
        matchesSearch
      )

    })

  return (

    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background text-foreground transition-colors duration-300">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">

        <div className="max-w-3xl">

          <p className="text-zinc-500 uppercase tracking-widest text-sm md:text-base">

            Premium Diecast & Protection

          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mt-4">

            Premium

            <span className="text-zinc-500 dark:text-zinc-400">

              {" "}Diecast Cars{" "}

            </span>

            & Protectors

          </h1>

          <p className="text-zinc-500 text-base md:text-lg mt-6 max-w-xl leading-relaxed">

            Discover premium Hot Wheels, collectible diecast cars, acrylic cases and soft protectors built for passionate collectors.

          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

  <a href="/protectors">

    <Button className="rounded-xl px-8 py-6 text-lg hover:scale-105 active:scale-95 transition-all duration-300">

      Protectors

    </Button>

  </a>

  <a href="/cars">

    <Button
      variant="outline"
      className="rounded-xl px-8 py-6 text-lg bg-transparent border-zinc-700 hover:bg-zinc-900 dark:hover:bg-zinc-900 hover:scale-105 active:scale-95 transition-all duration-300"
    >

      Diecast Cars

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

        {/* Section Header */}
        <div className="mb-10">

          <p className="text-zinc-500 uppercase tracking-widest text-sm">

            Featured Products

          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">

            Collector Favorites

          </h2>

        </div>

        {/* Search */}
        <div className="mb-8">

          <input
            type="text"
            placeholder="Search diecast cars & protectors..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
            w-full
            h-14
            rounded-2xl
            bg-zinc-900
            border
            border-zinc-800
            px-5
            text-white
            placeholder:text-zinc-500
            outline-none
            focus:border-white
            transition-all
            duration-300
            "
          />

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

        {/* Skeleton Loader */}
        {loading && (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {[...Array(6)].map((_, i) => (

              <div
                key={i}
                className="
                animate-pulse
                rounded-3xl
                overflow-hidden
                border
                border-zinc-800
                bg-zinc-900
                "
              >

                <div className="h-72 bg-zinc-800" />

                <div className="p-6 space-y-4">

                  <div className="h-6 bg-zinc-800 rounded w-2/3" />

                  <div className="h-4 bg-zinc-800 rounded w-full" />

                  <div className="h-4 bg-zinc-800 rounded w-5/6" />

                  <div className="h-10 bg-zinc-800 rounded-xl mt-6" />

                </div>

              </div>

            ))}

          </div>

        )}

        {/* Empty State */}
        {!loading &&
          filteredProducts.length === 0 && (

          <div className="text-center py-24">

            <h2 className="text-3xl font-bold">

              No products found 🔍

            </h2>

            <p className="text-zinc-500 mt-4">

              Try searching something else

            </p>

          </div>

        )}

        {/* Products Grid */}
        {!loading && (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.images?.[0]}
                description={product.description}
                stock={product.stock}
              />

            ))}

          </div>

        )}

      </section>

    </main>

  )

}