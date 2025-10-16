"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart as LucideShoppingCart, Percent, Package, HelpCircle, Search } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { MobileNav } from "@/components/mobile-nav"
import { Footer } from "@/components/footer"
import { cn, formatCurrency } from "@/lib/utils"
import { ShoppingCart } from "@/components/shopping-cart"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"

export default function DealsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart, items: cartItems } = useCart()
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(handler)
  }, [search])

  useEffect(() => {
    if (search.length > 0) {
      setLoadingProducts(true)
      fetch("/api/products")
        .then(res => res.json())
        .then(data => setAllProducts(Array.isArray(data) ? data : []))
        .finally(() => setLoadingProducts(false))
    } else {
      setAllProducts([])
    }
  }, [search])

  const searchResults = debouncedSearch && Array.isArray(allProducts)
    ? allProducts.filter(
        (product) =>
          product?.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          product?.description?.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : []

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true)
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(Array.isArray(data) ? data.filter((p: any) => p.isDeal) : [])
      setLoading(false)
    }
    fetchDeals()
  }, [])

  // Filter products by search
  const filteredProducts = debouncedSearch
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          product.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : products

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Deals</h1>
      
      {loading ? (
        <p>Loading deals...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-muted-foreground">No deals available right now.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map(product => (
            <Card key={product._id} className="group overflow-hidden rounded-lg border-0 bg-card/50 transition-all hover:shadow-lg dark:bg-card/30 dark:hover:bg-card/40">
              <Link href={`/product/${product._id}`} className="relative block overflow-hidden pt-[100%]">
                <Image
                  src={product.images?.[0]?.url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">{product.category}</div>
                <Link href={`/product/${product._id}`} className="mt-1 block">
                  <h3 className="line-clamp-1 text-lg font-medium">{product.name}</h3>
                </Link>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {formatCurrency(product.dealPrice || product.price)}
                  </div>
                  <span className="ml-2 text-sm line-through text-muted-foreground">
                    {formatCurrency(product.previousPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground">
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault()
                      addToCart(product._id, 1)
                      toast({
                        title: "Added to cart",
                        description: `${product.name} has been added to your cart`,
                      })
                    }}
                    disabled={product.stock === 0}
                  >
                    <LucideShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}