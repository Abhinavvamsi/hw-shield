import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-16">

          {/* Product Image */}
          <div className="relative h-[600px] rounded-3xl overflow-hidden border border-zinc-800">

            <Image
              src="/images/IMG_3624-Large-1.jpeg"
              alt="Mainline Protector"
              fill
              className="object-cover"
            />

          </div>

          {/* Product Info */}
          <div>

            <p className="text-zinc-500 uppercase tracking-widest">
              HW Shield
            </p>

            <h1 className="text-5xl font-bold mt-4">
              Mainline Protector
            </h1>

            <p className="text-3xl font-bold mt-6">
              ₹39
            </p>

            <p className="text-zinc-400 mt-8 leading-relaxed text-lg">
              Premium crystal-clear protector designed specifically for Hot Wheels mainline cards.
              Built for collectors who want maximum protection while maintaining display quality.
            </p>

            <div className="flex gap-4 mt-10">

              <Button className="px-8 py-6 text-lg rounded-xl">
                Add to Cart
              </Button>

              <Button
                variant="outline"
                className="px-8 py-6 text-lg rounded-xl bg-transparent border-zinc-700 text-white"
              >
                Buy Now
              </Button>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}