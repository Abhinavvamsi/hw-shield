import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {

  try {

    const { searchParams } =
      new URL(req.url)

    const paymentId =
      searchParams.get("paymentId")

    if (!paymentId) {

      return NextResponse.json(
        {
          error: "Missing payment ID",
        },
        {
          status: 400,
        }
      )

    }

    const order =
      await prisma.order.findFirst({
        where: {
          paymentId,
        },
      })

    if (!order) {

      return NextResponse.json(
        {
          error: "Order not found",
        },
        {
          status: 404,
        }
      )

    }

    return NextResponse.json(order)

  } catch (error) {

    return NextResponse.json(
      {
        error: "Failed to track order",
      },
      {
        status: 500,
      }
    )

  }

}