"use client"

import { Button, Card, CardBody } from "@heroui/react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const menuItems = [
  {
    category: "CLASSICS",
    items: [
      { name: "Margherita", price: "$18" },
      { name: "Pepperoni", price: "$22" },
      { name: "Quattro Stagioni", price: "$26" },
    ],
  },
  {
    category: "SIGNATURE",
    items: [
      { name: "Truffle Supreme", price: "$32" },
      { name: "Prosciutto & Fig", price: "$28" },
      { name: "Burrata Special", price: "$30" },
    ],
  },
]

export function SplitMenuSection() {
  return (
    <section className="py-32 px-8 bg-black">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Left - Menu Preview */}
          <div>
            <div className="text-6xl md:text-8xl font-black text-white mb-12 leading-none">MENU</div>

            <div className="space-y-12">
              {menuItems.map((category, index) => (
                <div key={index}>
                  <h3 className="text-sm uppercase tracking-widest text-neutral-600 mb-6 font-light">
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between py-4 border-b border-neutral-900"
                      >
                        <span className="text-xl font-light text-white">{item.name}</span>
                        <span className="text-xl font-light text-neutral-400">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Button
              as={Link}
              href="/menu"
              className="mt-12 h-14 px-8 bg-white text-black hover:bg-neutral-200 font-normal tracking-wide uppercase"
              radius="none"
              endContent={<ArrowRight className="h-4 w-4" />}
            >
              Full Menu
            </Button>
          </div>

          {/* Right - Large Image Placeholder */}
          <div className="relative">
            <Card className="h-[600px] bg-neutral-900 border border-neutral-800">
              <CardBody className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🍕</div>
                  <p className="text-neutral-600 font-light">Artisanal Pizza</p>
                </div>
              </CardBody>
            </Card>

            {/* Floating Stats */}
            <div className="absolute -bottom-8 -left-8 bg-black border border-neutral-800 p-6 shadow-lg">
              <div className="text-3xl font-light text-white mb-2">25min</div>
              <div className="text-sm uppercase tracking-widest text-neutral-600">Average Delivery</div>
            </div>

            <div className="absolute -top-8 -right-8 bg-white text-black p-6">
              <div className="text-3xl font-light mb-2">4.9★</div>
              <div className="text-sm uppercase tracking-widest text-neutral-700">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
