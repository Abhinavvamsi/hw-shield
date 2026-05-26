import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image,
        category: body.category,
      },
    })

    return NextResponse.json(product)

  } catch (error) {

    return NextResponse.json(
      {
        error: "Failed to add product",
      },
      {
        status: 500,
      }
    )

  }

}