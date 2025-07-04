"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminSidebar from "@/components/AdminSidebar"
import Aurora from "@/components/Aurora"
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import Link from "next/link"

const monthlyData = [
  { month: "Jan", revenue: 2400000, bookings: 45, customers: 38 },
  { month: "Feb", revenue: 1800000, bookings: 32, customers: 28 },
  { month: "Mar", revenue: 3200000, bookings: 58, customers: 45 },
  { month: "Apr", revenue: 2800000, bookings: 48, customers: 42 },
  { month: "Mei", revenue: 3600000, bookings: 65, customers: 55 },
  { month: "Jun", revenue: 4200000, bookings: 72, customers: 68 },
]

const categoryData = [
  { name: "Tenda", value: 35, revenue: 2100000, color: "#3B82F6" },
  { name: "Carrier", value: 28, revenue: 1400000, color: "#10B981" },
  { name: "Sleeping", value: 22, revenue: 550000, color: "#F59E0B" },
  { name: "Masak", value: 15, revenue: 450000, color: "#EF4444" },
]

const dailyData = [
  { day: "Sen", bookings: 12, revenue: 720000 },
  { day: "Sel", bookings: 8, revenue: 480000 },
  { day: "Rab", bookings: 15, revenue: 900000 },
  { day: "Kam", bookings: 10, revenue: 600000 },
  { day: "Jum", bookings: 18, revenue: 1080000 },
  { day: "Sab", bookings: 25, revenue: 1500000 },
  { day: "Min", bookings: 20, revenue: 1200000 },
]

const topItems = [
  { name: "Tenda Dome 4P", bookings: 45, revenue: 3375000, growth: 12 },
  { name: "Carrier 60L", bookings: 38, revenue: 1900000, growth: 8 },
  { name: "Sleeping Bag", bookings: 32, revenue: 800000, growth: -3 },
  { name: "Kompor Portable", bookings: 28, revenue: 840000, growth: 15 },
  { name: "Headlamp LED", bookings: 25, revenue: 375000, growth: 5 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      router.push("/login")
      return
    }
  }, [router])

  return (
    <AdminSidebar>
      <div className="min-h-screen relative">
        <Aurora />

        {/* Header */}
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">Analytics Dashboard</span>
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
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">Rp 18.0M</div>
                <div className="flex items-center text-xs text-green-400">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +12.5% dari bulan lalu
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">320</div>
                <div className="flex items-center text-xs text-green-400">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +8.2% dari bulan lalu
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Active Customers</CardTitle>
                <Users className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">276</div>
                <div className="flex items-center text-xs text-green-400">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +15.3% dari bulan lalu
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Avg. Order Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">Rp 56.2K</div>
                <div className="flex items-center text-xs text-red-400">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  -2.1% dari bulan lalu
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="backdrop-blur-md bg-white/10 border border-white/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white/20 text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="revenue" className="data-[state=active]:bg-white/20 text-white">
                Revenue
              </TabsTrigger>
              <TabsTrigger value="customers" className="data-[state=active]:bg-white/20 text-white">
                Customers
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-white/20 text-white">
                Products
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Revenue Trend */}
                <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-white">Revenue & Bookings Trend</CardTitle>
                    <CardDescription className="text-white/60">6 bulan terakhir</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "8px",
                            color: "#F9FAFB",
                            backdropFilter: "blur(10px)",
                          }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                        <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-white">Revenue by Category</CardTitle>
                    <CardDescription className="text-white/60">Distribusi pendapatan per kategori</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "8px",
                            color: "#F9FAFB",
                            backdropFilter: "blur(10px)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Daily Performance */}
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">Daily Performance</CardTitle>
                  <CardDescription className="text-white/60">Performa harian minggu ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: "8px",
                          color: "#F9FAFB",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                      <Bar dataKey="bookings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-white">Monthly Revenue Breakdown</CardTitle>
                    <CardDescription className="text-white/60">Detail pendapatan bulanan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "8px",
                            color: "#F9FAFB",
                            backdropFilter: "blur(10px)",
                          }}
                        />
                        <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-white">Revenue Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 backdrop-blur-sm bg-white/5 rounded-lg">
                      <p className="text-white/60 text-sm">Total Revenue</p>
                      <p className="text-2xl font-bold text-white">Rp 18.0M</p>
                    </div>
                    <div className="p-4 backdrop-blur-sm bg-white/5 rounded-lg">
                      <p className="text-white/60 text-sm">Avg Monthly</p>
                      <p className="text-2xl font-bold text-white">Rp 3.0M</p>
                    </div>
                    <div className="p-4 backdrop-blur-sm bg-white/5 rounded-lg">
                      <p className="text-white/60 text-sm">Best Month</p>
                      <p className="text-2xl font-bold text-white">Juni</p>
                      <p className="text-green-400 text-sm">Rp 4.2M</p>
                    </div>
                    <div className="p-4 backdrop-blur-sm bg-white/5 rounded-lg">
                      <p className="text-white/60 text-sm">Growth Rate</p>
                      <p className="text-2xl font-bold text-green-400">+12.5%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="customers" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-white">Customer Growth</CardTitle>
                    <CardDescription className="text-white/60">Pertumbuhan customer baru</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "8px",
                            color: "#F9FAFB",
                            backdropFilter: "blur(10px)",
                          }}
                        />
                        <Area type="monotone" dataKey="customers" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-white">Customer Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 backdrop-blur-sm bg-white/5 rounded-lg">
                      <span className="text-white/80">Total Customers</span>
                      <span className="text-white font-bold">276</span>
                    </div>
                    <div className="flex justify-between items-center p-3 backdrop-blur-sm bg-white/5 rounded-lg">
                      <span className="text-white/80">New This Month</span>
                      <span className="text-green-400 font-bold">+42</span>
                    </div>
                    <div className="flex justify-between items-center p-3 backdrop-blur-sm bg-white/5 rounded-lg">
                      <span className="text-white/80">Repeat Customers</span>
                      <span className="text-white font-bold">68%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 backdrop-blur-sm bg-white/5 rounded-lg">
                      <span className="text-white/80">Avg. Lifetime Value</span>
                      <span className="text-white font-bold">Rp 450K</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Products</CardTitle>
                  <CardDescription className="text-white/60">Produk dengan performa terbaik</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-white font-medium">{item.name}</p>
                            <p className="text-white/60 text-sm">{item.bookings} bookings</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">Rp {item.revenue.toLocaleString()}</p>
                          <div
                            className={`flex items-center text-sm ${item.growth >= 0 ? "text-green-400" : "text-red-400"}`}
                          >
                            {item.growth >= 0 ? (
                              <ArrowUp className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(item.growth)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminSidebar>
  )
}
