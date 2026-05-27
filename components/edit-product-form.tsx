"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import { toast } from "sonner"

type Product = {

  id: string

  name: string

  description: string

  price: number

  images: string[]

  category: string

  stock: number

}

export default function EditProductForm({
  product,
}: {
  product: Product
}) {

  const router =
    useRouter()

  const [name, setName] =
    useState(product.name)

  const [
    description,
    setDescription,
  ] = useState(
    product.description
  )

  const [price, setPrice] =
    useState(product.price)

  const [images, setImages] =
    useState<string[]>(
      product.images || []
    )

  const [category, setCategory] =
    useState(product.category)

  const [stock, setStock] =
    useState(product.stock)

  async function handleUpdate() {

    const response =
      await fetch(
        `/api/update-product?id=${product.id}`,
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            name,

            description,

            price:
              Number(price),

            images,

            category,

            stock,

          }),

        }
      )

    if (response.ok) {

      toast.success(
        "Product Updated 🚀"
      )

      router.push(
        "/admin/products"
      )

      router.refresh()

    } else {

      toast.error(
        "Failed to update"
      )

    }

  }

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">

      {/* Name */}
      <input
        type="text"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
        className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4"
      />

      {/* Description */}
      <textarea
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        className="w-full rounded-xl bg-black border border-zinc-800 px-4 py-4 min-h-[140px]"
      />

      {/* Price */}
      <input
        type="number"
        value={price}
        onChange={(e) =>
          setPrice(
            Number(
              e.target.value
            )
          )
        }
        className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4"
      />

      {/* Images */}
      <div className="space-y-4">

        {images.map(
          (image, index) => (

            <input
              key={index}
              type="text"
              value={image}
              onChange={(e) => {

                const updated =
                  [...images]

                updated[index] =
                  e.target.value

                setImages(
                  updated
                )

              }}
              className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4"
            />

          )
        )}

      </div>

      {/* Category */}
      <select
        value={category}
        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }
        className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4 text-white"
      >

        <option value="Protectors">

          Protectors

        </option>

        <option value="Cars">

          Cars

        </option>

      </select>

      {/* Stock */}
      <input
        type="number"
        placeholder="Stock Quantity"
        value={stock}
        onChange={(e) =>
          setStock(
            Number(
              e.target.value
            )
          )
        }
        className="w-full h-16 rounded-2xl bg-black border border-zinc-800 px-6 text-lg"
      />

      {/* Update Button */}
      <button
        onClick={handleUpdate}
        className="w-full h-14 rounded-xl bg-white text-black font-bold hover:scale-[1.02] active:scale-95 transition"
      >

        Update Product

      </button>

    </div>

  )

}