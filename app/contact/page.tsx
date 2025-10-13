"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="container py-12 md:py-16 px-4 md:px-6 min-h-[60vh] flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-10 bg-card/80 rounded-2xl shadow-2xl p-8 border border-primary/20">
          {/* Contact Info */}
          <div className="flex flex-col gap-8 justify-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">Contact Us</h1>
            <p className="text-muted-foreground mb-4">We'd love to hear from you! Reach out with any questions, feedback, or partnership inquiries.</p>
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-foreground">Email</h3>
                <a href="mailto:support@branakids.co.ke" className="text-muted-foreground hover:text-primary transition-colors">
                  support@branakids.co.ke
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-foreground">Phone</h3>
                <a href="tel:+254758212888" className="text-muted-foreground hover:text-primary transition-colors block">
                  +254 758 212888
                </a>
                <a href="tel:+254111976085" className="text-muted-foreground hover:text-primary transition-colors block">
                  +254 111 976085
                </a>
                <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9am-5pm EAT</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-foreground">Location</h3>
                <p className="text-muted-foreground">
                  Nairobi, Kenya
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="space-y-6">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <Input id="name" placeholder="Your Name" required className="bg-muted/50" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input id="email" type="email" placeholder="you@email.com" required className="bg-muted/50" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <Textarea id="message" placeholder="How can we help you?" rows={5} required className="bg-muted/50" />
              </div>
              <Button 
                type="submit" 
                className="w-full gap-2 text-lg px-8 py-4 shadow-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold border-2 border-primary/60 hover:from-accent hover:to-primary hover:scale-105 transition-all duration-200"
              >
                <Send className="h-5 w-5" /> Send Message
              </Button>
            </form>
            
            <div className="pt-4 border-t border-border/40">
              <p className="text-sm text-muted-foreground text-center">
                We typically respond within 24 hours on business days.
              </p>
            </div>
          </div>
        </div>
      </main>
  )
}