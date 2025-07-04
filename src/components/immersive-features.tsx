"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Clock, Award, Leaf, Users, Zap } from "lucide-react"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { BackgroundGradient } from "@/components/ui/background-gradient"

const FeatureHeader = ({ icon, color }: { icon: React.ReactNode; color: string }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-800 from-neutral-100 to-neutral-200 relative overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20`} />
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-white">{icon}</div>
    </div>
  </div>
)

const features = [
  {
    title: "Lightning Fast Delivery",
    description: "Get your pizza delivered in under 15 minutes with our revolutionary delivery system.",
    header: <FeatureHeader icon={<Zap className="h-8 w-8" />} color="from-yellow-500 to-orange-500" />,
    className: "md:col-span-2",
    icon: <Clock className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Premium Quality",
    description: "Only the finest ingredients sourced from trusted Italian suppliers.",
    header: <FeatureHeader icon={<Award className="h-8 w-8" />} color="from-blue-500 to-purple-500" />,
    className: "md:col-span-1",
    icon: <Award className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Fresh Daily",
    description: "Hand-made dough and fresh ingredients prepared every morning.",
    header: <FeatureHeader icon={<Leaf className="h-8 w-8" />} color="from-green-500 to-emerald-500" />,
    className: "md:col-span-1",
    icon: <Leaf className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "100K+ Happy Customers",
    description: "Join our community of pizza lovers who trust us for the perfect slice.",
    header: <FeatureHeader icon={<Users className="h-8 w-8" />} color="from-pink-500 to-red-500" />,
    className: "md:col-span-2",
    icon: <Users className="h-4 w-4 text-neutral-500" />,
  },
]

export function ImmersiveFeatures() {
  return (
    <section className="py-15 px-8 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-6xl md:text-8xl font-black text-white mb-6 leading-none">
              WHY
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">PIZZIFY</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-neutral-400 font-light max-w-3xl mx-auto leading-relaxed"
          >
            We don&apos;t just make pizza. We craft experiences that bring people together, one perfect slice at a time.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <BentoGrid className="max-w-6xl mx-auto">
            {features.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </motion.div>

        {/* Interactive Stats */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "4.9", label: "Average Rating", icon: "⭐", color: "from-yellow-500 to-orange-500" },
            { number: "15min", label: "Delivery Time", icon: "🚀", color: "from-blue-500 to-purple-500" },
            { number: "100K+", label: "Happy Customers", icon: "❤️", color: "from-pink-500 to-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <BackgroundGradient className="rounded-3xl p-8 bg-black">
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div
                    className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-neutral-400 font-light uppercase tracking-widest text-sm">{stat.label}</div>
                </div>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
