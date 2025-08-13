"use client"
import { Menu, X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const menuItems = [
    { href: "#about", label: "About" },
    { href: "#programs", label: "Programs" },
    { href: "#impact", label: "Impact" },
    { href: "#donate", label: "Donate" },
    { href: "#contact", label: "Contact" },
  ]

  const handleMenuClick = (href: string) => {
    setIsOpen(false)
    // Smooth scroll to section with offset for fixed header
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        const headerHeight = 80 // Approximate header height
        const elementPosition = element.offsetTop - headerHeight
        
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth"
        })
      }
    }, 100) // Small delay to ensure menu closes first
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="block md:hidden"
        onClick={() => {
          console.log('Menu button clicked, current state:', isOpen)
          setIsOpen(!isOpen)
        }}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] md:hidden bg-red-500 bg-opacity-20">
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => {
              console.log('Overlay clicked, closing menu')
              setIsOpen(false)
            }} 
          />
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-200">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-gray-900">CIWED Ghana</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  console.log('Close button clicked')
                  setIsOpen(false)
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="p-4">
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => {
                        console.log('Menu item clicked:', item.href)
                        handleMenuClick(item.href)
                      }}
                      className="block w-full text-left py-2 px-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
