"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah M.",
    role: "Community Leader",
    content:
      "CIWED Ghana has transformed our community. Their discrete approach ensures children receive help without stigma, and the results speak for themselves.",
    image: "/images/mother-child-vulnerable.jpg",
  },
  {
    name: "Teacher Emmanuel",
    role: "Primary School Teacher",
    content:
      "I have witnessed firsthand how CIWED's support has enabled children to stay in school and excel in their studies. Their work is truly remarkable.",
    image: "/images/children-group-happy.jpg",
  },
  {
    name: "Mary A.",
    role: "Parent",
    content:
      "My daughter was struggling without proper school supplies. CIWED helped us discretely, and now she is one of the top students in her class.",
    image: "/images/girl-heart-hands.jpg",
  },
  {
    name: "Dr. Kwame",
    role: "Education Specialist",
    content:
      "CIWED Ghana's approach to supporting vulnerable children is both innovative and effective. They truly understand the importance of maintaining dignity.",
    image: "/images/children-window-care.jpg",
  },
]

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What People Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from community members, teachers, and parents about the impact of our work.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-12">
              <div className="text-center">
                <Quote className="w-8 h-8 lg:w-12 lg:h-12 text-emerald-600 mx-auto mb-4 lg:mb-6" />
                <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-6 lg:mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <img
                    src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover"
                  />
                  <div className="text-center sm:text-left">
                    <div className="font-semibold text-gray-900 text-sm lg:text-base">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600 text-xs lg:text-sm">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-emerald-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
