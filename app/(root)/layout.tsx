import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { ShoppingCart } from "@/components/shopping-cart"
import { Footer } from "@/components/footer"
import { Sparkles } from "lucide-react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground dark:bg-[#10111a] dark:text-white transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-[#10111a]/95">
        <div className="container flex h-16 items-center justify-between relative">
          <MainNav />
          <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/Logo1.png" 
                alt="Brana Kids Logo" 
                className="h-10 w-auto object-contain"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold">
                <span className="text-[#FF6B6B]">B</span>
                <span className="text-[#4ECDC4]">r</span>
                <span className="text-[#45B7D1]">a</span>
                <span className="text-[#96CEB4]">n</span>
                <span className="text-[#FFEEAD]">a</span>
                <span className="text-[#FF6B6B]">K</span>
                <span className="text-[#4ECDC4]">i</span>
                <span className="text-[#45B7D1]">D</span>
                <span className="text-[#96CEB4]">S</span>
                <span className="text-[#FF6B6B]">!</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-end space-x-2 md:space-x-4">
            <ThemeToggle />
            <ShoppingCart />
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
