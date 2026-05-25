
"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"

export default function CartPage() {

  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)

  const totalPrice = cart.reduce(
    (total, item) => total + item.price,
    0
  )

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold mb-12">
          Your Cart
        </h1>

        {cart.length === 0 ? (

          <p className="text-zinc-500">
            Your cart is empty.
          </p>

        ) : (

          <div className="space-y-6">

            {cart.map((item, index) => (

              <div
                key={index}
                className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
              >

                <div className="flex items-center gap-6">

                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div>

  <h2 className="text-2xl font-semibold">
    {item.name}
  </h2>

  <p className="text-zinc-500 mt-2">
    ₹{item.price}
  </p>

</div>

<Button
  variant="destructive"
  onClick={() => removeFromCart(index)}
>
  Remove
</Button>

</div>

              </div>

            ))}

            <div className="flex items-center justify-between mt-10 border-t border-zinc-800 pt-10">

              <div>

                <p className="text-zinc-500">
                  Total
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  ₹{totalPrice}
                </h2>

              </div>

              <Link href="/checkout">

  <Button className="px-8 py-6 text-lg rounded-xl">
    Checkout
  </Button>

</Link>

            </div>

          </div>

        )}

      </div>

    </main>
  )
}