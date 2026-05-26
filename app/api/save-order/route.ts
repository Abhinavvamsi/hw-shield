import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const order = await prisma.order.create({
      data: {
        customer: body.customer,
        email: body.email,
        phone: body.phone,
        address: body.address,
        city: body.city,
        pincode: body.pincode,

        products: body.products,

        totalAmount: body.totalAmount,

        paymentId: body.paymentId,
      },
    })

    return NextResponse.json(order)

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to save order" },
      { status: 500 }
    )

  }

}
