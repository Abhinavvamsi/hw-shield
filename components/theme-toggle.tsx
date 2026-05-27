"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeToggle() {

  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="p-2 rounded-xl border border-red-500/40 hover:border-white transition"
    >

      {theme === "dark" ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}

    </button>
  )
}