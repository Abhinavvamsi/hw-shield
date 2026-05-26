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
          error: "Missing order id",
        },
        {
          status: 400,
        }
      )

    }

    const body = await req.json()

    const updatedOrder =
      await prisma.order.update({
        where: {
          id,
        },

        data: {
          status: body.status,
        },
      })

    return NextResponse.json(
      updatedOrder
    )

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to update order status",
      },
      {
        status: 500,
      }
    )

  }

}