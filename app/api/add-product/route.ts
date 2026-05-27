import { prisma } from "@/lib/prisma"

import { NextResponse } from "next/server"

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json()

    const product =
      await prisma.product.create({

        data: {

          name:
            body.name,

          description:
            body.description,

          price:
            body.price,

          images:
            body.images,

          category:
            body.category,

          stock:
            body.stock,

        },

      })

    return NextResponse.json(
      product
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(

      {
        error:
          "Failed to add product",
      },

      {
        status: 500,
      }

    )

  }

}