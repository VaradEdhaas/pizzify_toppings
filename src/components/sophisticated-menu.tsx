"use client";

import { Button } from "@heroui/react";
import { ArrowRight, Star, Clock, ChefHat } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AuroraBackground } from "./ui/aurora-background";

const fusionPizzas = [
  {
    name: "Tandoori Paneer",
    description:
      "An explosion of tandoori spice and cheesy delight — this slice brings the sizzle!",
    price: "369",
    rating: "4.9",
    time: "15min",
    popular: true,
    spiceLevel: "Medium",
  },
  {
    name: "Puneri Mastani",
    description:
      "Sweet like Mastani, spicy like a Pune lafda — this slice has it all!",
    price: "199",
    rating: "4.8",
    time: "18min",
    premium: true,
    spiceLevel: "Mild",
  },
  {
    name: "Mumbai Matka",
    description:
      "The soul of Mumbai’s pav bhaji, now on a perfect pizza canvas.",
    price: "349",
    rating: "4.9",
    time: "16min",
    chef: true,
    spiceLevel: "Medium",
  },
];

export function SophisticatedMenu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <AuroraBackground>
      <section
        ref={ref}
        className="relative z-10 py-10 px-8 max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="inline-flex items-center space-x-3 px-6 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full backdrop-blur-2xl">
              <ChefHat className="h-4 w-4 text-white/40" />
              <span className="text-sm text-white/60 font-light tracking-[0.15em]">
                FUSION MENU
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tight">
              SIGNATURE
              <br />
              <span className="text-white/30 font-extralight">CREATIONS</span>
            </h2>

            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "4rem" } : {}}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="h-px bg-white/20 mx-auto mb-8"
            />

            <p className="text-lg text-white/50 font-light max-w-3xl mx-auto leading-relaxed">
              Each pizza is a masterpiece, crafted with passion and served with
              pride.
            </p>
          </motion.div>
        </motion.div>

        {/* Pizza Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {fusionPizzas.map((pizza, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.6 + index * 0.15,
                ease: "easeOut",
              }}
              className="group cursor-pointer"
            >
              <motion.div
                className="bg-white/[0.01] border border-white/[0.06] rounded-2xl p-8 backdrop-blur-2xl transition-all duration-500 h-full hover:bg-white/[0.02] hover:border-white/[0.1]"
                whileHover={{ y: -4 }}
              >
                {/* Badge */}
                <div className="flex justify-end items-start mb-6">
                  {pizza.popular && (
                    <div className="px-3 py-1 text-amber-300/60 bg-white/[0.05] border border-white/[0.1] text-xs font-light rounded-full">
                      Popular
                    </div>
                  )}
                  {pizza.premium && (
                    <div className="px-3 py-1 text-amber-300/60 bg-white/[0.05] border border-white/[0.1] text-xs font-light rounded-full">
                      Premium
                    </div>
                  )}
                  {pizza.chef && (
                    <div className="px-3 py-1 text-amber-300/60 bg-white/[0.05] border border-white/[0.1] text-xs font-light rounded-full">
                      Chef&apos;s Choice
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="mb-8">
                  <h3 className="text-xl font-light text-white mb-3 tracking-wide">
                    {pizza.name}
                  </h3>
                  <p className="text-white/40 font-light leading-relaxed text-sm mb-6">
                    {pizza.description}
                  </p>

                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-white/30" />
                      <span className="text-white/50">{pizza.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-white/30" />
                      <span className="text-white/50">{pizza.time}</span>
                    </div>
                    <div className="text-white/40 text-xs">{pizza.spiceLevel}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-light text-green-400/60">
                    ₹{pizza.price}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center"
        >
          <Button
            as={Link}
            href="/menu"
            size="lg"
            className="h-12 px-8 rounded-md bg-white text-black hover:bg-white/90 font-normal transition-all duration-300 tracking-wide"
            radius="none"
            endContent={<ArrowRight className="h-4 w-4 ml-2" />}
          >
            View Full Menu
          </Button>
        </motion.div>
      </section>
    </AuroraBackground>
  );
}
