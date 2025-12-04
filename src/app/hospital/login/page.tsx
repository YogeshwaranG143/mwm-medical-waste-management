"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building2, User, Phone, MapPin, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import FloatingHomeButton from "@/components/FloatingHomeButton"
import Footer from "@/components/Footer"

export default function HospitalLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    hospitalName: "",
    userName: "",
    contactNumber: "",
    location: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.hospitalName.trim()) {
      newErrors.hospitalName = "Hospital name is required"
    }
    if (!formData.userName.trim()) {
      newErrors.userName = "User name is required"
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required"
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ""))) {
      newErrors.contactNumber = "Enter a valid 10-digit phone number"
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Store hospital data in localStorage
      localStorage.setItem("hospitalData", JSON.stringify(formData))
      
      // Navigate to booking page
      router.push("/hospital/booking")
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
            <div className="inline-block p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 neon-cyan mb-6">
              <Building2 className="w-16 h-16 text-cyan-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Hospital Login
            </h1>
            <p className="text-slate-400 text-lg">
              Enter your details to access the booking system
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
              {/* Hospital Name */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Hospital Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    placeholder="Enter hospital name"
                  />
                </div>
                {errors.hospitalName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {errors.hospitalName}
                  </motion.p>
                )}
              </div>

              {/* User Name */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Name of the User *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                {errors.userName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {errors.userName}
                  </motion.p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Contact Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
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

              {/* Hospital Location */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Hospital Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    placeholder="Enter hospital location"
                  />
                </div>
                {errors.location && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {errors.location}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold text-lg btn-ripple neon-cyan flex items-center justify-center gap-3 mt-8"
              >
                Submit & Proceed to Booking
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
