"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Menu, Baby, Shirt, Gamepad2, BookOpen, Heart, Star, Search, Home, Tag, Package, LifeBuoy, ChevronRight, Sparkles, X, ShoppingCart, User } from "lucide-react"
import { MobileBottomNav } from "./mobile-bottom-nav"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function MobileNav({ onSearch, searchValue, searchResults, onResultClick, cartCount = 0 }: { 
  onSearch?: (v: string) => void, 
  searchValue?: string, 
  searchResults?: any[], 
  onResultClick?: () => void,
  cartCount?: number
}) {
  const [open, setOpen] = React.useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [localSearchValue, setLocalSearchValue] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (!response.ok) throw new Error("Failed to fetch categories")
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([])
      }
    }
    fetchCategories()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && localSearchValue) {
      onSearch(localSearchValue)
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col max-w-[85vw] w-80 p-0">
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col items-center py-4 px-4 bg-white border-b sticky top-0 z-40">
            <Link href="/" className="block h-12 w-full max-w-[180px] mb-2">
              <img 
                src="/Logo1.png" 
                alt="Brana Kids" 
                className="h-full w-full object-contain"
                width={180}
                height={48}
              />
            </Link>
            <div className="text-2xl font-bold">
              <span className="text-[#FF6B6B]">B</span>
              <span className="text-[#4ECDC4]">r</span>
              <span className="text-[#45B7D1]">a</span>
              <span className="text-[#96CEB4]">n</span>
              <span className="text-[#FFEEAD]">a</span>
              <span className="text-[#FF6B6B]">K</span>
              <span className="text-[#4ECDC4]">i</span>
              <span className="text-[#45B7D1]">D</span>
              <span className="text-[#96CEB4]">S</span>
              <span className="text-[#FF6B6B]!">!</span>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-primary/10 dark:bg-primary/5 p-6 border-b">
              {onSearch && (
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    value={localSearchValue}
                    onChange={(e) => setLocalSearchValue(e.target.value)}
                    placeholder="Search kids products..."
                    className="pl-10 pr-4 py-2 rounded-lg bg-background/90 border-primary/20 focus-visible:ring-primary/30"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Button 
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 rounded-full"
                  >
                    <Search className="h-3.5 w-3.5" />
                    <span className="sr-only">Search</span>
                  </Button>
                </form>
              )}
            </div>
          </div>

          <nav className="p-4">
            <div className="space-y-1">
              <Link 
                href="/" 
                onClick={() => setOpen(false)} 
                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-accent'
                }`}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
                {isActive('/') && <div className="ml-auto w-1.5 h-5 rounded-full bg-primary" />}
              </Link>

              <Accordion type="single" collapsible className="w-full border-none">
                <AccordionItem value="shop" className="border-none">
                  <AccordionTrigger className="py-3 px-4 rounded-lg hover:bg-accent text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5" />
                      <span>Shop by Category</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-1">
                    <div className="grid gap-1 pl-2">
                      {categories.map((category) => (
                        <Link
                          key={category._id || category.slug}
                          href={`/category/${category.slug}`}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 py-2.5 px-4 ml-3 rounded-lg text-sm transition-colors ${
                            isActive(`/category/${category.slug}`) 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-accent'
                          }`}
                        >
                          {getCategoryIcon(category.name)}
                          <span>{category.name}</span>
                          <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link 
                href="/deals" 
                onClick={() => setOpen(false)} 
                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/deals') 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-accent'
                }`}
              >
                <Tag className="h-5 w-5" />
                <span>Deals</span>
                {isActive('/deals') && <div className="ml-auto w-1.5 h-5 rounded-full bg-primary" />}
              </Link>
              
              <Link 
                href="/" 
                onClick={() => setOpen(false)} 
                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/products') 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-accent'
                }`}
              >
                <Package className="h-5 w-5" />
                <span>All Products</span>
                {isActive('/products') && <div className="ml-auto w-1.5 h-5 rounded-full bg-primary" />}
              </Link>
              
              <Accordion type="single" collapsible className="w-full border-none">
                <AccordionItem value="support" className="border-none">
                  <AccordionTrigger className="py-3 px-4 rounded-lg hover:bg-accent text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <LifeBuoy className="h-5 w-5" />
                      <span>Support</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-1">
                    <div className="grid gap-1 pl-2">
                      <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 py-2.5 px-4 ml-3 rounded-lg text-sm transition-colors ${
                          isActive('/contact') 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-accent'
                        }`}
                      >
                        <span>Contact Us</span>
                        {isActive('/contact') && <div className="ml-auto w-1.5 h-5 rounded-full bg-primary" />}
                      </Link>
                      <Link
                        href="/faq"
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 py-2.5 px-4 ml-3 rounded-lg text-sm transition-colors ${
                          isActive('/faq') 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-accent'
                        }`}
                      >
                        <span>FAQ</span>
                        {isActive('/faq') && <div className="ml-auto w-1.5 h-5 rounded-full bg-primary" />}
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <Link href="/search" className="p-2">
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="relative p-2">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>
        </div>

        <MobileBottomNav />
      </SheetContent>
    </Sheet>
  )
}

function getCategoryIcon(categoryName: string) {
  const name = categoryName.toLowerCase();
  
  if (name.includes("baby") || name.includes("infant") || name.includes("newborn")) 
    return <Baby className="h-4 w-4 text-primary" />;
  if (name.includes("clothing") || name.includes("clothes") || name.includes("apparel")) 
    return <Shirt className="h-4 w-4 text-primary" />;
  if (name.includes("toy") || name.includes("game") || name.includes("play")) 
    return <Gamepad2 className="h-4 w-4 text-primary" />;
  if (name.includes("book") || name.includes("education") || name.includes("learning")) 
    return <BookOpen className="h-4 w-4 text-primary" />;
  if (name.includes("accessory") || name.includes("jewelry") || name.includes("decoration")) 
    return <Heart className="h-4 w-4 text-primary" />;
  if (name.includes("special") || name.includes("featured") || name.includes("premium")) 
    return <Star className="h-4 w-4 text-primary" />;
  
  // Default icon for children's products
  return <Sparkles className="h-4 w-4 text-primary" />;
}
