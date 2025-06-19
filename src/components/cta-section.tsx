"use client"

import { Button } from "@heroui/react"
import { ArrowRight, Smartphone } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 px-8 bg-gradient-to-t from-black to-neutral-950">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-extralight text-white mb-8 tracking-tight leading-tight">
          Ready to Experience
          <br />
          <span className="text-neutral-400">Artisanal Pizza?</span>
        </h2>
        <p className="text-xl text-neutral-400 font-light mb-12 leading-relaxed max-w-2xl mx-auto">
          Join thousands of satisfied customers who have made Pizzify their favorite pizza destination.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            as={Link}
            href="/signup"
            size="lg"
            className="w-full sm:w-auto h-14 px-8 bg-white text-black hover:bg-neutral-100 font-normal transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-base"
            radius="xl"
            endContent={<ArrowRight className="h-4 w-4" />}
          >
            Get Started
          </Button>

          <Button
            as={Link}
            href="/menu"
            variant="bordered"
            size="lg"
            className="w-full sm:w-auto h-14 px-8 bg-white/[0.03] border-white/[0.1] text-white hover:bg-white/[0.05] transition-all duration-300 font-light text-base"
            radius="xl"
            startContent={<Smartphone className="h-4 w-4" />}
          >
            Browse Menu
          </Button>
        </div>
      </div>
    </section>
  )
}
