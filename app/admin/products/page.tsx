export const dynamic = "force-dynamic"

import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { toast } from "sonner"

import {
  currentUser,
} from "@clerk/nextjs/server"

import { redirect } from "next/navigation"

export default async function ProductsPage() {

  const user = await currentUser()

  const isAdmin =
    user?.primaryEmailAddress
      ?.emailAddress ===
    "abhinavvamsi2004@gmail.com"

  if (!isAdmin) {

    redirect("/")

  }

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-12">
          Product Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
            >

              <div className="relative h-72">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="p-6">

                <p className="text-zinc-500 text-sm uppercase">
                  {product.category}
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {product.name}
                </h2>

                <p className="text-zinc-400 mt-4 line-clamp-3">
                  {product.description}
                </p>

                <p className="text-green-500 mt-4 font-semibold">
                  Stock: {product.stock}
                </p>

                <div className="flex items-center justify-between mt-6">

                  <p className="text-3xl font-bold">
                    ₹{product.price}
                  </p>

                </div>

                <a
                  href={`/admin/products/${product.id}/edit`}
                >

                  <button
                    className="w-full mt-6 h-12 rounded-xl bg-white text-black hover:scale-[1.02] active:scale-95 transition font-semibold"
                  >

                    Edit Product

                  </button>

                </a>

                <form
                  action={`/api/delete-product?id=${product.id}`}
                  method="POST"
                >

                  <button
                    className="w-full mt-6 h-12 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold"
                  >

                    Delete Product

                  </button>

                </form>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}