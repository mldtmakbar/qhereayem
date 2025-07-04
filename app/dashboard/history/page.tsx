"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Mountain,
  ArrowLeft,
  Search,
  Calendar,
  Clock,
  Package,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
} from "lucide-react"
import Link from "next/link"
import Aurora from "@/components/Aurora"
import GooeyNav from "@/components/GooeyNav"

const bookingHistory = [
  {
    id: "BK001",
    date: "2024-01-15",
    items: [
      { name: "Tenda Dome 4 Orang", quantity: 1, price: 75000 },
      { name: "Sleeping Bag", quantity: 4, price: 25000 },
    ],
    total: 175000,
    status: "Selesai",
    pickupDate: "2024-01-16",
    returnDate: "2024-01-18",
    type: "rental",
  },
  {
    id: "BK002",
    date: "2024-01-20",
    items: [{ name: "Paket Pendaki Pemula", quantity: 1, price: 150000 }],
    total: 150000,
    status: "Disetujui",
    pickupDate: "2024-01-22",
    returnDate: "2024-01-24",
    type: "package",
  },
  {
    id: "BK003",
    date: "2024-01-25",
    items: [
      { name: "Carrier 60L", quantity: 2, price: 50000 },
      { name: "Headlamp LED", quantity: 2, price: 15000 },
    ],
    total: 130000,
    status: "Menunggu",
    pickupDate: "2024-01-27",
    returnDate: "2024-01-29",
    type: "rental",
  },
  {
    id: "BK004",
    date: "2024-01-10",
    items: [{ name: "Trekking Pole", quantity: 2, price: 35000 }],
    total: 70000,
    status: "Ditolak",
    pickupDate: "2024-01-12",
    returnDate: "2024-01-14",
    type: "rental",
  },
]

const navItems = [
  { label: "Gear", href: "/dashboard" },
  { label: "Paket", href: "/dashboard/packages" },
  { label: "AI Chat", href: "/dashboard/chat" },
  { label: "Riwayat", href: "/dashboard/history" },
  { label: "Profil", href: "/dashboard/profile" },
]

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("Semua")
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (!userRole) {
      router.push("/login")
    }
  }, [router])

  const statuses = ["Semua", "Menunggu", "Disetujui", "Ditolak", "Selesai"]

  const filteredHistory = bookingHistory.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = selectedStatus === "Semua" || booking.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Menunggu":
        return "bg-yellow-600"
      case "Disetujui":
        return "bg-green-600"
      case "Ditolak":
        return "bg-red-600"
      case "Selesai":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Menunggu":
        return <Clock className="h-4 w-4" />
      case "Disetujui":
        return <CheckCircle className="h-4 w-4" />
      case "Ditolak":
        return <XCircle className="h-4 w-4" />
      case "Selesai":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
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
              <span className="text-lg font-bold text-white">®QHERE AYEM OUTDOOR</span>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <div className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <GooeyNav
                items={navItems}
                particleCount={12}
                particleDistances={[60, 8]}
                particleR={80}
                initialActiveIndex={3}
                animationTime={500}
                timeVariance={200}
                colors={[1, 2, 3, 4]}
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Pipeline Information */}
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="h-5 w-5" />
                Informasi Status Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-yellow-600/20 rounded-lg border border-yellow-600/30">
                  <Clock className="h-6 w-6 text-yellow-400" />
                  <div>
                    <p className="font-semibold text-yellow-300">Menunggu</p>
                    <p className="text-xs text-yellow-200">Booking sedang diproses admin</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-600/20 rounded-lg border border-green-600/30">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <div>
                    <p className="font-semibold text-green-300">Disetujui</p>
                    <p className="text-xs text-green-200">Siap diambil sesuai jadwal</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-600/20 rounded-lg border border-red-600/30">
                  <XCircle className="h-6 w-6 text-red-400" />
                  <div>
                    <p className="font-semibold text-red-300">Ditolak</p>
                    <p className="text-xs text-red-200">Booking tidak dapat diproses</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-600/20 rounded-lg border border-blue-600/30">
                  <CheckCircle className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="font-semibold text-blue-300">Selesai</p>
                    <p className="text-xs text-blue-200">Peralatan sudah dikembalikan</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 backdrop-blur-sm bg-white/5 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Petunjuk Penggunaan:</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Cek status booking secara berkala</li>
                  <li>• Jika status "Disetujui", datang ke toko sesuai jadwal yang telah ditentukan</li>
                  <li>• Toleransi keterlambatan maksimal 30 menit</li>
                  <li>• Pengembalian maksimal pukul 21:00 di hari yang ditentukan</li>
                  <li>• Hubungi admin jika ada pertanyaan atau kendala</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-white">Riwayat Booking</h1>
            <p className="text-white/70 text-lg">Lihat semua riwayat booking dan status terkini</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                <Input
                  placeholder="Cari berdasarkan ID booking atau nama item..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white"
              >
                {statuses.map((status) => (
                  <option key={status} value={status} className="bg-gray-800">
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* History Cards */}
          <div className="space-y-6">
            {filteredHistory.map((booking) => (
              <Card
                key={booking.id}
                className="backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        {booking.type === "package" ? <Package className="h-5 w-5" /> : <User className="h-5 w-5" />}
                        Booking #{booking.id}
                      </CardTitle>
                      <p className="text-white/70 text-sm">
                        Tanggal Booking: {new Date(booking.date).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(booking.status)} text-white flex items-center gap-1`}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div>
                    <h4 className="font-semibold text-white mb-2">Item yang Disewa:</h4>
                    <div className="space-y-2">
                      {booking.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded">
                          <div>
                            <p className="text-white font-medium">{item.name}</p>
                            <p className="text-white/70 text-sm">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-white font-bold">Rp {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-white/70" />
                      <div>
                        <p className="text-white/70 text-sm">Tanggal Ambil</p>
                        <p className="text-white">{new Date(booking.pickupDate).toLocaleDateString("id-ID")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-white/70" />
                      <div>
                        <p className="text-white/70 text-sm">Tanggal Kembali</p>
                        <p className="text-white">{new Date(booking.returnDate).toLocaleDateString("id-ID")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <p className="text-white/70">Total Pembayaran</p>
                    <p className="text-2xl font-bold text-white">Rp {booking.total.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-white/50 mx-auto mb-4" />
              <p className="text-white/70 text-lg">Tidak ada riwayat booking yang ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
