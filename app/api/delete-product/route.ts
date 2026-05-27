import { prisma } from "@/lib/prisma"

import { NextResponse } from "next/server"

import { currentUser } from "@clerk/nextjs/server"

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
          error: "Unauthorized",
        },

        {
          status: 401,
        }

      )

    }

    /* Get Product ID */
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

    /* Delete Product */
    await prisma.product.delete({

      where: {
        id,
      },

    })

    /* Redirect */
    return NextResponse.redirect(

      new URL(
        "/admin/products",
        req.url
      )

    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(

      {
        error:
          "Failed to delete product",
      },

      {
        status: 500,
      }

    )

  }

}