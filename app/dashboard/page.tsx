"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, LogOut, Filter, Mountain } from "lucide-react"
import Link from "next/link"
import Aurora from "@/components/Aurora"
import GooeyNav from "@/components/GooeyNav"

const products = [
  {
    id: 1,
    name: "Tenda Dome 4 Orang",
    price: 75000,
    stock: 5,
    category: "Tenda",
    image: "/placeholder.svg?height=200&width=200",
    description: "Tenda berkualitas untuk 4 orang",
  },
  {
    id: 2,
    name: "Carrier 60L",
    price: 50000,
    stock: 8,
    category: "Tas",
    image: "/placeholder.svg?height=200&width=200",
    description: "Tas carrier kapasitas 60 liter",
  },
  {
    id: 3,
    name: "Sleeping Bag",
    price: 25000,
    stock: 12,
    category: "Sleeping",
    image: "/placeholder.svg?height=200&width=200",
    description: "Sleeping bag hangat dan nyaman",
  },
  {
    id: 4,
    name: "Kompor Portable",
    price: 30000,
    stock: 6,
    category: "Masak",
    image: "/placeholder.svg?height=200&width=200",
    description: "Kompor portable untuk memasak",
  },
  {
    id: 5,
    name: "Matras Gunung",
    price: 20000,
    stock: 10,
    category: "Sleeping",
    image: "/placeholder.svg?height=200&width=200",
    description: "Matras empuk untuk tidur",
  },
  {
    id: 6,
    name: "Headlamp LED",
    price: 15000,
    stock: 15,
    category: "Penerangan",
    image: "/placeholder.svg?height=200&width=200",
    description: "Lampu kepala LED terang",
  },
  {
    id: 7,
    name: "Trekking Pole",
    price: 35000,
    stock: 7,
    category: "Aksesoris",
    image: "/placeholder.svg?height=200&width=200",
    description: "Tongkat pendakian adjustable",
  },
  {
    id: 8,
    name: "Rain Cover",
    price: 18000,
    stock: 9,
    category: "Aksesoris",
    image: "/placeholder.svg?height=200&width=200",
    description: "Pelindung hujan untuk tas",
  },
]

const navItems = [
  { label: "Gear", href: "/dashboard" },
  { label: "Paket", href: "/dashboard/packages" },
  { label: "AI Chat", href: "/dashboard/chat" },
  { label: "Riwayat", href: "/dashboard/history" },
  { label: "Profil", href: "/dashboard/profile" },
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [cart, setCart] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (!userRole) {
      router.push("/login")
    }
  }, [router])

  const categories = ["Semua", ...Array.from(new Set(products.map((p) => p.category)))]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Semua" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: any) => {
    setCart([...cart, product])
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
                initialActiveIndex={0}
                animationTime={500}
                timeVariance={200}
                colors={[1, 2, 3, 4]}
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                <Input
                  placeholder="Cari peralatan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-white/70" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-gray-800">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/40 transition-colors shadow-lg"
              >
                <CardContent className="p-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-white text-sm">{product.name}</h3>
                      <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                        {product.category}
                      </Badge>
                    </div>
                    <p className="text-white/70 text-xs">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-white font-bold">Rp {product.price.toLocaleString()}/hari</p>
                      <Badge className={product.stock > 0 ? "bg-green-600" : "bg-red-600"}>
                        {product.stock > 0 ? `Stok: ${product.stock}` : "Habis"}
                      </Badge>
                    </div>
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full bg-white text-black hover:bg-gray-200 disabled:bg-gray-600"
                    >
                      {product.stock > 0 ? "Tambah ke Keranjang" : "Stok Habis"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/70 text-lg">Tidak ada produk yang ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
