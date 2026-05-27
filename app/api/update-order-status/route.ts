import { prisma } from "@/lib/prisma"

import { NextResponse }
from "next/server"

import { currentUser }
from "@clerk/nextjs/server"

export async function POST(
  req: Request
) {

  try {

    /* Protect API */
    const user =
      await currentUser()

    const isAdmin =
      user?.primaryEmailAddress
        ?.emailAddress ===
      "abhinavvamsi2004@gmail.com"

    if (!isAdmin) {

      return NextResponse.json(

        {
          error:
            "Unauthorized",
        },

        {
          status: 401,
        }

      )

    }

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

    /* Update Order */
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

    console.log(error)

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