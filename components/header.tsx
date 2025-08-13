"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MobileMenu } from "./mobile-menu"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Debug log for mobile menu state
  console.log('Mobile menu state:', mobileMenuOpen)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }

    // Small delay to ensure DOM is ready and mobile menu is closed
    setTimeout(() => {
      try {
        const element = document.querySelector(href)
        if (element) {
          const headerHeight = 80 // Approximate header height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight
          
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth"
          })
        } else {
          console.warn(`Section ${href} not found`)
        }
      } catch (error) {
        console.error("Error scrolling to section:", error)
      }
    }, 100)
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white/90 backdrop-blur-sm"
      } border-b`}
    >
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900">CIWED Ghana</h1>
              <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">Centre for Capacity Improvement</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <nav className="flex space-x-6 lg:space-x-8">
              <button
                onClick={() => handleNavClick("#about")}
                className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
              >
                About
              </button>
              <button
                onClick={() => handleNavClick("#programs")}
                className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
              >
                Programs
              </button>
              <button
                onClick={() => handleNavClick("#impact")}
                className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
              >
                Impact
              </button>
              <button
                onClick={() => handleNavClick("#donate")}
                className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
              >
                Donate
              </button>
              <button
                onClick={() => handleNavClick("#contact")}
                className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
              >
                Contact
              </button>
            </nav>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hidden lg:block">
              Reg No. CG041152016
            </Badge>
          </div>

          {/* Mobile Menu */}
          <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
        </div>
      </div>
    </header>
  )
}
