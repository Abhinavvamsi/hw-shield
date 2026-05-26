"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  useUser,
} from "@clerk/nextjs"

import { useRouter } from "next/navigation"

export default function AddProductPage() {

  const { user, isLoaded } = useUser()

  const router = useRouter()

  useEffect(() => {

    if (!isLoaded) return

    const isAdmin =
      user?.primaryEmailAddress
        ?.emailAddress ===
      "abhinavvamsi2004@gmail.com"

    if (!isAdmin) {

      router.push("/")

    }

  }, [user, isLoaded, router])

  const [name, setName] =
    useState("")

  const [description, setDescription] =
    useState("")

  const [price, setPrice] =
    useState("")

  const [image, setImage] =
    useState("")

  const [uploading, setUploading] =
    useState(false)

  const [category, setCategory] =
    useState("")

  const [stock, setStock] =
    useState("")

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      e.target.files?.[0]

    if (!file) return

    try {

      setUploading(true)

      const formData =
        new FormData()

      formData.append(
        "file",
        file
      )

      const response = await fetch(
        "/api/upload-image",
        {
          method: "POST",
          body: formData,
        }
      )

      const data =
        await response.json()

      setImage(data.imageUrl)

    } catch (error) {

      toast.error("Upload failed")

    } finally {

      setUploading(false)

    }

  }

  async function handleAddProduct() {

    const response = await fetch(
      "/api/add-product",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          image,
          category,
          stock: Number(stock),
        }),
      }
    )

    if (response.ok) {

     toast.success("Product Added 🚀")

      setName("")
      setDescription("")
      setPrice("")
      setImage("")
      setCategory("")
      setStock("")

    } else {

      toast.error("Failed to add product")

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

          {/* Cloudinary Upload */}
          <div className="space-y-4">

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageUpload
              }
              className="w-full text-sm text-zinc-400"
            />

            {uploading && (

              <p className="text-zinc-500">

                Uploading image...

              </p>

            )}

            {image && (

              <div className="space-y-4">

                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-72 object-cover rounded-2xl border border-zinc-800"
                />

                <p className="text-green-500 break-all text-sm">

                  Image uploaded successfully

                </p>

              </div>

            )}

          </div>

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full h-14 rounded-xl bg-black border border-zinc-800 px-4"
          />

          <input
            type="number"
            placeholder="Stock Quantity"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
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