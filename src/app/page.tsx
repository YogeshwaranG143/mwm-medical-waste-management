"use client"

import { motion } from "framer-motion"
import { Activity, Building2, Truck, Shield, AlertTriangle, Droplet } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen relative page-transition">
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Logo & Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Activity className="w-20 h-20 text-cyan-400 animate-pulse-glow" />
            </motion.div>
            <h1 className="text-5xl sm:text-7xl font-bold gradient-text mb-6">
              MWM
            </h1>
            <p className="text-2xl sm:text-3xl text-white mb-4">
              Medical Waste Management System
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Connecting hospitals with certified waste transport vendors for safe, efficient medical waste disposal
            </p>
          </motion.div>

          {/* Login Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Hospital Login Card */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card rounded-3xl p-8 group animate-float"
              style={{ animationDelay: "0s" }}
            >
              <Link href="/hospital/login" className="block">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="p-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 neon-cyan group-hover:neon-pink transition-all duration-300">
                    <Building2 className="w-16 h-16 text-cyan-400 group-hover:text-pink-400 transition-colors" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-3">Hospital Login</h2>
                    <p className="text-slate-400">
                      Book safe waste transport vehicles and manage your medical waste disposal
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold text-lg btn-ripple neon-cyan"
                  >
                    Access Hospital Portal
                  </motion.button>
                </div>
              </Link>
            </motion.div>

            {/* Vehicle Vendor Login Card */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card rounded-3xl p-8 group animate-float"
              style={{ animationDelay: "1s" }}
            >
              <Link href="/vendor/login" className="block">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="p-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 neon-purple group-hover:neon-pink transition-all duration-300">
                    <Truck className="w-16 h-16 text-purple-400 group-hover:text-pink-400 transition-colors" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-3">Vehicle Vendor Login</h2>
                    <p className="text-slate-400">
                      View allocated pickups, manage routes, and provide safe transport services
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 px-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold text-lg btn-ripple neon-purple"
                  >
                    Access Vendor Portal
                  </motion.button>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <div className="glass-card rounded-2xl p-6 text-center">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Safe & Secure</h3>
              <p className="text-slate-400 text-sm">Certified vendors for medical waste transport</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Tracking</h3>
              <p className="text-slate-400 text-sm">Monitor waste collection and disposal status</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <Droplet className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Eco-Friendly</h3>
              <p className="text-slate-400 text-sm">Sustainable waste management practices</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}