"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@heroui/react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "Menu", link: "/menu" },
  { name: "About", link: "/about" },
  { name: "Locations", link: "/locations" },
  { name: "Contact", link: "/contact" },
]

export function ElegantNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-extralight text-white tracking-[0.1em] hover:text-neutral-300 transition-colors duration-300"
            >
              Pizzify
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="text-neutral-400 hover:text-white transition-colors duration-300 font-light text-sm tracking-wide relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/login"
                className="text-neutral-400 hover:text-white transition-colors duration-300 font-light text-sm tracking-wide"
              >
                Sign In
              </Link>
              <Button
                as={Link}
                href="/signup"
                className="h-11 px-8 bg-white text-black hover:bg-neutral-100 font-light transition-all duration-300 text-sm tracking-wide"
                radius="none"
              >
                Order Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              isIconOnly
              variant="flat"
              className="md:hidden bg-transparent text-white hover:bg-white/10"
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
            className="fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 z-40 md:hidden"
          >
            <div className="px-8 py-8 space-y-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="block text-xl font-light text-neutral-400 hover:text-white transition-colors duration-300 tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <Link
                  href="/login"
                  className="block text-xl font-light text-neutral-400 hover:text-white transition-colors duration-300 tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Button
                  as={Link}
                  href="/signup"
                  className="w-full h-12 bg-white text-black hover:bg-neutral-100 font-light tracking-wide"
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
