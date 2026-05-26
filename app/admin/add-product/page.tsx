"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function AddProductPage() {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")

  async function handleAddProduct() {

    const response = await fetch(
      "/api/add-product",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          image,
          category,
        }),
      }
    )

    if (response.ok) {

      alert("Product Added 🚀")

      setName("")
      setDescription("")
      setPrice("")
      setImage("")
      setCategory("")

    } else {

      alert("Failed to add product")

    }

  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-12">
          Add Product
        </h1>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full rounded-xl bg-black border border-zinc-800 px-4 py-4 min-h-[140px]"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4"
          />

          <Button
            onClick={handleAddProduct}
            className="w-full h-14 rounded-xl text-lg"
          >

            Add Product

          </Button>

        </div>

      </div>

    </main>
  )
}