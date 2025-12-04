"use client"

import { Home } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function FloatingHomeButton() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="glass-card neon-cyan p-4 rounded-full btn-ripple group"
        >
          <Home className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
        </motion.button>
      </Link>
    </motion.div>
  )
}