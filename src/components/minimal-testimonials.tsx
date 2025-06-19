"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "The most authentic Italian pizza I've experienced outside of Naples. Every bite transports you to Italy.",
    author: "Sarah Chen",
    role: "Food Critic",
    location: "New York Times",
  },
  {
    quote: "Consistently exceptional. The attention to detail and quality of ingredients is unmatched in the city.",
    author: "Michael Torres",
    role: "Chef",
    location: "Michelin Restaurant",
  },
  {
    quote: "Not just pizza, but an art form. The passion and craftsmanship shine through in every slice.",
    author: "Emma Rodriguez",
    role: "Food Blogger",
    location: "Culinary Weekly",
  },
]

export function MinimalTestimonials() {
  return (
    <section className="py-32 px-8 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-neutral-500 font-light tracking-wide backdrop-blur-sm">
              Testimonials
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 leading-tight tracking-tight">
            What Our
            <br />
            <span className="italic text-neutral-400">Customers Say</span>
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-white/30 to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                <div className="text-5xl text-neutral-600 mb-6">"</div>
                <p className="text-lg font-light text-neutral-300 leading-relaxed mb-8 italic flex-grow group-hover:text-white transition-colors duration-500">
                  {testimonial.quote}
                </p>
                <div className="mt-auto">
                  <div className="text-white font-light mb-1 text-lg">{testimonial.author}</div>
                  <div className="text-sm text-neutral-500 font-light">{testimonial.role}</div>
                  <div className="text-xs text-neutral-600 font-light uppercase tracking-widest mt-1">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
