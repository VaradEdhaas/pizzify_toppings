"use client"

import Link from "next/link"
import { Button } from "@heroui/react"
import { Instagram, Twitter, Facebook, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.08] py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3">
                <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl font-light text-white tracking-wider">Pizzify</h3>
            </div>
            <p className="text-neutral-400 font-light leading-relaxed max-w-md">
              Crafting artisanal pizza with passion since 2020. We believe in using only the finest ingredients and
              traditional techniques to create unforgettable flavors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-normal mb-6">Quick Links</h4>
            <div className="space-y-3">
              <Link
                href="/menu"
                className="block text-neutral-400 hover:text-white transition-colors duration-200 font-light"
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="block text-neutral-400 hover:text-white transition-colors duration-200 font-light"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-neutral-400 hover:text-white transition-colors duration-200 font-light"
              >
                Contact
              </Link>
              <Link
                href="/careers"
                className="block text-neutral-400 hover:text-white transition-colors duration-200 font-light"
              >
                Careers
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-normal mb-6">Get in Touch</h4>
            <div className="space-y-3 text-neutral-400 font-light">
              <p>123 Pizza Street</p>
              <p>Foodie City, FC 12345</p>
              <p>(555) 123-PIZZA</p>
              <p>hello@pizzify.com</p>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.08]">
          <p className="text-neutral-500 font-light text-sm mb-4 md:mb-0">© 2024 Pizzify. All rights reserved.</p>

          <div className="flex items-center space-x-4">
            <Button
              isIconOnly
              variant="flat"
              className="bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-all duration-300"
              radius="lg"
            >
              <Instagram className="h-4 w-4" />
            </Button>
            <Button
              isIconOnly
              variant="flat"
              className="bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-all duration-300"
              radius="lg"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              isIconOnly
              variant="flat"
              className="bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-all duration-300"
              radius="lg"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              isIconOnly
              variant="flat"
              className="bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-all duration-300"
              radius="lg"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
