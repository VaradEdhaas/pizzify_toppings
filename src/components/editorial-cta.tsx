"use client"

import { Button } from "@heroui/react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function EditorialCTA() {
  return (
    <section className="py-15 px-8 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white mb-12 leading-none tracking-tighter">
          HUNGRY?
        </div>

        <p className="text-2xl text-neutral-400 font-light mb-16 leading-relaxed max-w-2xl mx-auto">
          Don&apos;t wait. Order now and experience the difference that passion and quality make.
        </p>

        <Button
          as={Link}
          href="/signup"
          size="lg"
          className="h-16 px-12 bg-white text-black hover:bg-neutral-200 font-normal transition-all duration-500 transform hover:scale-105 text-lg tracking-wide"
          radius="none"
          endContent={<ArrowRight className="h-5 w-5 ml-2" />}
        >
          ORDER NOW
        </Button>
      </div>
    </section>
  )
}
