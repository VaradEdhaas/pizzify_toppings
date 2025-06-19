"use client"

import Link from "next/link"

export function CleanFooter() {
  return (
    <footer className="bg-white text-black py-20 px-8 border-t border-neutral-200">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-black mb-6 tracking-tight">PIZZIFY</div>
            <p className="text-neutral-600 font-light leading-relaxed max-w-md">
              Crafting exceptional pizza experiences since 2020. Traditional methods, premium ingredients, modern
              delivery.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-6 font-light">Navigation</h4>
            <div className="space-y-3">
              {["Menu", "About", "Locations", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block text-neutral-700 hover:text-black transition-colors duration-300 font-light"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-6 font-light">Contact</h4>
            <div className="space-y-3 text-neutral-600 font-light">
              <p>123 Pizza Street</p>
              <p>New York, NY 10001</p>
              <p>(555) 123-PIZZA</p>
              <p>hello@pizzify.com</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-neutral-200 text-center">
          <p className="text-neutral-500 font-light text-sm">© 2024 PIZZIFY. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  )
}
