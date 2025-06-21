"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@heroui/react"
import { ArrowRight, Sparkles, Zap, Crown } from "lucide-react"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { SparklesCore } from "@/components/ui/sparkles"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Spotlight } from "@/components/ui/spotlight"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"

const dockItems = [
  { title: "Menu", icon: "🍕", href: "/menu" },
  { title: "About", icon: "👨‍🍳", href: "/about" },
  { title: "Reviews", icon: "⭐", href: "/reviews" },
  { title: "Contact", icon: "📞", href: "/contact" },
]

const words = [
  { text: "Craft" },
  { text: "the" },
  { text: "Perfect" },
  { text: "Pizza", className: "text-orange-500 dark:text-orange-400" },
  { text: "Experience" },
]

export function AceternityHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Spotlight Effects */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
      <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />

      {/* Background Effects */}
      <BackgroundBeamsWithCollision>
        <div className="absolute inset-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 min-h-screen flex items-center justify-center px-8">
          <div className="max-w-7xl mx-auto text-center">
            {/* Premium Badge */}
            <div className="mb-8">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-black text-white flex items-center space-x-2 px-6 py-2"
              >
                <Crown className="h-4 w-4" />
                <span className="text-sm font-light">Premium Artisanal Pizza</span>
              </HoverBorderGradient>
            </div>

            {/* Main Headline with Typewriter */}
            <div className="mb-8">
              <TypewriterEffect words={words} className="text-4xl md:text-6xl lg:text-7xl" />
            </div>

            {/* Animated Subtitle */}
            <div className="mb-12">
              <TextGenerateEffect
                words="Where traditional Italian craftsmanship meets modern culinary innovation. Every slice is a masterpiece crafted with passion, precision, and the finest ingredients."
                className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed max-w-4xl mx-auto"
              />
            </div>

            {/* Interactive Stats */}
            <div className="grid grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto">
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  4.9★
                </div>
                <div className="text-sm text-neutral-500 uppercase tracking-widest">Rating</div>
              </div>
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  15min
                </div>
                <div className="text-sm text-neutral-500 uppercase tracking-widest">Delivery</div>
              </div>
              <div className="group cursor-pointer">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  100K+
                </div>
                <div className="text-sm text-neutral-500 uppercase tracking-widest">Happy Customers</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <HoverBorderGradient
                containerClassName="rounded-2xl"
                as="button"
                className="bg-black text-white flex items-center space-x-2 px-8 py-4 text-lg"
              >
                <Link href="/menu" className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Explore Menu</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </HoverBorderGradient>

              <Button
                variant="bordered"
                size="lg"
                className="h-14 px-8 bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-xl"
                radius="lg"
                startContent={<Zap className="h-5 w-5" />}
              >
                Quick Order
              </Button>
            </div>

            {/* Floating Pizza Showcase */}
            <div className="relative">
              <div className="w-64 h-64 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative z-10 w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-xl border border-white/20 flex items-center justify-center group hover:scale-110 transition-transform duration-500">
                  <div className="text-8xl group-hover:rotate-12 transition-transform duration-500">🍕</div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center animate-bounce">
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse">
                  <div className="text-center text-white">
                    <div className="text-lg font-bold">15m</div>
                    <div className="text-xs">delivery</div>
                  </div>
                </div>
                <div className="absolute top-1/2 -left-8 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center animate-bounce delay-300">
                  <span className="text-xl">⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Dock */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <FloatingDock items={dockItems} />
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  )
}
