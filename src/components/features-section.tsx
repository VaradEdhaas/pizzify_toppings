"use client"

import { Card, CardBody } from "@heroui/react"
import { Clock, Shield, Star, Truck } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Lightning Fast",
    description: "Fresh pizza delivered to your door in under 30 minutes, guaranteed.",
  },
  {
    icon: Shield,
    title: "Premium Quality",
    description: "Only the finest ingredients sourced from local farms and trusted suppliers.",
  },
  {
    icon: Star,
    title: "Master Crafted",
    description: "Hand-stretched dough and artisanal techniques passed down through generations.",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Complimentary delivery on all orders over $25 within our service area.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-8 bg-gradient-to-b from-black to-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-6 tracking-tight">
            Why Choose <span className="text-neutral-400">Pizzify</span>
          </h2>
          <p className="text-xl text-neutral-400 font-light max-w-3xl mx-auto leading-relaxed">
            We&apos;re not just another pizza place. We&apos;re artisans dedicated to crafting the perfect slice using traditional
            methods and premium ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <CardBody className="p-8 text-center">
                <div className="w-16 h-16 bg-white/[0.05] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/[0.1] group-hover:bg-white/[0.1] transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-light text-white mb-4">{feature.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
