import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const { searchParams } =
      new URL(req.url)

    const id =
      searchParams.get("id")

    if (!id) {

      return NextResponse.json(
        {
          error: "Missing product id",
        },
        {
          status: 400,
        }
      )

    }

    const body = await req.json()

    const updatedProduct =
      await prisma.product.update({
        where: {
          id,
        },

        data: {
  name: body.name,
  description: body.description,
  price: body.price,
  images: body.images,
  category: body.category,
  stock: body.stock,
},
      })

    return NextResponse.json(
      updatedProduct
    )

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to update product",
      },
      {
        status: 500,
      }
    )

  }

}