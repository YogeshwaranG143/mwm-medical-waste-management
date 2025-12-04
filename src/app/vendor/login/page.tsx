"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Truck, User, MapPin, Phone, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import FloatingHomeButton from "@/components/FloatingHomeButton"
import Footer from "@/components/Footer"

export default function VendorLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    vendorName: "",
    place: "",
    vehicleNumber: "",
    contactNumber: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.vendorName.trim()) {
      newErrors.vendorName = "Vendor name is required"
    }
    if (!formData.place.trim()) {
      newErrors.place = "Place is required"
    }
    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = "Vehicle number is required"
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required"
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ""))) {
      newErrors.contactNumber = "Enter a valid 10-digit phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Store vendor data in localStorage
      localStorage.setItem("vendorData", JSON.stringify(formData))
      
      // Navigate to dashboard
      router.push("/vendor/dashboard")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-screen relative page-transition">
      <FloatingHomeButton />
      
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-block p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 neon-purple mb-6">
              <Truck className="w-16 h-16 text-purple-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Vehicle Vendor Login
            </h1>
            <p className="text-slate-400 text-lg">
              Enter your details to access allocated pickups
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 sm:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Vendor Name */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Vendor Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                    placeholder="Enter vendor name"
                  />
                </div>
                {errors.vendorName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {errors.vendorName}
                  </motion.p>
                )}
              </div>

              {/* Place */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Place *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                    placeholder="Enter your place"
                  />
                </div>
                {errors.place && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {errors.place}
                  </motion.p>
                )}
              </div>

              {/* Vehicle Number */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Vehicle Number *
                </label>
                <div className="relative">
                  <Truck className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all uppercase"
                    placeholder="e.g., MH12AB1234"
                  />
                </div>
                {errors.vehicleNumber && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {errors.vehicleNumber}
                  </motion.p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Contact Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                    placeholder="Enter 10-digit phone number"
                  />
                </div>
                {errors.contactNumber && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {errors.contactNumber}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold text-lg btn-ripple neon-purple flex items-center justify-center gap-3 mt-8"
              >
                Submit & View Jobs
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
