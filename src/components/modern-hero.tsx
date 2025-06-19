"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@heroui/react"
import { ArrowRight, ArrowDown } from "lucide-react"
import { MinimalNav } from "@/components/ui/minimal-nav"
import { TypingAnimation } from "@/components/ui/typing-animation"

export function ModernHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <MinimalNav />

      {/* Large Typography Hero */}
      <div className="min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="max-w-8xl mx-auto text-center">
          {/* Main Headline - Editorial Style */}
          <div className="mb-16">
            <div className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-white leading-none tracking-tighter mb-8">
              PIZZA
            </div>
            <div className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-light text-neutral-600 leading-none tracking-wider -mt-8">
              PERFECTED
            </div>
          </div>

          {/* Animated Subtitle */}
          <div className="mb-16 max-w-4xl mx-auto">
            <TypingAnimation
              text="Where traditional Italian craftsmanship meets modern culinary innovation. Every slice tells a story of passion, precision, and perfection."
              className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed"
            />
          </div>

          {/* Minimal Stats Bar */}
          <div className="flex items-center justify-center space-x-16 mb-16 text-white">
            <div className="text-center">
              <div className="text-4xl font-light mb-2">4.9★</div>
              <div className="text-sm uppercase tracking-widest text-neutral-500">Rating</div>
            </div>
            <div className="w-px h-12 bg-neutral-800"></div>
            <div className="text-center">
              <div className="text-4xl font-light mb-2">25min</div>
              <div className="text-sm uppercase tracking-widest text-neutral-500">Delivery</div>
            </div>
            <div className="w-px h-12 bg-neutral-800"></div>
            <div className="text-center">
              <div className="text-4xl font-light mb-2">50K+</div>
              <div className="text-sm uppercase tracking-widest text-neutral-500">Customers</div>
            </div>
          </div>

          {/* Single CTA */}
          <Button
            as={Link}
            href="/menu"
            size="lg"
            className="h-16 px-12 bg-white text-black hover:bg-neutral-200 font-normal transition-all duration-500 transform hover:scale-105 text-lg tracking-wide"
            radius="none"
            endContent={<ArrowRight className="h-5 w-5 ml-2" />}
          >
            EXPLORE MENU
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-px h-16 bg-neutral-700"></div>
          <ArrowDown className="h-4 w-4 text-neutral-600 animate-bounce" />
        </div>
      </div>

      {/* Side Elements */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="writing-mode-vertical text-sm uppercase tracking-widest text-neutral-600 font-light">
          Artisanal • Premium • Fresh
        </div>
      </div>

      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="writing-mode-vertical text-sm uppercase tracking-widest text-neutral-600 font-light">
          Since 2020 • New York
        </div>
      </div>
    </div>
  )
}
