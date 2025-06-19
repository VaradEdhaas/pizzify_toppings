"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@heroui/react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "Menu", link: "/menu" },
  { name: "Story", link: "/about" },
  { name: "Locations", link: "/locations" },
  { name: "Contact", link: "/contact" },
]

export function MinimalNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-8xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-black text-white tracking-tight">
              PIZZIFY
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="text-neutral-400 hover:text-white transition-colors duration-300 font-light tracking-wide uppercase text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/login"
                className="text-neutral-400 hover:text-white transition-colors duration-300 font-light tracking-wide uppercase text-sm"
              >
                Sign In
              </Link>
              <Button
                as={Link}
                href="/signup"
                className="h-10 px-6 bg-white text-black hover:bg-neutral-200 font-normal transition-all duration-300 tracking-wide uppercase text-sm"
                radius="none"
              >
                Order Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              isIconOnly
              variant="flat"
              className="md:hidden bg-transparent text-white hover:bg-neutral-900"
              onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 bg-black border-b border-neutral-900 z-40 md:hidden"
          >
            <div className="px-8 py-8 space-y-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="block text-xl font-light text-neutral-400 hover:text-white transition-colors duration-300 tracking-wide uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-neutral-900 space-y-4">
                <Link
                  href="/login"
                  className="block text-xl font-light text-neutral-400 hover:text-white transition-colors duration-300 tracking-wide uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Button
                  as={Link}
                  href="/signup"
                  className="w-full h-12 bg-white text-black hover:bg-neutral-200 font-normal tracking-wide uppercase"
                  radius="none"
                  onPress={() => setMobileMenuOpen(false)}
                >
                  Order Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
