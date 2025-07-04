"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  ShoppingBag,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowLeft,
  Instagram,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import Aurora from "@/components/Aurora"
import AdminSidebar from "@/components/AdminSidebar"

interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
  joinDate: string
  totalBookings: number
  totalSpent: number
  status: "Active" | "Inactive"
  lastActivity: string
  socialMedia: {
    instagram: string
    whatsapp: string
  }
  purchases: Purchase[]
}

interface Purchase {
  id: string
  date: string
  items: string[]
  total: number
  type: "rental" | "purchase"
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Ahmad Rizki",
    email: "ahmad.rizki@email.com",
    phone: "+62 812-3456-7890",
    address: "Jl. Sudirman No. 123, Jakarta",
    joinDate: "2024-01-15",
    totalBookings: 8,
    totalSpent: 2400000,
    status: "Active",
    lastActivity: "2024-01-20",
    socialMedia: {
      instagram: "@ahmad_rizki",
      whatsapp: "+62 812-3456-7890",
    },
    purchases: [
      {
        id: "p1",
        date: "2024-01-18",
        items: ["Tenda Dome 4P", "Sleeping Bag"],
        total: 450000,
        type: "rental",
      },
      {
        id: "p2",
        date: "2024-01-10",
        items: ["Headlamp LED", "Kompor Portable"],
        total: 350000,
        type: "purchase",
      },
    ],
  },
  {
    id: "2",
    name: "Sari Dewi",
    email: "sari.dewi@email.com",
    phone: "+62 813-9876-5432",
    address: "Jl. Malioboro No. 45, Yogyakarta",
    joinDate: "2024-02-01",
    totalBookings: 5,
    totalSpent: 1800000,
    status: "Active",
    lastActivity: "2024-01-19",
    socialMedia: {
      instagram: "@sari_dewi",
      whatsapp: "+62 813-9876-5432",
    },
    purchases: [
      {
        id: "p3",
        date: "2024-01-15",
        items: ["Carrier 60L", "Rain Cover"],
        total: 200000,
        type: "rental",
      },
      {
        id: "p4",
        date: "2024-01-05",
        items: ["Sepatu Gunung"],
        total: 850000,
        type: "purchase",
      },
    ],
  },
  {
    id: "3",
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    phone: "+62 814-1111-2222",
    address: "Jl. Diponegoro No. 78, Bandung",
    joinDate: "2023-12-10",
    totalBookings: 12,
    totalSpent: 3600000,
    status: "Active",
    lastActivity: "2024-01-21",
    socialMedia: {
      instagram: "@budi_adventure",
      whatsapp: "+62 814-1111-2222",
    },
    purchases: [
      {
        id: "p5",
        date: "2024-01-20",
        items: ["Paket Adventure Pro"],
        total: 1200000,
        type: "rental",
      },
      {
        id: "p6",
        date: "2024-01-12",
        items: ["Jaket Gunung", "Sarung Tangan"],
        total: 650000,
        type: "purchase",
      },
    ],
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      router.push("/login")
      return
    }
  }, [router])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  )

  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "Active").length
  const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0)
  const avgSpentPerUser = totalRevenue / totalUsers

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId))
  }

  return (
    <div className="min-h-screen relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#1e3a8a", "#3b82f6", "#8b5cf6"]} blend={0.3} amplitude={0.8} speed={0.3} />
      </div>

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="lg:ml-64 relative z-10">
        {/* Header */}
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-40">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 backdrop-blur-sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-white" />
                <div>
                  <h1 className="text-xl font-bold text-white">User Management</h1>
                  <p className="text-sm text-white/70">®QHERE AYEM OUTDOOR</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{totalUsers}</div>
                <p className="text-xs text-white/60">Registered users</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Active Users</CardTitle>
                <Users className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{activeUsers}</div>
                <p className="text-xs text-white/60">{((activeUsers / totalUsers) * 100).toFixed(1)}% of total</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Total Revenue</CardTitle>
                <ShoppingBag className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">Rp {totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-white/60">From all users</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Avg Spent/User</CardTitle>
                <Star className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">Rp {avgSpentPerUser.toLocaleString()}</div>
                <p className="text-xs text-white/60">Average per user</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-white">Search Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">All Users</CardTitle>
              <CardDescription className="text-white/60">Manage and view user information</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 backdrop-blur-sm bg-white/10">
                  <TabsTrigger value="all" className="text-white data-[state=active]:bg-white/20">
                    All Users
                  </TabsTrigger>
                  <TabsTrigger value="rentals" className="text-white data-[state=active]:bg-white/20">
                    Rental History
                  </TabsTrigger>
                  <TabsTrigger value="purchases" className="text-white data-[state=active]:bg-white/20">
                    Purchase History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{user.name}</h3>
                          <p className="text-white/60 text-sm">{user.email}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-white/60 text-xs flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {user.phone}
                            </span>
                            <span className="text-white/60 text-xs flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Joined {new Date(user.joinDate).toLocaleDateString()}
                            </span>
                          </div>
                          {/* Social Media */}
                          <div className="flex items-center gap-3 mt-2">
                            {user.socialMedia.instagram && (
                              <div className="flex items-center gap-1">
                                <Instagram className="h-3 w-3 text-pink-400" />
                                <span className="text-white/60 text-xs">{user.socialMedia.instagram}</span>
                              </div>
                            )}
                            {user.socialMedia.whatsapp && (
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3 text-green-400" />
                                <span className="text-white/60 text-xs">{user.socialMedia.whatsapp}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-white font-medium">{user.totalBookings} bookings</p>
                          <p className="text-white/60 text-sm">Rp {user.totalSpent.toLocaleString()}</p>
                          <Badge className={user.status === "Active" ? "bg-green-600" : "bg-red-600"}>
                            {user.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewUser(user)}
                            className="text-white hover:bg-white/20 backdrop-blur-sm"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 backdrop-blur-sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-400 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="rentals" className="space-y-4">
                  {filteredUsers.map((user) =>
                    user.purchases
                      .filter((p) => p.type === "rental")
                      .map((purchase) => (
                        <div
                          key={purchase.id}
                          className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10"
                        >
                          <div>
                            <h3 className="text-white font-medium">{user.name}</h3>
                            <p className="text-white/60 text-sm">{purchase.items.join(", ")}</p>
                            <p className="text-white/60 text-xs">{new Date(purchase.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">Rp {purchase.total.toLocaleString()}</p>
                            <Badge className="bg-blue-600">Rental</Badge>
                          </div>
                        </div>
                      )),
                  )}
                </TabsContent>

                <TabsContent value="purchases" className="space-y-4">
                  {filteredUsers.map((user) =>
                    user.purchases
                      .filter((p) => p.type === "purchase")
                      .map((purchase) => (
                        <div
                          key={purchase.id}
                          className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10"
                        >
                          <div>
                            <h3 className="text-white font-medium">{user.name}</h3>
                            <p className="text-white/60 text-sm">{purchase.items.join(", ")}</p>
                            <p className="text-white/60 text-xs">{new Date(purchase.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">Rp {purchase.total.toLocaleString()}</p>
                            <Badge className="bg-green-600">Purchase</Badge>
                          </div>
                        </div>
                      )),
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* User Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="backdrop-blur-md bg-black/80 border border-white/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">User Details</DialogTitle>
            <DialogDescription className="text-white/60">Complete information about the user</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{selectedUser.name.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedUser.name}</h2>
                  <p className="text-white/60">{selectedUser.email}</p>
                  <Badge className={selectedUser.status === "Active" ? "bg-green-600" : "bg-red-600"}>
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-white font-medium mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-white/60" />
                      <span className="text-white/80">{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-white/60" />
                      <span className="text-white/80">{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-white/60" />
                      <span className="text-white/80">{selectedUser.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/60">Total Bookings:</span>
                      <span className="text-white">{selectedUser.totalBookings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Total Spent:</span>
                      <span className="text-white">Rp {selectedUser.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Join Date:</span>
                      <span className="text-white">{new Date(selectedUser.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Last Activity:</span>
                      <span className="text-white">{new Date(selectedUser.lastActivity).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div>
                <h3 className="text-white font-medium mb-2">Social Media</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-pink-400" />
                    <span className="text-white/80">{selectedUser.socialMedia.instagram || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-green-400" />
                    <span className="text-white/80">{selectedUser.socialMedia.whatsapp || "Not provided"}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Purchase History</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedUser.purchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex items-center justify-between p-3 backdrop-blur-sm bg-white/5 rounded-lg"
                    >
                      <div>
                        <p className="text-white text-sm">{purchase.items.join(", ")}</p>
                        <p className="text-white/60 text-xs">{new Date(purchase.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">Rp {purchase.total.toLocaleString()}</p>
                        <Badge className={purchase.type === "rental" ? "bg-blue-600" : "bg-green-600"}>
                          {purchase.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
