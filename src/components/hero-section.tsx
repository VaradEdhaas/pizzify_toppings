"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@heroui/react"
import { ArrowRight, Play, Star, Clock, Users } from "lucide-react"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { SparklesCore } from "@/components/ui/sparkles"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { BackgroundBeams } from "@/components/ui/background-beams"

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Menu",
    link: "/menu",
    submenu: [
      { name: "Pizza", link: "/menu/pizza" },
      { name: "Appetizers", link: "/menu/appetizers" },
      { name: "Desserts", link: "/menu/desserts" },
      { name: "Drinks", link: "/menu/drinks" },
    ],
  },
  {
    name: "About",
    link: "/about",
    submenu: [
      { name: "Our Story", link: "/about/story" },
      { name: "Team", link: "/about/team" },
      { name: "Locations", link: "/about/locations" },
    ],
  },
  {
    name: "Contact",
    link: "/contact",
  },
]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <BackgroundBeams />
      <FloatingNav navItems={navItems} />

      {/* Sparkles Background */}
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
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Main Headline */}
            <div className="mb-8">
              <TextGenerateEffect
                words="Artisanal Pizza Crafted with Passion"
                className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white leading-tight tracking-tight"
              />
            </div>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-neutral-400 font-light mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Experience the perfect blend of traditional techniques and premium ingredients, delivered fresh to your
              door in under 30 minutes.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-white mr-2" />
                  <span className="text-2xl font-light text-white">4.9</span>
                </div>
                <p className="text-sm text-neutral-500 font-light">Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-white mr-2" />
                  <span className="text-2xl font-light text-white">25m</span>
                </div>
                <p className="text-sm text-neutral-500 font-light">Delivery</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-white mr-2" />
                  <span className="text-2xl font-light text-white">50K+</span>
                </div>
                <p className="text-sm text-neutral-500 font-light">Customers</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                as={Link}
                href="/menu"
                size="lg"
                className="w-full sm:w-auto h-14 px-8 bg-white text-black hover:bg-neutral-100 font-normal transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-base"
                radius="lg"
                endContent={<ArrowRight className="h-4 w-4" />}
              >
                Order Now
              </Button>

              <Button
                variant="bordered"
                size="lg"
                className="w-full sm:w-auto h-14 px-8 bg-white/[0.03] border-white/[0.1] text-white hover:bg-white/[0.05] transition-all duration-300 font-light text-base"
                radius="lg"
                startContent={<Play className="h-4 w-4" />}
              >
                Watch Story
              </Button>
            </div>
          </div>

          {/* Right Content - Pizza Showcase */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Pizza Image */}
              <div className="w-full max-w-lg mx-auto relative">
                <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-xl border border-white/10 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 bg-white/5 rounded-full flex items-center justify-center">
                    <div className="w-3/4 h-3/4 bg-white/10 rounded-full flex items-center justify-center">
                      <div className="text-6xl">🍕</div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/[0.05] rounded-2xl backdrop-blur-xl border border-white/[0.1] flex items-center justify-center">
                  <div className="text-2xl">🔥</div>
                </div>

                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/[0.05] rounded-2xl backdrop-blur-xl border border-white/[0.1] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-light text-white">30m</div>
                    <div className="text-xs text-neutral-400 font-light">delivery</div>
                  </div>
                </div>

                <div className="absolute top-1/2 -left-8 w-16 h-16 bg-white/[0.05] rounded-xl backdrop-blur-xl border border-white/[0.1] flex items-center justify-center">
                  <div className="text-xl">⭐</div>
                </div>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="text-xs text-neutral-500 font-light">Scroll to explore</p>
        </div>
      </div>
    </div>
  )
}
