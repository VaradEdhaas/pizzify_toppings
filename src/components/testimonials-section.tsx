"use client"

import { Card, CardBody, Avatar } from "@heroui/react"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Food Enthusiast",
    content: "The best pizza I've ever had! The crust is perfectly crispy and the ingredients taste incredibly fresh.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Michael Chen",
    role: "Local Resident",
    content:
      "Pizzify has become our go-to for family dinners. The quality is consistent and delivery is always on time.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emma Davis",
    role: "Pizza Lover",
    content: "I love how they use traditional techniques. You can really taste the difference in every bite.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function TestimonialsSection() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-6 tracking-tight">
            What Our <span className="text-neutral-400">Customers Say</span>
          </h2>
          <p className="text-xl text-neutral-400 font-light max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what pizza lovers across the city are saying about Pizzify.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
              <CardBody className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-300 font-light leading-relaxed mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar
                    src={testimonial.avatar}
                    size="sm"
                    className="mr-3"
                    classNames={{
                      base: "bg-white/10",
                      fallback: "text-white font-light",
                    }}
                  />
                  <div>
                    <p className="text-white font-normal text-sm">{testimonial.name}</p>
                    <p className="text-neutral-500 font-light text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
