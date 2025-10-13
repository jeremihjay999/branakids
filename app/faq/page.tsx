"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, ChevronDown, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Browse our products, add your desired items to the cart, and proceed to checkout. You can pay via M-Pesa, credit/debit card, or bank transfer.",
  },
  {
    question: "Do you deliver outside Nairobi?",
    answer: "Yes! We deliver across Kenya. Delivery within Nairobi is same-day for orders before 2pm. Upcountry deliveries take 1-3 business days.",
  },
  {
    question: "Can I pay with M-Pesa?",
    answer: "Absolutely! We accept M-Pesa payments. You'll see the paybill details at checkout.",
  },
  {
    question: "What is your return policy?",
    answer: "You can return any product within 7 days of delivery if it's unused and in original packaging. Contact our support for assistance.",
  },
  {
    question: "How do I contact support?",
    answer: "You can reach us via email at support@branakids.co.ke or call us at +254 758 212888. Our support team is available Monday to Friday, 9am to 5pm EAT.",
  },
]

export default function FAQPage() {
  return (
    <main className="container py-12 md:py-16 px-4 md:px-6 min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto bg-card/80 rounded-2xl shadow-2xl p-8 border border-primary/20">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Frequently Asked Questions</h1>
          </div>
          <p className="text-muted-foreground">Can't find what you're looking for? Contact our support team.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Link href="mailto:support@branakids.co.ke" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              support@branakids.co.ke
            </Link>
            <Link href="tel:+254758212888" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              +254 758 212888
            </Link>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={faq.question} className="border border-primary/10 rounded-lg bg-muted/40">
              <AccordionTrigger className="flex items-center gap-2 text-lg font-semibold px-4 py-3">
                <ChevronDown className="w-5 h-5 text-primary" />
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  )
}