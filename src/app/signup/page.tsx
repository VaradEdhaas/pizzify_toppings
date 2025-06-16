import type { Metadata } from "next"
import Link from "next/link"
import { SignupForm } from "@/components/premium-signup-form"
import { SubtleBackground } from "@/components/subtle-background"

export const metadata: Metadata = {
  title: "Join Pizzify",
  description: "Create your Pizzify account",
}

export default function SignupPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <SubtleBackground />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 opacity-80"></div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Panel - Signup Form */}
        <div className="w-full lg:w-3/5 flex items-center justify-center px-8 py-4">
          <div className="w-full max-w-lg"> {/* increased from max-w-sm to max-w-lg */}
            <div className="backdrop-blur-xl bg-white/[0.02] rounded-2xl p-4 border border-white/[0.08] shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-light text-white mb-2">Join Pizzify</h3>
                <p className="text-neutral-400 text-sm font-light">Create your account and start ordering</p>
              </div>

              <SignupForm />

              <div className="mt-8 text-center">
                <p className="text-neutral-400 text-sm font-light">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-white hover:text-neutral-300 font-normal transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Restaurant Features */}
        <div className="hidden lg:flex lg:w-2/5 relative"> {/* changed from lg:w-1/2 to lg:w-2/5 */}
          <div className="flex flex-col justify-center px-16 py-14 w-full">
            <div className="max-w-md">
              <h2 className="text-5xl font-light text-white mb-8 leading-tight tracking-tight">
                Join our
                <br />
                <span className="text-neutral-400">community</span>
              </h2>

              <p className="text-lg text-neutral-400 mb-12 leading-relaxed font-light">
                Experience artisanal pizza crafted with premium ingredients and delivered with care.
              </p>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/[0.08] rounded-xl flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-normal mb-2">Artisanal Craftsmanship</h4>
                    <p className="text-neutral-400 text-sm font-light leading-relaxed">
                      Hand-stretched dough and premium ingredients sourced from local farms.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/[0.08] rounded-xl flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-normal mb-2">Fast Delivery</h4>
                    <p className="text-neutral-400 text-sm font-light leading-relaxed">
                      Hot, fresh pizza delivered to your door in 30 minutes or less.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/[0.08] rounded-xl flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-normal mb-2">Rewards Program</h4>
                    <p className="text-neutral-400 text-sm font-light leading-relaxed">
                      Earn points with every order and unlock exclusive discounts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
