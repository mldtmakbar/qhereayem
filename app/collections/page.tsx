"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Mountain, Search, Filter, ArrowLeft, Package, Tent, Backpack } from "lucide-react"

const allItems = [
  // Individual Gear (Sewa)
  {
    id: 1,
    name: "Tenda Dome 4 Orang",
    price: 75000,
    category: "Tenda",
    type: "Sewa",
    image: "/placeholder.svg?height=200&width=200",
    description: "Tenda berkualitas untuk 4 orang dengan flysheet tahan air",
    stock: 5,
  },
  {
    id: 2,
    name: "Carrier 60L",
    price: 50000,
    category: "Tas",
    type: "Sewa",
    image: "/placeholder.svg?height=200&width=200",
    description: "Tas carrier kapasitas 60 liter dengan frame internal",
    stock: 8,
  },
  {
    id: 3,
    name: "Sleeping Bag",
    price: 25000,
    category: "Sleeping",
    type: "Sewa",
    image: "/placeholder.svg?height=200&width=200",
    description: "Sleeping bag hangat untuk suhu hingga -5°C",
    stock: 12,
  },
  {
    id: 4,
    name: "Kompor Portable",
    price: 30000,
    category: "Masak",
    type: "Sewa",
    image: "/placeholder.svg?height=200&width=200",
    description: "Kompor portable dengan sistem piezo ignition",
    stock: 6,
  },
  {
    id: 5,
    name: "Matras Gunung",
    price: 20000,
    category: "Sleeping",
    type: "Sewa",
    image: "/placeholder.svg?height=200&width=200",
    description: "Matras empuk dan ringan untuk kenyamanan tidur",
    stock: 10,
  },
  {
    id: 6,
    name: "Headlamp LED",
    price: 15000,
    category: "Penerangan",
    type: "Sewa",
    image: "/placeholder.svg?height=200&width=200",
    description: "Lampu kepala LED dengan 3 mode pencahayaan",
    stock: 15,
  },
  {
    id: 7,
    name: "Trekking Pole",
    price: 35000,
    category: "Aksesoris",
    type: "Sewa",
    image: "/placeholder.svg?height=200&width=200",
    description: "Tongkat pendakian adjustable dengan grip ergonomis",
    stock: 7,
  },
  {
    id: 8,
    name: "Rain Cover",
    price: 18000,
    category: "Aksesoris",
    type: "Sewa",
    image: "/placeholder.svg?height=200&width=200",
    description: "Pelindung hujan untuk tas carrier",
    stock: 9,
  },
  // Packages
  {
    id: 101,
    name: "Paket Pendaki Pemula",
    price: 150000,
    category: "Paket",
    type: "Paket",
    image: "/placeholder.svg?height=200&width=200",
    description: "Paket lengkap untuk pendaki pemula (2 hari)",
    stock: 3,
  },
  {
    id: 102,
    name: "Paket Adventure Pro",
    price: 300000,
    category: "Paket",
    type: "Paket",
    image: "/placeholder.svg?height=200&width=200",
    description: "Paket lengkap untuk pendaki berpengalaman (3 hari)",
    stock: 2,
  },
  {
    id: 103,
    name: "Paket Family Adventure",
    price: 250000,
    category: "Paket",
    type: "Paket",
    image: "/placeholder.svg?height=200&width=200",
    description: "Paket khusus untuk keluarga dengan anak-anak (2 hari)",
    stock: 4,
  },
  {
    id: 104,
    name: "Paket Photography Trek",
    price: 200000,
    category: "Paket",
    type: "Paket",
    image: "/placeholder.svg?height=200&width=200",
    description: "Paket dengan perlengkapan khusus fotografi (2-4 hari)",
    stock: 2,
  },
]

export default function CollectionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [selectedType, setSelectedType] = useState("Semua")

  const categories = ["Semua", ...Array.from(new Set(allItems.map((item) => item.category)))]
  const types = ["Semua", "Sewa", "Paket"]

  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory
    const matchesType = selectedType === "Semua" || item.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Tenda":
        return <Tent className="h-4 w-4" />
      case "Tas":
        return <Backpack className="h-4 w-4" />
      case "Paket":
        return <Package className="h-4 w-4" />
      default:
        return <Mountain className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/3 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/4 rounded-full animate-ping"></div>

        {/* Mountain Silhouettes */}
        <svg className="absolute bottom-0 w-full h-64 opacity-10" viewBox="0 0 1200 300" fill="none">
          <path d="M0 300L200 100L400 200L600 50L800 150L1000 80L1200 200V300H0Z" fill="white" />
          <path d="M0 300L150 150L350 250L550 100L750 200L950 130L1200 250V300H0Z" fill="white" opacity="0.5" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Mountain className="h-8 w-8 text-white" />
              <span className="text-xl font-bold">®QHERE AYEM OUTDOOR</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white text-black hover:bg-gray-200">Daftar</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Koleksi Lengkap</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Jelajahi koleksi lengkap peralatan gunung dan paket adventure kami. Semua dalam kondisi prima dan siap untuk
            petualangan Anda.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari peralatan atau paket..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 p-4 rounded-lg border border-white/20 text-center">
            <p className="text-2xl font-bold text-white">{allItems.filter((item) => item.type === "Sewa").length}</p>
            <p className="text-gray-400 text-sm">Peralatan Sewa</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/20 text-center">
            <p className="text-2xl font-bold text-white">{allItems.filter((item) => item.type === "Paket").length}</p>
            <p className="text-gray-400 text-sm">Paket Adventure</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/20 text-center">
            <p className="text-2xl font-bold text-white">{allItems.reduce((sum, item) => sum + item.stock, 0)}</p>
            <p className="text-gray-400 text-sm">Total Stok</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/20 text-center">
            <p className="text-2xl font-bold text-white">{categories.length - 1}</p>
            <p className="text-gray-400 text-sm">Kategori</p>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="bg-white/5 border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur hover:scale-105"
            >
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Badge
                    className={`absolute top-2 right-2 ${
                      item.type === "Paket" ? "bg-white text-black" : "bg-white/20 text-white"
                    }`}
                  >
                    {item.type}
                  </Badge>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-black/50 text-white flex items-center gap-1">
                      {getCategoryIcon(item.category)}
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                  <p className="text-gray-400 text-xs">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold">
                      Rp {item.price.toLocaleString()}
                      {item.type === "Sewa" ? "/hari" : ""}
                    </p>
                    <Badge className={item.stock > 0 ? "bg-green-600" : "bg-red-600"}>
                      {item.stock > 0 ? `Stok: ${item.stock}` : "Habis"}
                    </Badge>
                  </div>
                  <Link href="/login">
                    <Button
                      disabled={item.stock === 0}
                      className="w-full bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400"
                    >
                      {item.stock > 0 ? "Sewa Sekarang" : "Stok Habis"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Tidak ada item yang ditemukan</p>
            <p className="text-gray-500 text-sm mt-2">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-white/5 p-8 rounded-lg border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-4">Siap Memulai Petualangan?</h2>
          <p className="text-gray-300 mb-6">
            Daftar sekarang untuk mengakses semua fitur booking dan dapatkan pengalaman terbaik
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-3">
                Daftar Sekarang
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 bg-transparent"
              >
                Sudah Punya Akun
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
