"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mountain, ArrowLeft, Calendar, Trash2 } from "lucide-react"
import Link from "next/link"
import Aurora from "@/components/Aurora"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Tenda Dome 4 Orang", price: 75000, quantity: 1, image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Sleeping Bag", price: 25000, quantity: 2, image: "/placeholder.svg?height=100&width=100" },
  ])

  const [bookingData, setBookingData] = useState({
    pickupDate: "",
    returnDate: "",
    pickupTime: "",
    returnTime: "",
    notes: "",
  })

  const router = useRouter()

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateDays = () => {
    if (!bookingData.pickupDate || !bookingData.returnDate) return 2 // minimum 2 hari 1 malam
    const pickup = new Date(bookingData.pickupDate)
    const returnDate = new Date(bookingData.returnDate)
    const diffTime = Math.abs(returnDate.getTime() - pickup.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // Sistem rental gunung: 1 hari = 2 hari 1 malam
    // Jadi kalikan dengan 2 untuk mendapatkan hari malam
    const rentalDays = diffDays * 2
    return rentalDays || 2 // minimum 2 hari 1 malam
  }

  const calculateNights = () => {
    return Math.floor(calculateDays() / 2)
  }

  const handleBooking = () => {
    if (!bookingData.pickupDate || !bookingData.returnDate) {
      alert("Mohon lengkapi tanggal pengambilan dan pengembalian")
      return
    }

    const booking = {
      id: Date.now(),
      items: cartItems,
      ...bookingData,
      totalDays: calculateDays(),
      totalNights: calculateNights(),
      totalAmount: calculateTotal() * calculateDays(),
      status: "Menunggu Persetujuan",
      paymentStatus: "Belum Bayar",
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage (in real app, this would be sent to backend)
    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, booking]))

    alert("Booking berhasil dibuat! Menunggu persetujuan admin.")
    router.push("/dashboard/history")
  }

  return (
    <div className="min-h-screen relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#1e3a8a", "#3b82f6", "#8b5cf6"]} blend={0.3} amplitude={0.8} speed={0.3} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 backdrop-blur-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Mountain className="h-6 w-6 text-white" />
              <span className="text-lg font-bold text-white">Keranjang Sewa</span>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Cart Items */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4 text-white">Item yang Disewa</h2>
              {cartItems.length === 0 ? (
                <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <p className="text-white/70">Keranjang kosong</p>
                    <Link href="/dashboard">
                      <Button className="mt-4 bg-white text-black hover:bg-gray-200">Mulai Belanja</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                cartItems.map((item) => (
                  <Card key={item.id} className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{item.name}</h3>
                          <p className="text-white">Rp {item.price.toLocaleString()}/hari</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="border-white/20 text-white hover:bg-white/20 bg-transparent backdrop-blur-sm"
                          >
                            -
                          </Button>
                          <span className="w-8 text-center text-white">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="border-white/20 text-white hover:bg-white/20 bg-transparent backdrop-blur-sm"
                          >
                            +
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Booking Form */}
            <div className="space-y-6">
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Detail Penyewaan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickupDate" className="text-white">
                        Tanggal Ambil
                      </Label>
                      <Input
                        id="pickupDate"
                        type="date"
                        value={bookingData.pickupDate}
                        onChange={(e) => setBookingData({ ...bookingData, pickupDate: e.target.value })}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="returnDate" className="text-white">
                        Tanggal Kembali
                      </Label>
                      <Input
                        id="returnDate"
                        type="date"
                        value={bookingData.returnDate}
                        onChange={(e) => setBookingData({ ...bookingData, returnDate: e.target.value })}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickupTime" className="text-white">
                        Jam Ambil
                      </Label>
                      <Input
                        id="pickupTime"
                        type="time"
                        value={bookingData.pickupTime}
                        onChange={(e) => setBookingData({ ...bookingData, pickupTime: e.target.value })}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="returnTime" className="text-white">
                        Jam Kembali
                      </Label>
                      <Input
                        id="returnTime"
                        type="time"
                        value={bookingData.returnTime}
                        onChange={(e) => setBookingData({ ...bookingData, returnTime: e.target.value })}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-white">
                      Catatan (Opsional)
                    </Label>
                    <Input
                      id="notes"
                      placeholder="Catatan tambahan..."
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  {/* Info Sistem Rental */}
                  <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
                    <h4 className="text-white font-semibold mb-2">ℹ️ Sistem Rental Gunung</h4>
                    <div className="text-sm text-white/70 space-y-1">
                      <p>• 1 hari rental = 2 hari 1 malam</p>
                      <p>• 1.5 hari rental = 3 hari 2 malam</p>
                      <p>• 2 hari rental = 4 hari 3 malam</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">Ringkasan Biaya</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal per hari:</span>
                    <span>Rp {calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Durasi sewa:</span>
                    <span>
                      {calculateDays()} hari {calculateNights()} malam
                    </span>
                  </div>
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total:</span>
                      <span>Rp {(calculateTotal() * calculateDays()).toLocaleString()}</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleBooking}
                    disabled={cartItems.length === 0}
                    className="w-full bg-white text-black hover:bg-gray-200 disabled:bg-gray-600"
                  >
                    Buat Booking
                  </Button>
                  <p className="text-xs text-white/60 text-center">
                    Pembayaran dilakukan secara manual setelah booking disetujui
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
