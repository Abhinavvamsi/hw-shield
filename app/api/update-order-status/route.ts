import { prisma } from "@/lib/prisma"

import { NextResponse }
from "next/server"

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json()

    const order =
      await prisma.order.findUnique({

        where: {
          id: body.orderId,
        },

      })

    if (!order) {

      return NextResponse.json(
        {
          error:
            "Order not found",
        },
        {
          status: 404,
        }
      )

    }

    /* Restore stock if cancelled */
    if (
      body.status ===
      "Cancelled"
    ) {

      const products =
        order.products as any[]

      for (const item of products) {

        await prisma.product.update({

          where: {
            id: item.id,
          },

          data: {

            stock: {
              increment:
                item.quantity,
            },

          },

        })

      }

    }

    const updatedOrder =
      await prisma.order.update({

        where: {
          id: body.orderId,
        },

        data: {
          status:
            body.status,
        },

      })

    return NextResponse.json(
      updatedOrder
    )

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to update order",
      },
      {
        status: 500,
      }
    )

  }

}