"use client"

import { useCart } from "@/components/cart-context"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingCart, User } from "lucide-react"

export function MobileBottomNav() {
  const pathname = usePathname()
  const { items } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  
  const isActive = (path: string) => {
    if (path === '/') return pathname === path
    return pathname.startsWith(path)
  }


  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg rounded-t-2xl z-50">
      <div className="flex justify-around items-center h-16 px-4">
        <Link 
          href="/" 
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors ${
            isActive('/') ? 'text-pink-500' : 'text-gray-600'
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          href="/checkout" 
          className={`relative flex flex-col items-center justify-center p-2 rounded-full transition-colors ${
            isActive('/cart') ? 'text-pink-500' : 'text-gray-600'
          }`}
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="text-xs mt-1">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>
        
        <Link 
          href="/account" 
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors ${
            isActive('/account') ? 'text-pink-500' : 'text-gray-600'
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </div>
    </nav>
  )
}
