"use client"

import { Card, CardBody } from "@heroui/react"
import { Clock, Award, Leaf, Users } from "lucide-react"

const features = [
  {
    icon: Clock,
    number: "01",
    title: "Speed",
    description: "Lightning-fast delivery without compromising quality. Fresh from our oven to your door.",
  },
  {
    icon: Award,
    number: "02",
    title: "Quality",
    description: "Premium ingredients sourced from trusted suppliers. Every pizza is a masterpiece.",
  },
  {
    icon: Leaf,
    number: "03",
    title: "Fresh",
    description: "Daily preparation with the finest ingredients. No shortcuts, just pure quality.",
  },
  {
    icon: Users,
    number: "04",
    title: "Service",
    description: "Exceptional customer experience from order to delivery. Your satisfaction guaranteed.",
  },
]

export function VerticalFeatures() {
  return (
    <section className="py-15 px-8 bg-neutral-950">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Left Content */}
          <div>
            <div className="text-6xl md:text-8xl font-black text-white mb-8 leading-none">
              WHY
              <br />
              <span className="text-neutral-700">CHOOSE</span>
              <br />
              US?
            </div>
            <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-lg">
              We don't just make pizza. We craft experiences. Every ingredient, every technique, every moment is
              designed to deliver perfection.
            </p>
          </div>

          {/* Right Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-black border border-neutral-800 hover:border-white transition-all duration-500 group"
              >
                <CardBody className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="text-4xl font-black text-neutral-800 group-hover:text-white transition-colors duration-500">
                      {feature.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <feature.icon className="h-6 w-6 text-neutral-600 group-hover:text-white transition-colors duration-500" />
                        <h3 className="text-2xl font-light text-white uppercase tracking-wide">{feature.title}</h3>
                      </div>
                      <p className="text-neutral-400 font-light leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
