import { prisma } from "@/lib/prisma"
import EditProductForm from "@/components/edit-product-form"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function EditPage({
  params,
}: Props) {

  const { id } = await params

  const product =
    await prisma.product.findUnique({
      where: {
        id,
      },
    })

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-12">
          Edit Product
        </h1>

        <EditProductForm
          product={product}
        />

      </div>

    </main>
  )
}