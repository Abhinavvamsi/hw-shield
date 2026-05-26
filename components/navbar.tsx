"use client"

import Link from "next/link"
import { toast } from "sonner"

import {
  Menu,
  X,
} from "lucide-react"

import {
  useState,
} from "react"

import ThemeToggle from "@/components/theme-toggle"

import {
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs"

import { useCartStore } from "@/store/cart-store"

export default function Navbar() {

  const { user } = useUser()

  const cart =
    useCartStore(
      (state) => state.cart
    )

  const [mobileMenuOpen,
    setMobileMenuOpen
  ] = useState(false)

  const isAdmin =
    user?.primaryEmailAddress
      ?.emailAddress ===
    "abhinavvamsi2004@gmail.com"

  return (

    <nav className="border-b border-zinc-800 sticky top-0 backdrop-blur-xl bg-background/70 z-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold"
        >

          HW Shield

        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-zinc-300">

          <a
            href="/#products"
            className="hover:text-white transition"
          >

            Shop

          </a>

          <a
            href="/#products"
            className="hover:text-white transition"
          >

            Collections

          </a>

          <Link
            href="/track-order"
            className="hover:text-white transition"
          >

            Track Order

          </Link>

          <Link
            href="/cart"
            className="hover:text-white transition"
          >

            Cart ({cart.length})

          </Link>

          {isAdmin && (

            <Link
              href="/admin"
              className="text-green-500 font-semibold"
            >

              Admin

            </Link>

          )}

          {user ? (

            <UserButton
              afterSignOutUrl="/"
            />

          ) : (

            <SignInButton>

              <button className="hover:text-white transition">

                Login

              </button>

            </SignInButton>

          )}

          <ThemeToggle />

        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-4">

          <ThemeToggle />

          <button
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
          >

            {mobileMenuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}

          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (

        <div className="md:hidden border-t border-zinc-800 bg-background px-6 py-6 space-y-6">

          <a
            href="/#products"
            className="block text-lg"
          >

            Shop

          </a>

          <a
            href="/#products"
            className="block text-lg"
          >

            Collections

          </a>

          <Link
            href="/track-order"
            className="block text-lg"
          >

            Track Order

          </Link>

          <Link
            href="/cart"
            className="block text-lg"
          >

            Cart ({cart.length})

          </Link>

          {isAdmin && (

            <Link
              href="/admin"
              className="block text-lg text-green-500"
            >

              Admin

            </Link>

          )}

          {user ? (

            <UserButton
              afterSignOutUrl="/"
            />

          ) : (

            <SignInButton>

              <button className="text-lg">

                Login

              </button>

            </SignInButton>

          )}

        </div>

      )}

    </nav>

  )

}