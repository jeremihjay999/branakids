"use client"

import { HelpCircle, Package, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ReturnsPage() {
  return (
    <main className="container py-12 md:py-16 px-4 md:px-6 min-h-[60vh] flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto bg-card/80 rounded-2xl shadow-2xl p-8 border border-primary/20">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Returns & Exchanges</h1>
          </div>
          <p className="text-muted-foreground">Our hassle-free return policy ensures your complete satisfaction.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Return Policy</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>We want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help.</p>
              
              <h3 className="font-medium text-foreground">Returns</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Items must be returned within 7 days of delivery</li>
                <li>Products must be unused, in original packaging, and in the same condition as received</li>
                <li>Original receipt or proof of purchase is required</li>
              </ul>

              <h3 className="font-medium text-foreground">Exchanges</h3>
              <p>To exchange an item, please return the original item and place a new order for the desired product.</p>

              <h3 className="font-medium text-foreground">Refunds</h3>
              <p>Once we receive your return, we will process your refund within 3-5 business days. Refunds will be issued to the original payment method.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">How to Return</h2>
            <div className="space-y-3 text-muted-foreground">
              <ol className="list-decimal pl-5 space-y-2">
                <li>Contact our support team to initiate a return</li>
                <li>Package your item securely in the original packaging</li>
                <li>Include the original receipt or proof of purchase</li>
                <li>Ship the package to our return address (provided by support)</li>
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Need Help?</h2>
            <p className="text-muted-foreground">If you have any questions about our return policy, please don't hesitate to contact us.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/contact" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Support
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="tel:+254758212888" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +254 758 212888
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
