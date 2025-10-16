"use client"

import React, { useEffect, useState, useCallback, useMemo } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Heart, Search, Star, ShoppingCart, Filter, AlertCircle, RefreshCw, X, ChevronDown, ChevronUp } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useDebounce } from "@/hooks/useDebounce"
import { cn, formatCurrency } from "@/lib/utils"
import { useCart } from "@/components/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface Product {
  _id: string
  name: string
  description: string
  category: string
  price: number
  stock: number
  status: "in-stock" | "low-stock" | "out-of-stock"
  images: {
    url: string
    type: "url" | "file"
  }[]
  createdAt: string
  updatedAt: string
  isDeal?: boolean
  dealPrice?: number
  previousPrice?: number
  tags?: string[]
}

interface Category {
  _id: string
  name: string
  description: string
  icon: string
  slug: string
  featured: boolean
  status: string
  productCount: number
  createdAt: string
  updatedAt: string
}

interface ProductGridProps {
  products: Product[]
  categories: Category[]
}

export function ProductGrid({ products, categories }: ProductGridProps) {
  const { addToCart, cartItems = [] } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  
  // State management
  const [search, setSearch] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const debouncedSearch = useDebounce(search, 300)

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen)
  }

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('branakids-wishlist')
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error)
      }
    }
  }, [])

  // Search function with debouncing
  const searchProducts = useCallback((searchTerm: string, products: Product[]) => {
    if (!searchTerm.trim()) return products
    
    const term = searchTerm.toLowerCase()
    return products.filter(product => 
      product.name?.toLowerCase().includes(term) ||
      (product.description?.toLowerCase().includes(term)) ||
      (product.tags?.some(tag => tag?.toLowerCase().includes(term)))
    )
  }, [])

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    let result = [...products]
    
    // Apply search filter
    if (debouncedSearch) {
      result = searchProducts(debouncedSearch, result)
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      )
    }
    
    // Apply price range filter
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    
    return result
  }, [products, debouncedSearch, selectedCategories, priceRange, searchProducts])
  
  // Handle search input change with loading state
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setIsSearching(!!e.target.value.trim())
  }

  // Clear search
  const clearSearch = () => {
    setSearch('')
    setIsSearching(false)
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 10000])
    toast({
      title: "Filters cleared",
      description: "All filters have been reset",
    })
  }

  const currentProducts = filteredProducts
  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 10000

  // Render filters function
  const renderFilters = () => (
    <>
      <div className="mb-8">
        <h4 className="font-semibold text-lg mb-4 text-gray-700">Category</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {categories.slice(0, 8).map((category) => (
            <div key={category._id} className="flex items-center space-x-3">
              <Checkbox
                id={category.name}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category.name, checked as boolean)
                }
                className="border-2 border-gray-300 data-[state=checked]:bg-brana-green data-[state=checked]:border-brana-green"
              />
              <label 
                htmlFor={category.name}
                className="text-sm font-medium text-gray-700 cursor-pointer hover:text-brana-green transition-colors"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-lg mb-4 text-gray-700">Price Range (KSh)</h4>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000}
            min={0}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 font-medium">
            <span>KSh {priceRange[0].toLocaleString()}</span>
            <span>KSh {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={clearAllFilters}
            className="w-full py-2.5 px-4 rounded-lg border-2 border-gray-200 text-gray-600 font-medium 
                     hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center 
                     justify-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Clear all filters</span>
          </button>
        </div>
      )}
    </>
  )

  // Event handlers
  const toggleWishlist = useCallback((id: string) => {
    setWishlist(prev => {
      if (prev.includes(id)) {
        const newWishlist = prev.filter(item => item !== id)
        localStorage.setItem('branakids-wishlist', JSON.stringify(newWishlist))
        toast({
          title: "Removed from wishlist",
          description: "Product has been removed from your wishlist",
        })
        return newWishlist
      } else {
        const newWishlist = [...prev, id]
        localStorage.setItem('branakids-wishlist', JSON.stringify(newWishlist))
        toast({
          title: "Added to wishlist", 
          description: "Product has been added to your wishlist",
        })
        return newWishlist
      }
    })
  }, [toast])

  const handleAddToCart = useCallback((product: Product) => {
    const displayPrice = product.isDeal && product.dealPrice ? product.dealPrice : product.price
    
    addToCart({
      id: product._id,
      name: product.name,
      price: displayPrice,
      image: product.images[0]?.url || "/placeholder.jpg"
    })
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }, [addToCart, toast])

  const handleCategoryChange = useCallback((category: string, checked: boolean) => {
    setSelectedCategories(prev => 
      checked 
        ? [...prev, category]
        : prev.filter(c => c !== category)
    )
  }, [])

  const handleProductClick = useCallback((productId: string) => {
    router.push(`/product/${productId}`)
  }, [router])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="search"
                  name="search"
                  placeholder="Search for products..."
                  className="w-full rounded-full px-6 py-3 text-lg pr-12"
                  value={search}
                  onChange={handleSearchChange}
                  autoComplete="off"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isSearching ? (
                    <RefreshCw className="h-5 w-5 text-brana-green animate-spin" />
                  ) : (
                    <Search className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
          {isSearching && (
            <p className="mt-2 text-sm text-gray-500 text-center">
              Found {currentProducts.length} {currentProducts.length === 1 ? 'product' : 'products'}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Filters */}
        <aside className="w-full lg:w-72 lg:sticky lg:top-24 h-fit">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Button variant="outline" className="w-full" onClick={toggleMobileFilters}>
              <Filter className="h-4 w-4 mr-2" />
              {isMobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {/* Filter Content */}
          <div className={cn('bg-gray-50 rounded-xl p-6 shadow-sm', {
            'hidden lg:block': !isMobileFiltersOpen,
            'block': isMobileFiltersOpen
          })}>
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="h-5 w-5 text-brana-green" />
              <h3 className="font-bold text-xl text-gray-800">Filters</h3>
            </div>
            
            <div className="mb-8">
              <h4 className="font-semibold text-lg mb-4 text-gray-700">Category</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {categories.slice(0, 8).map((category) => (
                  <div key={category._id} className="flex items-center space-x-3">
                    <Checkbox
                      id={category.name}
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={(checked) => 
                        handleCategoryChange(category.name, checked as boolean)
                      }
                      className="border-2 border-gray-300 data-[state=checked]:bg-brana-green data-[state=checked]:border-brana-green"
                    />
                    <label 
                      htmlFor={category.name}
                      className="text-sm font-medium text-gray-700 cursor-pointer hover:text-brana-green transition-colors"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 text-gray-700">Price Range (KSh)</h4>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={10000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 font-medium">
                  <span>KSh {priceRange[0].toLocaleString()}</span>
                  <span>KSh {priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2.5 px-4 rounded-lg border-2 border-gray-200 text-gray-600 font-medium 
                           hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center 
                           justify-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Clear all filters</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Results header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {currentProducts.length} Products Found
            </h2>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2">
            {currentProducts.map((product) => {
              const inCart = cartItems.some((item: { id: string }) => item.id === product._id)
              const isWishlisted = wishlist.includes(product._id)
              const displayPrice = product.isDeal && product.dealPrice ? product.dealPrice : product.price
              const originalPrice = product.isDeal && product.previousPrice ? product.previousPrice : null

              return (
                <Card 
                  key={product._id} 
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white rounded-xl hover:-translate-y-1 product-card compact-card cursor-pointer"
                  onClick={() => handleProductClick(product._id)}
                >
                  <div className="relative h-full flex flex-col">
                    {/* Product Image Container */}
                    <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl">
                      {product.images[0]?.url ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brana-green/10 to-brana-pink/10 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl mb-1">🧸</div>
                            <span className="text-gray-400 text-xs font-medium">No Image</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2">
                        {product.isDeal ? (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                            SALE
                          </span>
                        ) : (
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                            FEATURED
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-md border-0 rounded-full w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(product._id)
                        }}
                      >
                        <Heart 
                          className={cn(
                            "h-4 w-4 transition-colors",
                            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
                          )} 
                        />
                      </Button>

                      {/* Cart Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-12 right-2 bg-white/90 hover:bg-white shadow-md border-0 rounded-full w-8 h-8 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(product)
                        }}
                        disabled={inCart || product.stock === 0}
                      >
                        <ShoppingCart 
                          className={cn(
                            "h-4 w-4 transition-colors",
                            inCart ? "text-brana-green" : "text-gray-400 hover:text-brana-green"
                          )} 
                        />
                      </Button>
                    </div>

                    <CardContent className="p-4 flex-1 flex flex-col">
                      {/* Product Name */}
                      <h3 className="font-bold text-sm mb-2 line-clamp-1 text-gray-800 group-hover:text-brana-green transition-colors duration-300">
                        {product.name}
                      </h3>
                      
                      {/* Age Group */}
                      <div className="text-xs text-gray-500 mb-2 font-medium">
                        {product.category === "Toys" ? "Preschool" : 
                         product.category === "Books" ? "School Age" : 
                         product.category === "Clothing" ? "Toddlers" : "All Ages"}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                          ({Math.floor(Math.random() * 5) + 1})
                        </span>
                      </div>

                      {/* Price and Stock Section */}
                      <div className="space-y-1.5 mb-3">
                        {/* Price Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="min-w-0">
                            <div className="font-bold text-lg text-gray-800 truncate">
                              KSh {displayPrice.toLocaleString()}
                            </div>
                            {originalPrice && (
                              <div className="text-sm text-red-500 line-through font-medium">
                                KSh {originalPrice.toLocaleString()}
                              </div>
                            )}
                            {/* Stock Status - Always visible below price */}
                            <div className="flex items-center space-x-1.5 mt-1">
                              <div className={cn(
                                "w-2 h-2 rounded-full flex-shrink-0",
                                product.stock > 10 ? "bg-green-500" : 
                                product.stock > 0 ? "bg-yellow-500" : "bg-red-500"
                              )} />
                              <span className={cn(
                                "text-xs font-medium whitespace-nowrap",
                                product.stock > 10 ? "text-green-600" : 
                                product.stock > 0 ? "text-yellow-600" : "text-red-600"
                              )}>
                                {product.stock > 10 ? `In Stock (${product.stock})` : 
                                 product.stock > 0 ? `Low Stock (${product.stock} left)` : "Out of Stock"}
                              </span>
                            </div>
                          </div>
                          
                          <Button
                            size="sm"
                            className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap flex-shrink-0"
                            disabled={product.stock === 0}
                            onClick={(e) => {
                              e.stopPropagation()
                              addToCart({
                                id: product._id,
                                name: product.name,
                                price: product.dealPrice || product.price,
                                image: product.images?.[0]?.url || '',
                              })
                              router.push('/checkout')
                            }}
                          >
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* No results */}
          {currentProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                onClick={() => {
                  setSearch("")
                  setSelectedCategories([])
                  setPriceRange([0, 10000])
                }}
                className="bg-brana-green hover:bg-brana-green/90 text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

