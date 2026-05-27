import { notFound } from "next/navigation"

import { prisma } from "@/lib/prisma"

import ProductDetails from "@/components/product-details"

type ProductPageProps = {

  params: Promise<{
    id: string
  }>

}

export default async function ProductPage({
  params,
}: ProductPageProps) {

  const { id } = await params

  const product =
    await prisma.product.findUnique({

      where: {
        id,
      },

    })

  if (!product) {

    notFound()

  }

  return (

    <ProductDetails product={product} />

  )

}