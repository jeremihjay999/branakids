import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/components/cart-context"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { ShoppingCart } from "@/components/shopping-cart"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BRANA KIDS | Children's Store - Let Your Kid Smile",
  description: "Discover the best children's products at BRANA KIDS. From toys to clothing, we bring joy and smiles to your little ones. Quality products for happy kids.",
  keywords: "children store, kids toys, baby products, children clothing, kids accessories, BRANA KIDS, children Kenya",
  generator: 'v0.dev',
  metadataBase: new URL('https://branakids.co.ke'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://branakids.co.ke/',
    title: "BRANA KIDS | Children's Store - Let Your Kid Smile",
    description: "Discover the best children's products at BRANA KIDS. From toys to clothing, we bring joy and smiles to your little ones.",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'BRANA KIDS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "BRANA KIDS | Children's Store - Let Your Kid Smile",
    description: "Discover the best children's products at BRANA KIDS. From toys to clothing, we bring joy and smiles to your little ones.",
    images: ['/logo.png'],
  },
  verification: {
    google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
  },
  other: {
    'theme-color': '#22C55E',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const whatsappPhone = process.env.WHATSAPP_PHONE || "+254758212888";
  
  const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BRANA KIDS",
      "url": "https://branakids.com",
      "logo": "https://branakids.com/logo1.png",
      "description": "Children's store bringing joy and smiles to your little ones",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": whatsappPhone,
        "contactType": "customer service",
        "areaServed": "KE",
        "availableLanguage": ["en"]
      },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="flex min-h-screen flex-col pb-16 md:pb-0">
              {/* Desktop Header */}
              <header className="sticky top-0 z-40 hidden w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
                <div className="container flex h-16 items-center justify-between">
                  <MainNav />
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <ShoppingCart />
                  </div>
                </div>
              </header>

              {/* Mobile Header */}
              <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
                <Link href="/" className="flex items-center">
                  <img 
                    src="/Logo1.png" 
                    alt="BRANA KIDS" 
                    className="h-8 w-auto"
                  />
                </Link>
                <div className="flex items-center gap-4">
                  <MobileNav />
                </div>
              </header>

              <main className="flex-1 pb-4 md:pb-0">
                <div className="container">
                  {children}
                </div>
              </main>

              {/* Mobile Bottom Navigation */}
              <MobileBottomNav />
              
              <Toaster />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
