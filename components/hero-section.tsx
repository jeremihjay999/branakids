"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-pink-50 via-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
              Let Your <span className="text-pink-500">Kid Smile</span>
              <br />
              Every Day!
            </h1>
            <p className="mt-1 text-base text-gray-600 max-w-lg mx-auto md:mx-0">
              Discover amazing toys, clothes, and accessories that bring joy and
              happiness to your little ones.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2 bg-pink-500 text-white font-semibold rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300"
            >
              Shop Now
            </motion.button>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative mt-8 md:mt-0"
          >
            <Image
              src="/assets/hero-kid.png"
              alt="Happy kid playing with toys"
              width={400}
              height={400}
              className="mx-auto"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
