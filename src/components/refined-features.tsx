"use client"

import { motion } from "framer-motion"
import { Clock, Award, Leaf, Users } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Swift Delivery",
    description: "Expertly prepared and delivered within 20 minutes, maintaining perfect temperature and quality.",
  },
  {
    icon: Award,
    title: "Fusion Mastery",
    description: "Perfect blend of Italian techniques with authentic Indian spices and traditional cooking methods.",
  },
  {
    icon: Leaf,
    title: "Fresh Daily",
    description: "Hand-stretched dough and premium ingredients prepared fresh every morning by our master chefs.",
  },
  {
    icon: Users,
    title: "Cultural Bridge",
    description: "Bringing together food lovers from both cultures, creating a unique dining experience for everyone.",
  },
]

export function RefinedFeatures() {
  return (
    <section className="py-24 px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full text-sm text-white/50 font-light tracking-wide">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
              CRAFTED WITH
              <br />
              <span className="text-white/30 font-extralight">PASSION</span>
            </h2>
            <div className="w-16 h-px bg-white/20 mx-auto mb-8"></div>
            <p className="text-lg text-white/40 font-light max-w-2xl mx-auto leading-relaxed">
              We believe in the art of fusion cuisine. Every detail matters, from ingredient selection to cultural
              authenticity.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group cursor-pointer"
            >
              <div className="w-16 h-16 bg-white/[0.03] border border-white/[0.08] rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/[0.06] group-hover:border-white/[0.15] transition-all duration-500">
                <feature.icon className="h-6 w-6 text-white/40 group-hover:text-white/60 transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-light text-white mb-4 group-hover:text-white/80 transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="text-white/30 font-light leading-relaxed text-sm group-hover:text-white/40 transition-colors duration-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Clean Stats */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "4.9", label: "Average Rating", sublabel: "From 15K+ Reviews" },
            { number: "20min", label: "Delivery Time", sublabel: "Average Duration" },
            { number: "150K+", label: "Happy Customers", sublabel: "And Growing" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group cursor-pointer"
            >
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 backdrop-blur-2xl group-hover:bg-white/[0.04] group-hover:border-white/[0.1] transition-all duration-500">
                <div className="text-3xl font-light text-white mb-3 group-hover:text-white/80 transition-colors duration-500">
                  {stat.number}
                </div>
                <div className="text-white/60 font-light mb-2">{stat.label}</div>
                <div className="text-white/30 text-sm font-light">{stat.sublabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
