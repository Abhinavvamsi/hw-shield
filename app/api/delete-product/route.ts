import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { searchParams } =
    new URL(req.url)

  const id = searchParams.get("id")

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

  await prisma.product.delete({
    where: {
      id,
    },
  })

  return NextResponse.redirect(
    new URL("/admin/products", req.url)
  )

}