"use client"

import { Button } from "@heroui/react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { TextGenerateEffect } from "./ui/text-generate-effect"

export function ElegantCTA() {
  const words = `Join thousands of pizza lovers who have discovered the perfect
balance of tradition, quality, and taste.Your perfect slice awaits`;

  return (
    <section className="py-15 px-8 bg-black relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-neutral-500 font-light tracking-wide backdrop-blur-sm">
              Ready to Order?
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-extralight text-white mb-8 leading-tight tracking-tight">
            Experience
            <br />
            <span className="italic text-neutral-400">Authentic</span>
            <br />
            <span className="text-4xl md:text-5xl lg:text-7xl text-neutral-600">Pizza</span>
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-white/30 to-transparent mx-auto mb-12"></div>
          <div className="my-10 w-full font-light">
            <TextGenerateEffect words={words} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
