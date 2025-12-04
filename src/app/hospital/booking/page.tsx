"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Biohazard, Syringe, Beaker, Pill, Microscope, Bug, Weight, CheckCircle, Truck } from "lucide-react"
import { useRouter } from "next/navigation"
import FloatingHomeButton from "@/components/FloatingHomeButton"
import Footer from "@/components/Footer"

const wasteCategories = [
  { 
    id: "biohazard", 
    name: "Biohazard Waste", 
    icon: Biohazard, 
    color: "from-red-500 to-orange-500",
    description: "Infectious materials & contaminated items"
  },
  { 
    id: "sharps", 
    name: "Sharps Waste", 
    icon: Syringe, 
    color: "from-yellow-500 to-orange-500",
    description: "Needles, syringes & sharp objects"
  },
  { 
    id: "chemical", 
    name: "Chemical Waste", 
    icon: Beaker, 
    color: "from-purple-500 to-pink-500",
    description: "Laboratory chemicals & reagents"
  },
  { 
    id: "pharma", 
    name: "Pharma Waste", 
    icon: Pill, 
    color: "from-blue-500 to-cyan-500",
    description: "Expired medications & pharmaceuticals"
  },
  { 
    id: "pathology", 
    name: "Pathology Waste", 
    icon: Microscope, 
    color: "from-green-500 to-teal-500",
    description: "Tissue samples & body fluids"
  },
  { 
    id: "infectious", 
    name: "Infectious Waste", 
    icon: Bug, 
    color: "from-pink-500 to-red-500",
    description: "Highly contagious materials"
  }
]

export default function HospitalBooking() {
  const router = useRouter()
  const [hospitalData, setHospitalData] = useState<any>(null)
  const [selectedWaste, setSelectedWaste] = useState<string>("")
  const [weight, setWeight] = useState<string>("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Get hospital data from localStorage
    const data = localStorage.getItem("hospitalData")
    if (!data) {
      router.push("/hospital/login")
      return
    }
    setHospitalData(JSON.parse(data))
  }, [router])

  const validateBooking = () => {
    const newErrors: Record<string, string> = {}

    if (!selectedWaste) {
      newErrors.wasteType = "Please select a waste category"
    }
    if (!weight) {
      newErrors.weight = "Weight is required"
    } else if (isNaN(Number(weight)) || Number(weight) <= 0) {
      newErrors.weight = "Please enter a valid weight"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBookVehicle = () => {
    if (!validateBooking()) return

    // Create booking object
    const booking = {
      id: Date.now().toString(),
      hospitalName: hospitalData.hospitalName,
      userName: hospitalData.userName,
      contactNumber: hospitalData.contactNumber,
      location: hospitalData.location,
      wasteType: wasteCategories.find(w => w.id === selectedWaste)?.name,
      weight: weight,
      bookedAt: new Date().toLocaleString(),
      status: "Pending"
    }

    // Get existing bookings or initialize empty array
    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    
    // Add new booking
    existingBookings.push(booking)
    
    // Save to localStorage
    localStorage.setItem("bookings", JSON.stringify(existingBookings))

    // Show success animation
    setShowSuccess(true)

    // Redirect after animation
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  if (!hospitalData) {
    return null
  }

  return (
    <div className="min-h-screen relative page-transition">
      <FloatingHomeButton />
      
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="glass-card rounded-3xl p-12 text-center max-w-md mx-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6 animate-pulse-glow" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4">Booking Successful!</h2>
              <p className="text-slate-400 text-lg mb-2">Vehicle has been allocated</p>
              <p className="text-cyan-400 font-semibold">Redirecting to home...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 neon-cyan mb-6">
              <Truck className="w-16 h-16 text-cyan-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Book Waste Transport
            </h1>
            <p className="text-slate-400 text-lg">
              Welcome, <span className="text-cyan-400 font-semibold">{hospitalData.userName}</span> from <span className="text-cyan-400 font-semibold">{hospitalData.hospitalName}</span>
            </p>
          </motion.div>

          {/* Waste Category Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Select Waste Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wasteCategories.map((category, index) => {
                const Icon = category.icon
                const isSelected = selectedWaste === category.id
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedWaste(category.id)
                      setErrors(prev => ({ ...prev, wasteType: "" }))
                    }}
                    className={`glass-card rounded-2xl p-6 cursor-pointer transition-all ${
                      isSelected ? "ring-2 ring-cyan-400 neon-cyan" : ""
                    }`}
                  >
                    <div className={`p-4 rounded-full bg-gradient-to-br ${category.color} w-fit mx-auto mb-4`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 text-center">
                      {category.name}
                    </h3>
                    <p className="text-slate-400 text-sm text-center">
                      {category.description}
                    </p>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-4 flex justify-center"
                      >
                        <CheckCircle className="w-6 h-6 text-cyan-400" />
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>
            {errors.wasteType && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-center mt-4"
              >
                {errors.wasteType}
              </motion.p>
            )}
          </motion.div>

          {/* Weight Input */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Enter Dustbin Weight
              </h2>
              <div className="relative">
                <Weight className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-cyan-400" />
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value)
                    setErrors(prev => ({ ...prev, weight: "" }))
                  }}
                  className="w-full pl-14 pr-20 py-5 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-lg placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="Enter weight"
                  min="0"
                  step="0.1"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-semibold text-lg">
                  kg
                </span>
              </div>
              {errors.weight && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center mt-3"
                >
                  {errors.weight}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Book Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-md mx-auto"
          >
            <motion.button
              onClick={handleBookVehicle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-5 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold text-xl btn-ripple neon-cyan flex items-center justify-center gap-3"
            >
              <Truck className="w-6 h-6" />
              Book Vehicle Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}