"use client"

import { Phone, Mail, MapPin, Heart, Users, BookOpen, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { HeroSlider } from "@/components/hero-slider"
import { StatsSection } from "@/components/stats-section"
import { ProgramsSection } from "@/components/programs-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PartnersSection } from "@/components/partners-section"
import { ContactForm } from "@/components/contact-form"
import { useEffect } from "react"
import DonationForm from "@/components/DonationForm";


export default function HomePage() {
  useEffect(() => {
    // Handle donation amount selection
    const amountButtons = document.querySelectorAll('.donation-amount-btn')
    const customAmountInput = document.getElementById('custom-amount') as HTMLInputElement

    amountButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active state from all buttons
        amountButtons.forEach(btn => {
          btn.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-600')
          btn.classList.add('bg-emerald-100', 'text-emerald-800', 'border-emerald-300')
        })
        
        // Add active state to clicked button
        button.classList.remove('bg-emerald-100', 'text-emerald-800', 'border-emerald-300')
        button.classList.add('bg-emerald-600', 'text-white', 'border-emerald-600')
        
        // Fill custom amount input with selected amount
        if (customAmountInput) {
          const selectedAmount = button.getAttribute('data-amount')
          customAmountInput.value = selectedAmount || ''
        }
      })
    })

    // Handle custom amount input
    if (customAmountInput) {
      customAmountInput.addEventListener('input', () => {
        // Remove active state from all buttons when custom amount is entered
        amountButtons.forEach(btn => {
          btn.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-600')
          btn.classList.add('bg-emerald-100', 'text-emerald-800', 'border-emerald-300')
        })
      })
    }

    // Handle card number formatting
    const cardNumberInput = document.getElementById('card-number') as HTMLInputElement
    if (cardNumberInput) {
      cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '')
        value = value.replace(/(\d{4})/g, '$1 ').trim()
        e.target.value = value.substring(0, 19)
      })
    }

    // Handle expiry date formatting
    const expiryInput = document.getElementById('expiry') as HTMLInputElement
    if (expiryInput) {
      expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '')
        if (value.length >= 2) {
          value = value.substring(0, 2) + '/' + value.substring(2, 4)
        }
        e.target.value = value
      })
    }

    // Handle CVV formatting
    const cvvInput = document.getElementById('cvv') as HTMLInputElement
    if (cvvInput) {
      cvvInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '')
        e.target.value = value.substring(0, 4)
      })
    }

    // Handle form submission
    const donationForm = document.querySelector('form')
    if (donationForm) {
      donationForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        // Get selected amount
        const activeButton = document.querySelector('.donation-amount-btn.bg-emerald-600')
        const customAmount = customAmountInput?.value
        const selectedAmount = activeButton ? activeButton.getAttribute('data-amount') : customAmount
        
        if (!selectedAmount || parseFloat(selectedAmount) <= 0) {
          showNotification('Please select a donation amount or enter a custom amount.', 'error')
          return
        }

        // Get form data
        // const cardNumber = cardNumberInput?.value
        // const expiry = expiryInput?.value
        // const cvv = cvvInput?.value
        // const cardName = (document.getElementById('card-name') as HTMLInputElement)?.value
        const email = (document.getElementById('email') as HTMLInputElement)?.value

        // Basic validation
        // if (!cardNumber || !expiry || !cvv || !cardName || !email) {
        if (!email) {
          showNotification('Please fill in all required fields.', 'error')
          return
        }

        // Show success message
        // showNotification(`Thank you for your donation of $${selectedAmount}! This is a demo form. In a real implementation, this would process the payment securely.`, 'success')
        
        // Reset form
        donationForm.reset()
        amountButtons.forEach(btn => {
          btn.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-600')
          btn.classList.add('bg-emerald-100', 'text-emerald-800', 'border-emerald-300')
        })
      })
    }

    // Function to show notifications
    function showNotification(message: string, type: 'success' | 'error' = 'success') {
      // Remove existing notifications
      const existingNotifications = document.querySelectorAll('.notification')
      existingNotifications.forEach(notification => notification.remove())

      // Create notification element
      const notification = document.createElement('div')
      notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`
      
      const bgColor = type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
      const icon = type === 'success' ? '✓' : '✕'
      
      notification.innerHTML = `
        <div class="flex items-center space-x-3 ${bgColor} text-white p-4 rounded-lg">
          <div class="flex-shrink-0">
            <span class="text-lg font-bold">${icon}</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium">${message}</p>
          </div>
          <button class="flex-shrink-0 text-white hover:text-gray-200 transition-colors" onclick="this.parentElement.parentElement.remove()">
            <span class="text-lg">×</span>
          </button>
        </div>
      `
      
      document.body.appendChild(notification)
      
      // Animate in
      setTimeout(() => {
        notification.classList.remove('translate-x-full')
      }, 100)
      
      // Auto remove after 5 seconds
      setTimeout(() => {
        if (notification.parentElement) {
          notification.classList.add('translate-x-full')
          setTimeout(() => {
            if (notification.parentElement) {
              notification.remove()
            }
          }, 300)
        }
      }, 5000)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Quick Info Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Vulnerable Children</h3>
              <p className="text-gray-600 text-sm lg:text-base">
                Supporting those without social protection across Ghana
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Education Focus</h3>
              <p className="text-gray-600 text-sm lg:text-base">
                Creating opportunities through quality learning resources
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Discrete Support</h3>
              <p className="text-gray-600 text-sm lg:text-base">Maintaining dignity through confidential assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div id="impact">
        <StatsSection />
      </div>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">About CIWED Ghana</h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                Originally established as the Centre for Capacity Improvement for the Wellbeing of the Vulnerable, we
                are a registered organization dedicated to supporting Ghana's most disadvantaged children.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
              <div className="order-2 lg:order-1">
                <img
                  src="/images/children-window-care.jpg"
                  alt="Children learning together"
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 lg:mb-6">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed mb-4 lg:mb-6 text-sm lg:text-base">
                  CIWED Ghana operates as a discrete support network, identifying and assisting socially disadvantaged
                  children who lack access to proper educational resources and social protection systems. Our approach
                  ensures that vulnerable children receive the support they need while maintaining their dignity and
                  privacy.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4 lg:mb-6 text-sm lg:text-base">
                  Through our confidential methodology, we work directly with communities, schools, and families to
                  provide comprehensive educational support that addresses both immediate needs and long-term
                  development goals.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-3 lg:p-4 rounded-lg">
                    <h4 className="font-semibold text-emerald-800 mb-2 text-sm lg:text-base">Established</h4>
                    <p className="text-emerald-700 text-sm lg:text-base">June 30, 2016</p>
                  </div>
                  <div className="bg-blue-50 p-3 lg:p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2 text-sm lg:text-base">Legal Status</h4>
                    <p className="text-blue-700 text-sm lg:text-base">Limited by Guarantee</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-lg bg-gray-50">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl text-center">Legal Registration Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 text-center">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Registration Number</h4>
                    <p className="text-gray-600 text-sm lg:text-base">CG041152016</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">TIN</h4>
                    <p className="text-gray-600 text-sm lg:text-base">C0006711561</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Incorporation Date</h4>
                    <p className="text-gray-600 text-sm lg:text-base">June 30, 2016</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Company Type</h4>
                    <p className="text-gray-600 text-sm lg:text-base">Limited by Guarantee</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <div id="programs">
        <ProgramsSection />
      </div>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Donation Section */}
      <section id="donate" className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">Support Our Mission</h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                Your donations directly impact the lives of vulnerable children in Ghana. Every contribution helps us
                provide essential educational resources and support to those who need it most.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Credit Card Donation Form */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-blue-600 text-white">
                  <CardTitle className="text-xl lg:text-2xl">Credit Card Donation</CardTitle>
                  <CardDescription className="text-blue-100">
                    Secure online donations via Visa, Mastercard, and other major cards
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 lg:p-8">
                  <DonationForm />
                </CardContent>
              </Card>

              {/* Bank Transfer Information */}
              <div className="space-y-6 lg:space-y-8">
                <Card className="border-0 shadow-xl">
                  <CardHeader className="bg-emerald-600 text-white">
                    <CardTitle className="text-xl lg:text-2xl">Bank Transfer (USD)</CardTitle>
                    <CardDescription className="text-emerald-100">
                      Secure international donations through Access Bank Ghana
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 lg:p-8">
                    <div className="space-y-3 lg:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between py-2 lg:py-3 border-b">
                        <span className="font-medium text-gray-700 text-sm lg:text-base">Account Name:</span>
                        <span className="text-gray-900 font-semibold text-sm lg:text-base">CIWED GHANA-DOLLAR</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between py-2 lg:py-3 border-b">
                        <span className="font-medium text-gray-700 text-sm lg:text-base">Account Number:</span>
                        <span className="text-gray-900 font-semibold text-sm lg:text-base">1012000005988</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between py-2 lg:py-3 border-b">
                        <span className="font-medium text-gray-700 text-sm lg:text-base">Bank Name:</span>
                        <span className="text-gray-900 font-semibold text-sm lg:text-base">ACCESS BANK</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between py-2 lg:py-3 border-b">
                        <span className="font-medium text-gray-700 text-sm lg:text-base">Branch:</span>
                        <span className="text-gray-900 font-semibold text-sm lg:text-base">HEAD OFFICE ACCRA</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between py-2 lg:py-3 border-b">
                        <span className="font-medium text-gray-700 text-sm lg:text-base">Swift Code:</span>
                        <span className="text-gray-900 font-semibold text-sm lg:text-base">ABNGGHAC</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between py-2 lg:py-3">
                        <span className="font-medium text-gray-700 text-sm lg:text-base">Bank Address:</span>
                        <div className="text-left sm:text-right text-gray-900 font-semibold text-sm lg:text-base">
                          <div>Starlets 91 Road</div>
                          <div>Opp. Accra Sports Stadium</div>
                          <div>Osu-Accra</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl lg:text-2xl text-blue-600">Why Your Donation Matters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 lg:space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 lg:w-6 lg:h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <p className="text-gray-600 text-sm lg:text-base">
                          Direct impact on vulnerable children's education and future prospects
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 lg:w-6 lg:h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <p className="text-gray-600 text-sm lg:text-base">
                          Transparent and accountable use of funds with regular impact reports
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 lg:w-6 lg:h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <p className="text-gray-600 text-sm lg:text-base">
                          Supporting Ghana's most disadvantaged children with dignity
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 lg:w-6 lg:h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <p className="text-gray-600 text-sm lg:text-base">
                          Creating lasting change through education and community support
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-blue-50">
                  <CardContent className="p-6 lg:p-8 text-center">
                    <Heart className="w-10 h-10 lg:w-12 lg:h-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-lg lg:text-xl font-bold text-emerald-800 mb-2">Every Donation Counts</h3>
                    <p className="text-emerald-700 mb-4 text-sm lg:text-base">
                      Your contribution helps us maintain our discrete support network and reach more children in need.
                    </p>
                    <div className="bg-white/50 rounded-lg p-3 lg:p-4">
                      <p className="text-xs lg:text-sm text-emerald-800 font-medium">
                        "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">Get in Touch</h2>
              <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
                Contact us for more information about our work, to discuss partnership opportunities, or to learn how
                you can support vulnerable children in Ghana.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold mb-6 lg:mb-8">Contact Information</h3>
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-base lg:text-lg">Phone</p>
                      <p className="text-gray-300 text-sm lg:text-base">+233 246 901 044</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-base lg:text-lg">Email</p>
                      <p className="text-gray-300 text-sm lg:text-base">donation@ciwedgh.org</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-base lg:text-lg">Location</p>
                      <p className="text-gray-300 text-sm lg:text-base">Ghana, West Africa</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 lg:mt-12 p-4 lg:p-6 bg-gray-800 rounded-lg">
                  <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Office Hours</h4>
                  <div className="space-y-2 text-gray-300 text-sm lg:text-base">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-6 lg:mb-8">
            <div className="sm:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-bold">CIWED Ghana</h3>
                  <p className="text-gray-400 text-xs lg:text-sm">Centre for Capacity Improvement</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md text-sm lg:text-base">
                Empowering vulnerable children through discrete educational support and community partnerships across
                Ghana.
              </p>
              <div className="text-xs lg:text-sm text-gray-500">
                <p>Reg No. CG041152016 | TIN: C0006711561</p>
                <p>Incorporated: June 30, 2016 | Limited by Guarantee</p>
              </div>
            </div>

            <div>
              <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm lg:text-base">
                <li>
                  <button
                    onClick={() => {
                      const element = document.querySelector("#about")
                      if (element) {
                        const headerHeight = 80
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight
                        window.scrollTo({
                          top: elementPosition,
                          behavior: "smooth"
                        })
                      }
                    }}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const element = document.querySelector("#programs")
                      if (element) {
                        const headerHeight = 80
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight
                        window.scrollTo({
                          top: elementPosition,
                          behavior: "smooth"
                        })
                      }
                    }}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Our Programs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const element = document.querySelector("#impact")
                      if (element) {
                        const headerHeight = 80
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight
                        window.scrollTo({
                          top: elementPosition,
                          behavior: "smooth"
                        })
                      }
                    }}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Impact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const element = document.querySelector("#donate")
                      if (element) {
                        const headerHeight = 80
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight
                        window.scrollTo({
                          top: elementPosition,
                          behavior: "smooth"
                        })
                      }
                    }}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Donate
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm lg:text-base">
                <li>+233 246 901 044</li>
                <li>donation@ciwedgh.org</li>
                <li>Ghana, West Africa</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 lg:pt-8 text-center">
            <p className="text-gray-500 text-xs lg:text-sm">
              © 2024 CIWED Ghana. All rights reserved. | Empowering children through education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
