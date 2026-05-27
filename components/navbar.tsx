"use client"

import Link from "next/link"

import {
  Menu,
  X,
  ShoppingCart,
} from "lucide-react"

import {
  useEffect,
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

  const clearCart =
    useCartStore(
      (state) => state.clearCart
    )

  const [mobileMenuOpen,
    setMobileMenuOpen
  ] = useState(false)

  const [animateCart,
    setAnimateCart
  ] = useState(false)

  const isAdmin =
    user?.primaryEmailAddress
      ?.emailAddress ===
    "abhinavvamsi2004@gmail.com"

  /* Clear cart when account changes */
  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "hw-shield-user"
      )

    const currentUser =
      user?.id || "guest"

    if (
      storedUser &&
      storedUser !== currentUser
    ) {

      clearCart()

    }

    localStorage.setItem(
      "hw-shield-user",
      currentUser
    )

  }, [user, clearCart])

  /* Cart animation */
  useEffect(() => {

    if (cart.length > 0) {

      setAnimateCart(true)

      const timer =
        setTimeout(() => {

          setAnimateCart(false)

        }, 400)

      return () =>
        clearTimeout(timer)

    }

  }, [cart.length])

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
            href="/orders"
            className="hover:text-white transition"
          >

            My Orders

          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative hover:text-white transition"
          >

            <div
              className={`
              relative
              transition-all
              duration-300
              ${animateCart
                ? "scale-125"
                : "scale-100"}
              `}
            >

              <ShoppingCart size={26} />

              {cart.length > 0 && (

                <span
                  className="
                  absolute
                  -top-2
                  -right-2
                  min-w-[20px]
                  h-5
                  px-1
                  rounded-full
                  bg-white
                  text-black
                  text-xs
                  font-bold
                  flex
                  items-center
                  justify-center
                  animate-pulse
                  "
                >

                  {cart.length}

                </span>

              )}

            </div>

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

            <UserButton />

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

          {/* Mobile Cart */}
          <Link
            href="/cart"
            className="relative"
          >

            <div
              className={`
              relative
              transition-all
              duration-300
              ${animateCart
                ? "scale-125"
                : "scale-100"}
              `}
            >

              <ShoppingCart size={24} />

              {cart.length > 0 && (

                <span
                  className="
                  absolute
                  -top-2
                  -right-2
                  min-w-[18px]
                  h-5
                  px-1
                  rounded-full
                  bg-white
                  text-black
                  text-xs
                  font-bold
                  flex
                  items-center
                  justify-center
                  animate-pulse
                  "
                >

                  {cart.length}

                </span>

              )}

            </div>

          </Link>

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
            href="/orders"
            className="block text-lg"
          >

            My Orders

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

            <UserButton />

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