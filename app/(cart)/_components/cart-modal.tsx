"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ShoppingCart } from "@/components/shopping-cart"

export function CartModal() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Dialog open onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="sm:max-w-[425px] h-[80vh] max-h-[800px] overflow-hidden p-0">
        <div className="h-full">
          <ShoppingCart isModal />
        </div>
      </DialogContent>
    </Dialog>
  )
}
