"use client";

import Link from "next/link"
import { Home, ArrowLeft, Search, Mail } from "lucide-react"
import { GeometricBackground } from "@/components/geometric-background"
import { FloatingElements } from "@/components/floating-elements"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back()
  }

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-neutral-950 to-black">
      <GeometricBackground />
      <FloatingElements />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <h1 className="text-2xl font-light text-white tracking-wider">Pizzify</h1>
            </Link>
          </div>

          {/* 404 Display */}
          <div className="mb-10">
            <div className="relative">
              {/* Large 404 Text */}
              <h2 className="text-[12rem] md:text-[16rem] font-extralight text-white/5 leading-none tracking-wider select-none">
                404
              </h2>

              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-4xl md:text-6xl font-extralight text-white mb-6 tracking-wide">Page Not Found</h3>
                  <p className="text-lg md:text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
                    The page you're looking for seems to have vanished into thin air. Don't worry, even the best pizzas
                    sometimes get lost on delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              className="w-full rounded-md sm:w-auto h-14 px-8 bg-white text-black hover:bg-neutral-100 font-normal transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-base"
              radius="lg"
              startContent={<Home className="h-4 w-4" />}
              onPress={handleGoHome}
            >
              Back to Home
            </Button>

            <Button
              variant="flat"
              className="w-full rounded-md sm:w-auto h-14 px-8 bg-white/[0.03] border border-white/[0.1] text-white hover:bg-white/[0.05] transition-all duration-300 font-light text-base"
              radius="lg"
              startContent={<ArrowLeft className="h-4 w-4" />}
              onPress={handleGoBack}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
