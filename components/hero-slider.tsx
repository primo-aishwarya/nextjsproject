"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const slides = [
  {
    image: "/images/children-group-happy.jpg",
    title: "Empowering Through Education",
    subtitle: "Supporting vulnerable children with discrete educational assistance",
    cta: "Join Our Mission",
  },
  {
    image: "/images/girl-heart-hands.jpg",
    title: "Building Brighter Futures",
    subtitle: "Creating pathways to success for socially disadvantaged children",
    cta: "Make a Donation",
  },
  {
    image: "/images/children-window-happy.jpg",
    title: "Silent Support Network",
    subtitle: "Maintaining dignity while providing essential educational resources",
    cta: "Learn More",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleCTAClick = () => {
    const element = document.querySelector("#donate")
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-emerald-600/80 hover:bg-emerald-700/80 backdrop-blur-sm text-xs sm:text-sm">
                Educational Support Organization
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-6 lg:mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
                {slide.subtitle}
              </p>
              <Button
                size="lg"
                onClick={handleCTAClick}
                className="bg-emerald-600 hover:bg-emerald-700 text-base lg:text-lg px-6 lg:px-8 py-2 lg:py-3"
              >
                <Heart className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                {slide.cta}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 lg:p-3 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 lg:p-3 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
