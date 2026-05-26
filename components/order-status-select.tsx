"use client"

import { useRouter } from "next/navigation"

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: string
}) {

  const router = useRouter()

  async function updateStatus(
    status: string
  ) {

    await fetch(
      `/api/update-order-status?id=${orderId}`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          status,
        }),
      }
    )

    router.refresh()

  }

  return (
    <select
      value={currentStatus}
      onChange={(e) =>
        updateStatus(e.target.value)
      }
      className="mt-6 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
    >

      <option value="Pending">
        Pending
      </option>

      <option value="Packed">
        Packed
      </option>

      <option value="Shipped">
        Shipped
      </option>

      <option value="Delivered">
        Delivered
      </option>

    </select>
  )
}