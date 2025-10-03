"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Menu, 
  X, 
  User, 
  Star,
  Phone,
  MessageCircle
} from "lucide-react"
import { useCart } from "@/components/cart-context"
import { getWhatsAppUrl, getWhatsAppPhone } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"
import { CartModal } from "@/components/cart-modal"

export function Navbar() {
  const { items: cartItems, subtotal } = useCart()
  const [wishlist, setWishlist] = useState<string[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [whatsappPhone, setWhatsappPhone] = useState("+254758212888")

  useEffect(() => {
    // Get phone number from utility function
    setWhatsappPhone(getWhatsAppPhone())
    
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('branakids-wishlist')
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  // Listen for wishlist changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedWishlist = localStorage.getItem('branakids-wishlist')
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const wishlistCount = wishlist.length

  // Debug logging
  console.log('Navbar - Cart items:', cartItems)
  console.log('Navbar - Cart count:', cartItemCount)
  console.log('Navbar - Wishlist:', wishlist)
  console.log('Navbar - Wishlist count:', wishlistCount)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Navigate to products page with search term
      window.location.href = `/?search=${encodeURIComponent(searchTerm.trim())}`
    }
  }

  const handleWhatsAppContact = () => {
    const message = "Hello! I'm interested in your products. Can you help me? 🌟"
    const whatsappUrl = getWhatsAppUrl(message)
    window.open(whatsappUrl, '_blank')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="text-2xl font-bold text-brana-green group-hover:scale-105 transition-transform duration-300">
                BRANA
              </div>
              <div className="text-xl font-bold text-brana-pink group-hover:scale-105 transition-transform duration-300">
                KIDS
              </div>
              <div className="absolute -top-1 -right-1 text-brana-yellow text-sm animate-bounce-gentle">
                ⭐
              </div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="Search for toys, clothes, books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 rounded-full border-2 border-gray-200 focus:border-brana-green transition-colors"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-brana-green hover:bg-brana-green/90"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            {/* WhatsApp Contact - Desktop */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWhatsAppContact}
              className="hidden lg:flex h-10 w-10 rounded-full bg-green-100 hover:bg-green-200 text-green-600"
              title={`Contact us: ${whatsappPhone}`}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-full hover:bg-pink-100 transition-colors"
              title="Wishlist"
              onClick={() => {
                // Toggle wishlist modal or show wishlist items
                console.log('Wishlist clicked, items:', wishlistCount)
              }}
            >
              <Heart className="h-5 w-5 text-pink-500" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-pink-500 text-white font-bold">
                  {wishlistCount}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-full hover:bg-brana-green/10 transition-colors"
              title="Shopping Cart"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5 text-brana-green" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-brana-green text-white font-bold">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* User Account */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
              title="Account"
            >
              <User className="h-5 w-5 text-gray-600" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search for toys, clothes, books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 rounded-full border-2 border-gray-200 focus:border-brana-green transition-colors"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-brana-green hover:bg-brana-green/90"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link
                href="/"
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Star className="h-5 w-5 text-brana-yellow" />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                href="/products"
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 text-brana-green" />
                <span className="font-medium">All Products</span>
              </Link>
              <Link
                href="/deals"
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Star className="h-5 w-5 text-red-500" />
                <span className="font-medium">Special Deals</span>
              </Link>
            </div>

            {/* Mobile Contact */}
            <div className="border-t border-gray-200 pt-4">
              <Button
                onClick={handleWhatsAppContact}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Contact Us: {whatsappPhone}</span>
              </Button>
            </div>

            {/* Mobile Cart Summary */}
            {cartItemCount > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between px-4 py-2 bg-brana-green/10 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-5 w-5 text-brana-green" />
                    <span className="font-medium">Cart ({cartItemCount} items)</span>
                  </div>
                  <span className="font-bold text-brana-green">
                    KSh {subtotal.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cart Modal */}
      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  )
}
