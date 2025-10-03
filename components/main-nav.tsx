"use client"

import * as React from "react"
import Link from "next/link"
import { cn, formatCurrency } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Baby, Shirt, Gamepad2, BookOpen, Heart, Star, HelpCircle, Search, ChevronRight, X, Package, LifeBuoy, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function MainNav({ onSearch, searchValue, searchResults = [], onResultClick }: { onSearch?: (v: string) => void, searchValue?: string, searchResults?: any[], onResultClick?: () => void }) {
  const [categories, setCategories] = useState<{ name: string; slug: string; description: string }[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (!response.ok) throw new Error("Failed to fetch categories")
        const data = await response.json()
        setCategories(data.map((cat: any) => ({ name: cat.name, slug: cat.slug, description: cat.description || "" })))
      } catch (error) {
        // Optionally handle error
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="hidden md:flex items-center">
      <NavigationMenu>
        <NavigationMenuList className="space-x-1">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 font-medium text-base">Shop</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[500px] p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">Categories</h4>
                    <ul className="space-y-2">
                      {categories.slice(0, Math.ceil(categories.length / 2)).map((category) => {
                        // Pick an icon based on category name
                        let Icon = getCategoryIcon(category.name);
                        return (
                          <li key={category.slug}>
                            <Link href={`/category/${category.slug}`} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/10">
                              <Icon className="h-5 w-5 text-primary shrink-0" />
                              <div className="flex flex-col">
                                <span className="text-base font-medium text-foreground">{category.name}</span>
                                <span className="text-xs text-muted-foreground line-clamp-1">{category.description}</span>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">More Categories</h4>
                    <ul className="space-y-2">
                      {categories.slice(Math.ceil(categories.length / 2)).map((category) => {
                        // Pick an icon based on category name
                        let Icon = getCategoryIcon(category.name);
                        return (
                          <li key={category.slug}>
                            <Link href={`/category/${category.slug}`} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/10">
                              <Icon className="h-5 w-5 text-primary shrink-0" />
                              <div className="flex flex-col">
                                <span className="text-base font-medium text-foreground">{category.name}</span>
                                <span className="text-xs text-muted-foreground line-clamp-1">{category.description}</span>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link href="/products" className="flex items-center justify-between px-3 py-2 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/10 text-primary font-medium">
                    <span>View all categories</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/deals" legacyBehavior passHref>
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-accent/50 font-medium text-base",
                pathname === "/deals" && "text-primary font-semibold"
              )}>
                Deals
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/products" legacyBehavior passHref>
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-accent/50 font-medium text-base",
                pathname === "/products" && "text-primary font-semibold"
              )}>
                All Products
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 font-medium text-base">Support</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[350px] p-4 space-y-4">
                <Link href="/contact" className="group flex items-center gap-3 px-3 py-3 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/10">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-foreground">Contact Us</span>
                    <span className="text-xs text-muted-foreground">Get in touch with our customer support team</span>
                  </div>
                </Link>
                <Link href="/faq" className="group flex items-center gap-3 px-3 py-3 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/10">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-foreground">FAQ</span>
                    <span className="text-xs text-muted-foreground">Frequently asked questions about our products</span>
                  </div>
                </Link>
                <Link href="/returns" className="group flex items-center gap-3 px-3 py-3 rounded-lg transition-colors hover:bg-primary/10 focus:bg-primary/10">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <LifeBuoy className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-foreground">Returns & Warranty</span>
                    <span className="text-xs text-muted-foreground">Information about returns and warranty</span>
                  </div>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* Search bar (desktop only) */}
      {onSearch && (
        <div className="ml-8 flex-1 max-w-md flex flex-col items-center relative">
          <form
            onSubmit={e => e.preventDefault()}
            className="w-full flex items-center relative"
          >
            <Input
              ref={inputRef}
              type="text"
              value={searchValue || ""}
              onChange={e => onSearch(e.target.value)}
              placeholder="Search kids products..."
              className="pl-10 pr-4 py-2 rounded-lg border-input bg-background/90 text-base shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
              autoComplete="off"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            {searchValue && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 rounded-full"
                onClick={() => {
                  if (onSearch) onSearch('');
                  if (inputRef.current) inputRef.current.focus();
                }}
              >
                <X className="h-3.5 w-3.5" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </form>
          {searchValue && searchResults && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto">
              <ul className="divide-y divide-border">
                {searchResults.slice(0, 8).map(product => (
                  <li key={product._id}>
                    <Link
                      href={`/product/${product._id}`}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-accent/50 transition"
                      onClick={() => {
                        if (onResultClick) onResultClick()
                        if (inputRef.current) inputRef.current.blur()
                      }}
                    >
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-muted">
                        <img
                          src={product.images?.[0]?.url || "/placeholder.svg"}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate text-base">{product.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{product.category}</div>
                        <div className="text-sm font-bold text-primary">{formatCurrency(product.price)}</div>
                      </div>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/products?search=${encodeURIComponent(searchValue)}`}
                    className="block py-2 px-4 text-center text-sm text-primary hover:bg-accent/50 transition font-medium"
                  >
                    See all results
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function getCategoryIcon(categoryName: string) {
  const name = categoryName.toLowerCase();
  
  if (name.includes("baby") || name.includes("infant") || name.includes("newborn")) 
    return Baby;
  if (name.includes("clothing") || name.includes("clothes") || name.includes("apparel")) 
    return Shirt;
  if (name.includes("toy") || name.includes("game") || name.includes("play")) 
    return Gamepad2;
  if (name.includes("book") || name.includes("education") || name.includes("learning")) 
    return BookOpen;
  if (name.includes("accessory") || name.includes("jewelry") || name.includes("decoration")) 
    return Heart;
  if (name.includes("special") || name.includes("featured") || name.includes("premium")) 
    return Star;
  
  // Default icon for children's products
  return Sparkles;
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { Icon?: React.ComponentType<{ className?: string }> }
>(({ className, title, children, Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {Icon && <Icon className="h-5 w-5" />}
            <span>{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
