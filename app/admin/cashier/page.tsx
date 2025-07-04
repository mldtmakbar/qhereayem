"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mountain, ArrowLeft, ShoppingCart, Plus, Minus, Trash2, User, Search, CreditCard } from "lucide-react"
import Link from "next/link"

// Mock data
const mockUsers = [
  { id: 1, name: "Ahmad Rizki", email: "ahmad.rizki@email.com", phone: "081234567890" },
  { id: 2, name: "Sari Dewi", email: "sari.dewi@email.com", phone: "081987654321" },
  { id: 3, name: "Budi Santoso", email: "budi.santoso@email.com", phone: "081122334455" },
]

const mockBookings = [
  {
    id: "BK001",
    userId: 1,
    items: [
      { name: "Tenda Dome", price: 75000, quantity: 1 },
      { name: "Sleeping Bag", price: 50000, quantity: 2 },
    ],
    total: 175000,
    status: "Disetujui",
  },
  {
    id: "BK002",
    userId: 2,
    items: [{ name: "Carrier 60L", price: 100000, quantity: 1 }],
    total: 100000,
    status: "Disetujui",
  },
]

const mockInventory = [
  { id: 1, name: "Tenda Dome 4 Orang", price: 75000, stock: 10, type: "Sewa" },
  { id: 2, name: "Sleeping Bag", price: 50000, stock: 15, type: "Sewa" },
  { id: 3, name: "Carrier 60L", price: 100000, stock: 8, type: "Sewa" },
  { id: 4, name: "Kompor Portable", price: 250000, stock: 5, type: "Jual" },
  { id: 5, name: "Headlamp LED", price: 150000, stock: 12, type: "Jual" },
  { id: 6, name: "Matras Gunung", price: 180000, stock: 7, type: "Jual" },
]

export default function AdminCashierPage() {
  const [activeTab, setActiveTab] = useState("booking")
  const [bookingCode, setBookingCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [cart, setCart] = useState<any[]>([])
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      router.push("/login")
    }
  }, [router])

  const handleBookingCodeSubmit = () => {
    const booking = mockBookings.find((b) => b.id === bookingCode)
    if (booking) {
      const user = mockUsers.find((u) => u.id === booking.userId)
      if (user) {
        setSelectedUser(user)
        setCart(booking.items)
        alert(`Booking ${bookingCode} berhasil dimuat untuk ${user.name}`)
      }
    } else {
      alert("Kode booking tidak ditemukan!")
    }
  }

  const handlePhoneSearch = () => {
    const user = mockUsers.find((u) => u.phone === phoneNumber)
    if (user) {
      setSelectedUser(user)
      setCart([])
      alert(`User ditemukan: ${user.name}`)
    } else {
      alert("Nomor telepon tidak terdaftar. Silakan buat akun baru.")
      setIsNewUserDialogOpen(true)
      setNewUser({ ...newUser, phone: phoneNumber })
    }
  }

  const handleCreateNewUser = () => {
    if (newUser.name && newUser.email && newUser.phone) {
      const newUserId = mockUsers.length + 1
      const createdUser = { id: newUserId, ...newUser }
      mockUsers.push(createdUser)
      setSelectedUser(createdUser)
      setCart([])
      setIsNewUserDialogOpen(false)
      setNewUser({ name: "", email: "", phone: "" })
      alert(`Akun baru berhasil dibuat untuk ${createdUser.name}`)
    }
  }

  const addToCart = (item: any) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name)
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        ),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const updateQuantity = (itemName: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter((item) => item.name !== itemName))
    } else {
      setCart(cart.map((item) => (item.name === itemName ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeFromCart = (itemName: string) => {
    setCart(cart.filter((item) => item.name !== itemName))
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    if (!selectedUser || cart.length === 0) {
      alert("Pastikan user sudah dipilih dan keranjang tidak kosong!")
      return
    }

    const transactionData = {
      id: Date.now(),
      userId: selectedUser.id,
      userName: selectedUser.name,
      items: cart,
      total: getTotalAmount(),
      date: new Date().toISOString(),
      type: activeTab === "booking" ? "Booking" : "Penjualan",
    }

    // Save transaction (in real app, this would be sent to backend)
    const existingTransactions = JSON.parse(localStorage.getItem("transactions") || "[]")
    existingTransactions.push(transactionData)
    localStorage.setItem("transactions", JSON.stringify(existingTransactions))

    alert(`Transaksi berhasil! Total: Rp ${getTotalAmount().toLocaleString()}`)

    // Reset form
    setSelectedUser(null)
    setCart([])
    setBookingCode("")
    setPhoneNumber("")
  }

  const filteredInventory = mockInventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === "booking" ? item.type === "Sewa" : item.type === "Jual"),
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Mountain className="h-6 w-6 text-white" />
            <span className="text-lg font-bold">Kasir</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - User Selection & Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Selection */}
            <Card className="bg-white/5 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Pilih Customer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-white/5 border-white/20">
                    <TabsTrigger
                      value="booking"
                      className="data-[state=active]:bg-white data-[state=active]:text-black"
                    >
                      Booking Code
                    </TabsTrigger>
                    <TabsTrigger value="manual" className="data-[state=active]:bg-white data-[state=active]:text-black">
                      Manual Entry
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="booking" className="space-y-4">
                    <div>
                      <Label className="text-white">Kode Booking</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Masukkan kode booking (contoh: BK001)"
                          value={bookingCode}
                          onChange={(e) => setBookingCode(e.target.value)}
                          className="bg-white/5 border-white/20 text-white"
                        />
                        <Button onClick={handleBookingCodeSubmit} className="bg-blue-600 hover:bg-blue-700">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="manual" className="space-y-4">
                    <div>
                      <Label className="text-white">Nomor Telepon</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Masukkan nomor telepon"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="bg-white/5 border-white/20 text-white"
                        />
                        <Button onClick={handlePhoneSearch} className="bg-green-600 hover:bg-green-700">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {selectedUser && (
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Customer Terpilih:</h4>
                    <div className="space-y-1">
                      <p className="text-gray-300">{selectedUser.name}</p>
                      <p className="text-gray-400 text-sm">{selectedUser.email}</p>
                      <p className="text-gray-400 text-sm">{selectedUser.phone}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Items Selection (only for manual entry) */}
            {activeTab === "manual" && selectedUser && (
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Pilih Item
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Input
                      placeholder="Cari item..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredInventory.map((item) => (
                      <div key={item.id} className="bg-white/5 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <Badge className={item.type === "Sewa" ? "bg-blue-600" : "bg-green-600"}>{item.type}</Badge>
                        </div>
                        <p className="text-gray-300 mb-2">Rp {item.price.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm mb-3">Stock: {item.stock}</p>
                        <Button
                          onClick={() => addToCart(item)}
                          size="sm"
                          className="w-full bg-white text-black hover:bg-gray-200"
                          disabled={item.stock === 0}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Tambah
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Cart */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Keranjang
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">Keranjang kosong</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={index} className="bg-white/5 p-3 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <Button
                            onClick={() => removeFromCart(item.name)}
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">Rp {item.price.toLocaleString()}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => updateQuantity(item.name, item.quantity - 1)}
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-white px-2">{item.quantity}</span>
                            <Button
                              onClick={() => updateQuantity(item.name, item.quantity + 1)}
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-white font-bold">Rp {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-white font-bold text-lg">Total:</span>
                        <span className="text-white font-bold text-xl">Rp {getTotalAmount().toLocaleString()}</span>
                      </div>
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={!selectedUser || cart.length === 0}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* New User Dialog */}
        <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
          <DialogContent className="bg-black border-white/20 text-white">
            <DialogHeader>
              <DialogTitle>Buat Akun Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-white">Nama Lengkap</Label>
                <Input
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <Label className="text-white">Email</Label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="Masukkan email"
                />
              </div>
              <div>
                <Label className="text-white">Nomor Telepon</Label>
                <Input
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="Masukkan nomor telepon"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateNewUser} className="flex-1 bg-green-600 hover:bg-green-700">
                  Buat Akun
                </Button>
                <Button
                  onClick={() => setIsNewUserDialogOpen(false)}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Batal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
