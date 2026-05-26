export const dynamic = "force-dynamic"
import { prisma } from "@/lib/prisma"

export default async function OrdersPage() {

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-12">
          Orders Dashboard
        </h1>

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
            >

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    {order.customer}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    {order.email}
                  </p>

                  <p className="text-zinc-400">
                    {order.phone}
                  </p>

                  <p className="text-zinc-400">
                    {order.address}
                  </p>

                  <p className="text-zinc-400">
                    {order.city} - {order.pincode}
                  </p>

                </div>

                <div>

                  <p className="text-xl font-bold">
                    ₹{order.totalAmount}
                  </p>

                  <p className="text-zinc-500 mt-2 break-all">
                    Payment ID:
                    <br />
                    {order.paymentId}
                  </p>

                  <p className="text-zinc-500 mt-4">
                    Ordered On:
                    <br />
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}
