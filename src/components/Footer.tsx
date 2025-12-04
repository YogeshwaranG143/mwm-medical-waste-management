"use client"

import { Activity, Shield, Truck } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-slate-900/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold gradient-text">MWM</span>
            </div>
            <p className="text-slate-400 text-sm">
              Medical Waste Management System - Connecting hospitals with safe transport solutions
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                Home
              </Link>
              <Link href="/hospital/login" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                Hospital Portal
              </Link>
              <Link href="/vendor/login" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                Vendor Portal
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Safe Waste Transport</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Truck className="w-4 h-4 text-purple-400" />
                <span>Real-time Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Activity className="w-4 h-4 text-pink-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
          <p>&copy; 2024 MWM - Medical Waste Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}