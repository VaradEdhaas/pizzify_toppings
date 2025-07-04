"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@heroui/react"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { WavyBackground } from "./ui/wavy-background"

export function ElegantHero() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 })
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize() // Set initial screen size
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Subtle White Gradient */}
      <div
        className="absolute w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Minimal Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:40px_40px] opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Floating Minimal Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * screenSize.width,
              y: Math.random() * screenSize.height,
            }}
            animate={{
              y: [null, -120],
              opacity: [0, 0.3, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 min-h-screen flex items-center justify-center px-8 pt-20"
      >
        <div className="max-w-8xl mx-auto">
          <div className="text-center">
            {/* Minimal Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-16"
            >
              <div className="inline-flex items-center space-x-4 px-8 py-3 bg-white/[0.03] border border-white/[0.08] rounded-full backdrop-blur-2xl group cursor-pointer">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-2 h-2 bg-white/40 rounded-full"
                />
                <span className="text-sm text-white/70 font-light tracking-[0.2em] group-hover:text-white transition-colors duration-300">
                  ITALIAN TRADITION × DESI MAGIC
                </span>
                <Sparkles className="h-3 w-3 text-white/40" />
              </div>
            </motion.div>

            {/* Clean Typography */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            >
              <WavyBackground className="w-full mx-auto">
                <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black leading-[0.75] tracking-[-0.02em] mb-12">
                  <span className="block text-white">PIZZA</span>
                  <span className="block text-white/30 font-extralight">FUSION</span>
                </h1>
              </WavyBackground>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                className="h-px bg-white/30 mx-auto mb-16"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-3"
        >
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/40 rounded-full mt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </div>
          <span className="text-xs text-white/30 font-light tracking-[0.2em]">SCROLL</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
