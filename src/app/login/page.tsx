import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/premium-login-form"
import { GeometricBackground } from "@/components/geometric-background"

export const metadata: Metadata = {
  title: "Sign In - Pizzify",
  description: "Sign in to your Pizzify account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-neutral-950 to-black">
      <GeometricBackground />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel - Minimalist Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
          <div className="max-w-lg text-center">
            {/* Large Logo */}
            <div className="mb-16">
              <div className="w-24 h-24 mx-auto mb-8 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
              </div>
              <h1 className="text-6xl font-extralight text-white tracking-wider">Pizzify</h1>
              <p className="text-neutral-400 text-lg font-light mt-4 tracking-wide">Premium Pizza Experience</p>
            </div>

            {/* Minimal Stats */}
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-light text-white mb-2">50K+</div>
                <div className="text-sm text-neutral-500 font-light">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-light text-white mb-2">4.9</div>
                <div className="text-sm text-neutral-500 font-light">Rating</div>
              </div>
              <div>
                <div className="text-3xl font-light text-white mb-2">24/7</div>
                <div className="text-sm text-neutral-500 font-light">Delivery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Centered Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-5">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-2">
              <h2 className="text-3xl font-extralight text-white mb-3 tracking-wide">Welcome Back</h2>
              <p className="text-neutral-400 font-light">Sign in to continue your culinary journey</p>
            </div>

            {/* Form Container */}
            <div className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-8 border border-white/[0.05] shadow-2xl">
              <LoginForm />
            </div>

            {/* Footer */}
            <div className="text-center mt-3">
              <p className="text-neutral-500 text-sm font-light">
                New to Pizzify?{" "}
                <Link
                  href="/signup"
                  className="text-white hover:text-neutral-300 font-normal transition-colors duration-300 underline underline-offset-4"
                >
                  Create your account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
