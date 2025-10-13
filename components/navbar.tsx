"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, Heart, Menu, X, Phone, Mail } from "lucide-react"
import { useCart } from "@/components/cart-context"

export function Navbar() {
  const { items: cartItems } = useCart()
  const [wishlistCount, setWishlistCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle wishlist count
  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      setWishlistCount(wishlist.length)
    }
    
    // Initial load
    updateWishlistCount()
    
    // Listen for wishlist changes
    window.addEventListener("wishlistChanged", updateWishlistCount)
    return () => window.removeEventListener("wishlistChanged", updateWishlistCount)
  }, [])

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm("")
      setMobileMenuOpen(false) // Close mobile menu after search
    }
  }

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      {/* Top Contact Bar */}
      <div className="bg-gray-100 text-gray-600 text-sm py-2 border-b border-gray-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <a href="tel:+254758212888" className="flex items-center hover:text-pink-500 transition-colors">
              <Phone className="h-3.5 w-3.5 mr-1.5" />
              <span>+254 758 212 888</span>
            </a>
            <span className="hidden md:inline-block text-gray-300">|</span>
            <a href="mailto:info@branakids.co.ke" className="flex items-center hover:text-pink-500 transition-colors">
              <Mail className="h-3.5 w-3.5 mr-1.5" />
              <span>info@branakids.co.ke</span>
            </a>
          </div>
          <div className="text-xs">
            Free delivery on orders over Ksh 3,000
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Logo - Centered on mobile, left on desktop */}
        <Link 
          href="/" 
          className="text-2xl md:text-3xl font-bold text-gray-800 hover:text-pink-500 transition-colors flex-1 md:flex-none text-center md:text-left"
        >
          BRANA<span className="text-pink-500">★</span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <form onSubmit={handleSearch} className="w-full relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-12 rounded-full border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 h-10"
              aria-label="Search products"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link href="/wishlist" passHref>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-pink-50 group"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className="h-5 w-5 text-gray-600 group-hover:text-pink-500 transition-colors" />
              {wishlistCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-pink-500 text-white text-xs"
                  aria-hidden="true"
                >
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/cart" passHref>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-pink-50 group"
              aria-label={`Shopping Cart (${cartItemCount} items)`}
            >
              <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-pink-500 transition-colors" />
              {cartItemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-pink-500 text-white text-xs"
                  aria-hidden="true"
                >
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile Search - Hidden on desktop */}
      <div className="md:hidden px-4 pb-4 -mt-2">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-12 rounded-full border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 h-10"
            aria-label="Search products"
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </header>
  )
}