"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Truck, Building2, MapPin, Weight, Clock, Badge, Calendar, Phone, User, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import FloatingHomeButton from "@/components/FloatingHomeButton"
import Footer from "@/components/Footer"

interface Booking {
  id: string
  hospitalName: string
  userName: string
  contactNumber: string
  location: string
  wasteType: string
  weight: string
  bookedAt: string
  status: string
}

export default function VendorDashboard() {
  const router = useRouter()
  const [vendorData, setVendorData] = useState<any>(null)
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    // Get vendor data from localStorage
    const data = localStorage.getItem("vendorData")
    if (!data) {
      router.push("/vendor/login")
      return
    }
    setVendorData(JSON.parse(data))

    // Get bookings from localStorage
    const bookingsData = localStorage.getItem("bookings")
    if (bookingsData) {
      setBookings(JSON.parse(bookingsData))
    }
  }, [router])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "in progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50"
    }
  }

  if (!vendorData) {
    return null
  }

  return (
    <div className="min-h-screen relative page-transition">
      <FloatingHomeButton />
      
      <section className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 neon-purple mb-6">
              <Truck className="w-16 h-16 text-purple-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Vendor Dashboard
            </h1>
            <p className="text-slate-400 text-lg mb-6">
              Welcome, <span className="text-purple-400 font-semibold">{vendorData.vendorName}</span>
            </p>
            
            {/* Vendor Info Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 max-w-3xl mx-auto mb-12"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-white font-semibold">{vendorData.place}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Vehicle</p>
                    <p className="text-white font-semibold uppercase">{vendorData.vehicleNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Contact</p>
                    <p className="text-white font-semibold">{vendorData.contactNumber}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bookings Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                Allocated Pickups
              </h2>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-slate-400 text-sm">Total Jobs: </span>
                <span className="text-white font-bold text-lg">{bookings.length}</span>
              </div>
            </div>

            {bookings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-3xl p-12 text-center"
              >
                <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No Bookings Yet</h3>
                <p className="text-slate-400">
                  Allocated hospital pickups will appear here once bookings are made
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {bookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card rounded-2xl p-6 hover:border-purple-400/50"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                          <Building2 className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {booking.hospitalName}
                          </h3>
                          <p className="text-slate-400 text-sm">Booking ID: #{booking.id.slice(-6)}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full border ${getStatusColor(booking.status)} text-xs font-semibold`}>
                        {booking.status}
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-400 text-sm">Contact Person:</span>
                        <span className="text-white font-semibold text-sm">{booking.userName}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-green-400" />
                        <span className="text-slate-400 text-sm">Phone:</span>
                        <span className="text-white font-semibold text-sm">{booking.contactNumber}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-pink-400" />
                        <span className="text-slate-400 text-sm">Location:</span>
                        <span className="text-white font-semibold text-sm">{booking.location}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge className="w-4 h-4 text-orange-400" />
                        <span className="text-slate-400 text-sm">Waste Type:</span>
                        <span className="text-white font-semibold text-sm">{booking.wasteType}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Weight className="w-4 h-4 text-yellow-400" />
                        <span className="text-slate-400 text-sm">Weight:</span>
                        <span className="text-white font-semibold text-sm">{booking.weight} kg</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span className="text-slate-400 text-sm">Booked At:</span>
                        <span className="text-white font-semibold text-sm">{booking.bookedAt}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold btn-ripple neon-purple"
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
