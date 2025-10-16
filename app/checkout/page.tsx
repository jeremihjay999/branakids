"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Send, Plus, Minus, X } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { getWhatsAppUrl, generateOrderMessage } from "@/lib/whatsapp"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, total, clearCart, updateQuantity, removeFromCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const message = generateOrderMessage(
        items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total,
        formData.name || undefined,
        formData.phone || undefined
      )

      const whatsappUrl = getWhatsAppUrl(message)
      window.open(whatsappUrl, '_blank')
      clearCart()
      
      toast({
        title: "Order Submitted",
        description: "Your order has been sent to our support team. We'll contact you shortly!",
      })
      
      router.push('/')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  if (items.length === 0) {
    return (
      <main className="container py-12 md:py-16 px-4 md:px-6 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some products to your cart before checking out.</p>
          <Button onClick={() => router.push('/')}>Browse Products</Button>
        </div>
      </main>
    )
  }

  return (
    <main className="container py-12 md:py-16 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-lg font-semibold text-primary mt-1">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-muted transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-muted transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(item.price)} each
                      </span>
                    </div>
                  </div>
                ))}
                <Separator className="my-4" />
                <div className="flex items-center justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-muted/50"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-muted/50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-muted/50"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">Delivery Address</label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="bg-muted/50"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="bg-muted/50"
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-1">Order Notes (Optional)</label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="bg-muted/50"
                  placeholder="Special delivery instructions, gift message, etc."
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gap-2"
              size="lg"
              disabled={loading}
            >
              <Send className="h-4 w-4" />
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
