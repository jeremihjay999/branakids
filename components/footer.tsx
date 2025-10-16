"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Heart,
  Star,
  Shield,
  Truck,
  Clock,
  MessageCircle
} from "lucide-react"
import { getWhatsAppUrl, getWhatsAppPhone } from "@/lib/whatsapp"

export function Footer() {
  const [categories, setCategories] = useState<any[]>([])
  const [whatsappPhone, setWhatsappPhone] = useState("+254758212888")

  useEffect(() => {
    // Get phone number from utility function
    setWhatsappPhone(getWhatsAppPhone())
    
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories")
        if (!res.ok) throw new Error("Failed to fetch categories")
        const data = await res.json()
        // Sort by createdAt descending and take the latest 6
        const sorted = Array.isArray(data)
          ? data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6)
          : []
        setCategories(sorted)
      } catch {
        setCategories([])
      }
    }
    fetchCategories()
  }, [])

  const handleWhatsAppContact = () => {
    const message = "Hello! I have a question about your products. Can you help me? 🌟"
    const whatsappUrl = getWhatsAppUrl(message)
    window.open(whatsappUrl, '_blank')
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-bold text-brana-green">BRANA</div>
              <div className="text-2xl font-bold text-brana-pink">KIDS</div>
              <div className="text-brana-yellow text-lg">⭐</div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Let Your Kid Smile! We provide quality children's products that bring joy and happiness to your little ones. From toys to clothing, we have everything your child needs.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brana-green" />
                <Link 
                  href={getWhatsAppUrl("Hello! I'm interested in your products. Can you help me?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-brana-green transition-colors text-sm"
                >
                  {whatsappPhone}
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brana-green" />
                <span className="text-gray-300 text-sm">info@branakids.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-brana-green" />
                <span className="text-gray-300 text-sm">Nairobi, Kenya</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <Link 
                href="https://www.facebook.com/share/1BEp2hSfzv/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href="https://x.com/brana_kids?t=UVoiimkBnfo94JvvfFRPNw&s=09" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="https://www.instagram.com/brana.kids?igsh=aXkyaTkwMmgwYmVh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#E1306C] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link 
                href="https://www.tiktok.com/@branastores?_t=ZM-90P0NYYUeOO&_r=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#000000] dark:hover:text-[#69C9D0] transition-colors"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-brana-green transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-brana-green transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-300 hover:text-brana-green transition-colors text-sm">
                  Special Deals
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-brana-green transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-brana-green transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <ul className="space-y-3">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat._id}>
                    <Link 
                      href={`/category/${cat.slug}`} 
                      className="text-gray-300 hover:text-brana-green transition-colors text-sm"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><span className="text-gray-300 text-sm">Toys & Games</span></li>
                  <li><span className="text-gray-300 text-sm">Clothing</span></li>
                  <li><span className="text-gray-300 text-sm">Books</span></li>
                  <li><span className="text-gray-300 text-sm">Accessories</span></li>
                  <li><span className="text-gray-300 text-sm">Educational</span></li>
                </>
              )}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-brana-green transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-brana-green transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-brana-green transition-colors text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-brana-green transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-brana-green transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>

            {/* WhatsApp Contact Button */}
            <button
              onClick={handleWhatsAppContact}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Chat with Us</span>
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-brana-green/20 p-2 rounded-lg">
                <Truck className="h-5 w-5 text-brana-green" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Free Delivery</h4>
                <p className="text-gray-400 text-xs">On orders over KSh 2,000</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-brana-pink/20 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-brana-pink" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Secure Payment</h4>
                <p className="text-gray-400 text-xs">100% safe transactions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-brana-blue/20 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-brana-blue" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">24/7 Support</h4>
                <p className="text-gray-400 text-xs">We're here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {new Date().getFullYear()} BRANA KIDS. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span className="hidden md:inline">in Kenya</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-brana-green transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-brana-green transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-brana-green transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}