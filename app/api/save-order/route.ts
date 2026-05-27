import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const body = await req.json()
    const orderId =
    `HWS-${Date.now()}`

    const order =
    await prisma.order.create({

    data: {

  orderId,

  userId:
    body.userId,

  customer:
    body.customer,

  email:
    body.email,

  phone:
    body.phone,

  address:
    body.address,

  city:
    body.city,

  pincode:
    body.pincode,

  products:
    body.products,

  totalAmount:
    body.totalAmount,

  paymentId:
    body.paymentId,

},
})
    // Reduce stock after successful order
    for (const item of body.products) {

      await prisma.product.update({

        where: {
          id: item.id,
        },

        data: {

          stock: {
            decrement:
              item.quantity,
          },

        },

      })

    }

    return NextResponse.json(order)

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to save order",
      },
      {
        status: 500,
      }
    )

  }

}