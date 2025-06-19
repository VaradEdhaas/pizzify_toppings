import { ElegantHero } from "@/components/elegant-hero"
import { RefinedFeatures } from "@/components/refined-features"
import { SophisticatedMenu } from "@/components/sophisticated-menu"
import { MinimalTestimonials } from "@/components/minimal-testimonials"
import { ElegantCTA } from "@/components/elegant-cta"
import { SophisticatedFooter } from "@/components/sophisticated-footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <ElegantHero />
      <RefinedFeatures />
      <SophisticatedMenu />
      <MinimalTestimonials />
      <ElegantCTA />
      <SophisticatedFooter />
    </main>
  )
}
