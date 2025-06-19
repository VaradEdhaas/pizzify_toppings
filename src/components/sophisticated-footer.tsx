"use client"

import Link from "next/link"

export function SophisticatedFooter() {
  return (
    <footer className="bg-neutral-950 py-20 px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-extralight text-white mb-8 tracking-[0.1em]">Pizzify</div>
            <p className="text-neutral-400 font-light leading-relaxed max-w-lg mb-8">
              Crafting authentic Italian pizza with passion and precision since 2020. Every slice tells a story of
              tradition, quality, and the pursuit of culinary perfection.
            </p>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-extralight text-white mb-1">4.9★</div>
                <div className="text-xs text-neutral-600 font-light">Rating</div>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-center">
                <div className="text-2xl font-extralight text-white mb-1">100K+</div>
                <div className="text-xs text-neutral-600 font-light">Customers</div>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-center">
                <div className="text-2xl font-extralight text-white mb-1">15min</div>
                <div className="text-xs text-neutral-600 font-light">Delivery</div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-neutral-600 mb-8 font-light">Navigation</h4>
            <div className="space-y-4">
              {["Menu", "About", "Locations", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block text-neutral-400 hover:text-white transition-colors duration-300 font-light"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-neutral-600 mb-8 font-light">Contact</h4>
            <div className="space-y-4 text-neutral-400 font-light">
              <p>123 Artisan Street</p>
              <p>New York, NY 10001</p>
              <p>(555) 123-PIZZA</p>
              <p>hello@pizzify.com</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-neutral-600 font-light text-sm mb-4 md:mb-0">© 2024 Pizzify. All rights reserved.</p>
          <div className="flex items-center space-x-8 text-sm text-neutral-600 font-light">
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
