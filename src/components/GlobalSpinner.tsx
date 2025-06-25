// components/GlobalSpinner.tsx
"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useTransition } from "react"

export default function GlobalSpinner() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // show spinner for a short time

    return () => clearTimeout(timer)
  }, [pathname]) // triggers on route change

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
