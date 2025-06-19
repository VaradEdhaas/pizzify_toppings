"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@heroui/react"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
    submenu?: { name: string; link: string }[]
  }[]
  className?: string
}) => {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // Scrolling down
          setVisible(false)
        } else {
          // Scrolling up
          setVisible(true)
        }
        setLastScrollY(window.scrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "flex max-w-7xl fixed top-6 inset-x-0 mx-auto border border-white/[0.1] rounded-2xl bg-black/80 backdrop-blur-2xl shadow-2xl z-[5000] items-center justify-between px-6 py-3",
            className,
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-5 h-5 bg-black rounded-lg flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="text-white font-light text-lg tracking-wider hidden sm:block">Pizzify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((navItem, idx) => (
              <div
                key={`link=${idx}`}
                className="relative"
                onMouseEnter={() => navItem.submenu && setActiveDropdown(navItem.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={navItem.link}
                  className={cn(
                    "relative text-neutral-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-1 group font-light text-sm",
                    "hover:bg-white/[0.05]",
                  )}
                >
                  <span>{navItem.name}</span>
                  {navItem.submenu && (
                    <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {navItem.submenu && (
                  <AnimatePresence>
                    {activeDropdown === navItem.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/[0.1] rounded-xl shadow-2xl py-2"
                      >
                        {navItem.submenu.map((subItem, subIdx) => (
                          <Link
                            key={subIdx}
                            href={subItem.link}
                            className="block px-4 py-2 text-neutral-300 hover:text-white hover:bg-white/[0.05] transition-all duration-200 font-light text-sm"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/login"
              className="text-neutral-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 font-light text-sm hover:bg-white/[0.05]"
            >
              Sign In
            </Link>
            <Button
              as={Link}
              href="/signup"
              size="sm"
              className="h-9 px-6 bg-white text-black hover:bg-neutral-100 font-normal transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm"
              radius="lg"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            isIconOnly
            variant="flat"
            className="lg:hidden bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-all duration-300"
            radius="lg"
            onPress={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </motion.div>
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[4999] lg:hidden"
              onClick={toggleMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-20 left-4 right-4 bg-black/95 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-2xl z-[5001] lg:hidden"
            >
              <div className="p-6 space-y-4">
                {/* Mobile Navigation Links */}
                {navItems.map((navItem, idx) => (
                  <div key={idx}>
                    <Link
                      href={navItem.link}
                      className="block text-white hover:text-neutral-300 py-3 px-4 rounded-xl transition-all duration-300 font-light border-b border-white/[0.05] last:border-b-0"
                      onClick={toggleMobileMenu}
                    >
                      {navItem.name}
                    </Link>
                    {navItem.submenu && (
                      <div className="ml-4 mt-2 space-y-2">
                        {navItem.submenu.map((subItem, subIdx) => (
                          <Link
                            key={subIdx}
                            href={subItem.link}
                            className="block text-neutral-400 hover:text-white py-2 px-4 rounded-lg transition-all duration-300 font-light text-sm"
                            onClick={toggleMobileMenu}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Buttons */}
                <div className="pt-4 space-y-3 border-t border-white/[0.05]">
                  <Button
                    as={Link}
                    href="/login"
                    variant="flat"
                    className="w-full h-12 bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-all duration-300 font-light"
                    radius="xl"
                    onPress={toggleMobileMenu}
                  >
                    Sign In
                  </Button>
                  <Button
                    as={Link}
                    href="/signup"
                    className="w-full h-12 bg-white text-black hover:bg-neutral-100 font-normal transition-all duration-300"
                    radius="xl"
                    onPress={toggleMobileMenu}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
