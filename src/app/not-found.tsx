import Link from "next/link"
import { Button } from "@nextui-org/react"
import { Home, ArrowLeft, Search, Mail } from "lucide-react"
import { GeometricBackground } from "@/components/geometric-background"
import { FloatingElements } from "@/components/floating-elements"

export default function NotFound() {
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
              as={Link}
              href="/"
              className="w-full rounded-md sm:w-auto h-14 px-8 bg-white text-black hover:bg-neutral-100 font-normal transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-base"
              radius="lg"
              startContent={<Home className="h-4 w-4" />}
            >
              Back to Home
            </Button>

            <Button
              as={Link}
              href="/login"
              variant="flat"
              className="w-full rounded-md sm:w-auto h-14 px-8 bg-white/[0.03] border border-white/[0.1] text-white hover:bg-white/[0.05] transition-all duration-300 font-light text-base"
              radius="lg"
              startContent={<ArrowLeft className="h-4 w-4" />}
            >
              Go Back
            </Button>
          </div>

          {/* Help Section */}
          <div className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-8 border border-white/[0.05] shadow-2xl max-w-2xl mx-auto">
            <h4 className="text-xl font-light text-white mb-6">Need Help?</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/[0.05] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/[0.1]">
                  <Search className="h-5 w-5 text-white/60" />
                </div>
                <h5 className="text-white font-normal mb-2">Search Our Menu</h5>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Browse our delicious pizza selection and find your perfect meal.
                </p>
                <Button
                  as={Link}
                  href="/menu"
                  variant="flat"
                  size="sm"
                  className="mt-3 px-2.5 rounded-md bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.08] font-light"
                  radius="lg"
                >
                  View Menu
                </Button>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white/[0.05] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/[0.1]">
                  <Mail className="h-5 w-5 text-white/60" />
                </div>
                <h5 className="text-white font-normal mb-2">Contact Support</h5>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  Our team is here to help you with any questions or concerns.
                </p>
                <Button
                  as={Link}
                  href="/contact"
                  variant="flat"
                  size="sm"
                  className="mt-3 px-2.5 rounded-md bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.08] font-light"
                  radius="lg"
                >
                  Get Help
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500">
            <Link href="/menu" className="hover:text-white transition-colors duration-300 font-light">
              Menu
            </Link>
            <span className="w-1 h-1 bg-neutral-600 rounded-full"></span>
            <Link href="/about" className="hover:text-white transition-colors duration-300 font-light">
              About
            </Link>
            <span className="w-1 h-1 bg-neutral-600 rounded-full"></span>
            <Link href="/contact" className="hover:text-white transition-colors duration-300 font-light">
              Contact
            </Link>
            <span className="w-1 h-1 bg-neutral-600 rounded-full"></span>
            <Link href="/help" className="hover:text-white transition-colors duration-300 font-light">
              Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
