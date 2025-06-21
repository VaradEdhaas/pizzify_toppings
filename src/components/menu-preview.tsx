"use client"

import { Button, Card, CardBody } from "@heroui/react"
import { ArrowRight, Plus } from "lucide-react"
import Link from "next/link"

const menuItems = [
  {
    name: "Margherita Classic",
    description: "Fresh mozzarella, basil, San Marzano tomatoes",
    price: "$18.99",
    image: "🍕",
  },
  {
    name: "Pepperoni Supreme",
    description: "Premium pepperoni, mozzarella, herbs",
    price: "$22.99",
    image: "🍕",
  },
  {
    name: "Quattro Stagioni",
    description: "Four seasons with artichokes, olives, ham",
    price: "$26.99",
    image: "🍕",
  },
]

export function MenuPreview() {
  return (
    <section className="py-24 px-8 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-6 tracking-tight">
            Signature <span className="text-neutral-400">Creations</span>
          </h2>
          <p className="text-xl text-neutral-400 font-light max-w-3xl mx-auto leading-relaxed">
            Each pizza is a masterpiece, carefully crafted with passion and served with pride.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer"
            >
              <CardBody className="p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{item.image}</div>
                  <h3 className="text-xl font-light text-white mb-2">{item.name}</h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed">{item.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-light text-white">{item.price}</span>
                  <Button
                    isIconOnly
                    className="bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-all duration-300"
                    radius="lg"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            as={Link}
            href="/menu"
            size="lg"
            className="h-14 px-8 bg-white text-black hover:bg-neutral-100 font-normal transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-base"
            radius="lg"
            endContent={<ArrowRight className="h-4 w-4" />}
          >
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  )
}
