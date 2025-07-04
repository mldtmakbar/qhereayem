"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Mountain, Search, ShoppingCart, LogOut, Package, Calendar, Users } from "lucide-react"
import Link from "next/link"
import Aurora from "@/components/Aurora"
import GooeyNav from "@/components/GooeyNav"

const mountainPackages = [
  {
    id: 1,
    name: "Paket Pendaki Pemula",
    price: 150000,
    duration: "2 hari",
    maxPeople: 2,
    image: "/placeholder.svg?height=300&width=400",
    description: "Paket lengkap untuk pendaki pemula dengan peralatan dasar",
    items: [
      { name: "Tenda Dome 2 Orang", quantity: 1 },
      { name: "Sleeping Bag", quantity: 2 },
      { name: "Matras", quantity: 2 },
      { name: "Kompor Portable", quantity: 1 },
      { name: "Headlamp", quantity: 2 },
    ],
    features: ["Panduan pendakian", "Tips keamanan", "Checklist persiapan"],
    available: true,
  },
  {
    id: 2,
    name: "Paket Adventure Pro",
    price: 300000,
    duration: "3 hari",
    maxPeople: 4,
    image: "/placeholder.svg?height=300&width=400",
    description: "Paket lengkap untuk pendaki berpengalaman dengan gear premium",
    items: [
      { name: "Tenda Dome 4 Orang", quantity: 1 },
      { name: "Sleeping Bag Premium", quantity: 4 },
      { name: "Carrier 60L", quantity: 4 },
      { name: "Kompor Multi-fuel", quantity: 1 },
      { name: "Headlamp LED", quantity: 4 },
      { name: "Trekking Pole", quantity: 4 },
    ],
    features: ["GPS Navigator", "Emergency kit", "Weather radio", "Panduan advanced"],
    available: true,
  },
  {
    id: 3,
    name: "Paket Family Adventure",
    price: 250000,
    duration: "2 hari",
    maxPeople: 6,
    image: "/placeholder.svg?height=300&width=400",
    description: "Paket khusus untuk keluarga dengan anak-anak",
    items: [
      { name: "Tenda Family 6 Orang", quantity: 1 },
      { name: "Sleeping Bag", quantity: 6 },
      { name: "Matras Keluarga", quantity: 3 },
      { name: "Kompor Portable", quantity: 2 },
      { name: "Headlamp", quantity: 6 },
      { name: "First Aid Kit", quantity: 1 },
    ],
    features: ["Kid-friendly gear", "Safety equipment", "Family guide"],
    available: true,
  },
  {
    id: 4,
    name: "Paket Extreme Explorer",
    price: 500000,
    duration: "5 hari",
    maxPeople: 3,
    image: "/placeholder.svg?height=300&width=400",
    description: "Paket untuk ekspedisi ekstrem dengan peralatan profesional",
    items: [
      { name: "Tenda 4 Season", quantity: 1 },
      { name: "Sleeping Bag -10°C", quantity: 3 },
      { name: "Carrier 80L", quantity: 3 },
      { name: "Kompor High Altitude", quantity: 1 },
      { name: "Climbing Gear Set", quantity: 1 },
      { name: "Emergency Shelter", quantity: 1 },
    ],
    features: ["Professional gear", "Satellite communicator", "Extreme weather kit"],
    available: false,
  },
]

const navItems = [
  { label: "Gear", href: "/dashboard" },
  { label: "Paket", href: "/dashboard/packages" },
  { label: "AI Chat", href: "/dashboard/chat" },
  { label: "Riwayat", href: "/dashboard/history" },
  { label: "Profil", href: "/dashboard/profile" },
]

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (!userRole) {
      router.push("/login")
    }
  }, [router])

  const filteredPackages = mountainPackages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addToCart = (pkg: any) => {
    setCart([...cart, { ...pkg, type: "package" }])
  }

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    router.push("/")
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
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mountain className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">®QHERE AYEM OUTDOOR</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard/cart">
                <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Keranjang
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-white text-black text-xs">{cart.length}</Badge>
                  )}
                </Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-white/20 backdrop-blur-sm">
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </Button>
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
                initialActiveIndex={1}
                animationTime={500}
                timeVariance={200}
                colors={[1, 2, 3, 4]}
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-white">Paket Mountain Adventure</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Pilih paket lengkap sesuai kebutuhan petualangan Anda. Semua paket sudah termasuk peralatan dan panduan.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                placeholder="Cari paket adventure..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className="backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
              >
                <div className="relative">
                  <img
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={pkg.available ? "bg-white text-black" : "bg-red-500 text-white"}>
                      {pkg.available ? "Tersedia" : "Tidak Tersedia"}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/50 text-white">{pkg.duration}</Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-xl mb-2">{pkg.name}</CardTitle>
                      <p className="text-white/70 text-sm">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">Rp {pkg.price.toLocaleString()}</p>
                      <p className="text-white/70 text-sm">{pkg.duration}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Package Info */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-white/70" />
                      <span className="text-white/70">Max {pkg.maxPeople} orang</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-white/70" />
                      <span className="text-white/70">{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Items Included */}
                  <div>
                    <h4 className="font-semibold text-white mb-3">Peralatan Termasuk:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {pkg.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/5 p-2 rounded text-sm">
                          <span className="text-white/70">{item.name}</span>
                          <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                            {item.quantity}x
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-white mb-3">Fitur Tambahan:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.features.map((feature, index) => (
                        <Badge key={index} className="bg-white/10 text-white text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => addToCart(pkg)}
                    disabled={!pkg.available}
                    className="w-full bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400"
                  >
                    {pkg.available ? "Tambah ke Keranjang" : "Tidak Tersedia"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-white/50 mx-auto mb-4" />
              <p className="text-white/70 text-lg">Tidak ada paket yang ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
