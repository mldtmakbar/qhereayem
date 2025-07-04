"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, DollarSign, ShoppingCart, Package } from "lucide-react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line,
  AreaChart,
  Area,
} from "recharts"

// Sample sales data for retail items
const salesData = [
  { month: "Jan", sales: 1200000, items: 85 },
  { month: "Feb", sales: 980000, items: 72 },
  { month: "Mar", sales: 1450000, items: 98 },
  { month: "Apr", sales: 1320000, items: 89 },
  { month: "Mei", sales: 1680000, items: 112 },
  { month: "Jun", sales: 1890000, items: 125 },
]

const topSellingItems = [
  { name: "Air Mineral 1.5L", sold: 145, revenue: 725000, price: 5000, color: "#3B82F6" },
  { name: "Jas Hujan", sold: 32, revenue: 1600000, price: 50000, color: "#10B981" },
  { name: "Gelas Plastik", sold: 89, revenue: 445000, price: 5000, color: "#F59E0B" },
  { name: "Snack Energy Bar", sold: 67, revenue: 670000, price: 10000, color: "#EF4444" },
  { name: "Kaos Kaki Hiking", sold: 28, revenue: 840000, price: 30000, color: "#8B5CF6" },
]

const dailySales = [
  { day: "Sen", sales: 180000, items: 12 },
  { day: "Sel", sales: 220000, items: 15 },
  { day: "Rab", sales: 150000, items: 10 },
  { day: "Kam", sales: 280000, items: 18 },
  { day: "Jum", sales: 320000, items: 22 },
  { day: "Sab", sales: 450000, items: 35 },
  { day: "Min", sales: 380000, items: 28 },
]

const categoryBreakdown = [
  { category: "Minuman", percentage: 35, revenue: 2100000, color: "#3B82F6" },
  { category: "Makanan", percentage: 25, revenue: 1500000, color: "#10B981" },
  { category: "Aksesoris", percentage: 20, revenue: 1200000, color: "#F59E0B" },
  { category: "Pakaian", percentage: 15, revenue: 900000, color: "#EF4444" },
  { category: "Lain-lain", percentage: 5, revenue: 300000, color: "#8B5CF6" },
]

export default function SalesAnalyticsPage() {
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      router.push("/login")
    }
  }, [router])

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
            <TrendingUp className="h-6 w-6 text-white" />
            <span className="text-lg font-bold">Analytics Penjualan</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Penjualan</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Rp 9.52M</div>
              <p className="text-xs text-green-400">+18.2% dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Item Terjual</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">581</div>
              <p className="text-xs text-green-400">+12.5% dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Rata-rata Transaksi</CardTitle>
              <Package className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Rp 16.4K</div>
              <p className="text-xs text-green-400">+5.1% dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Margin Keuntungan</CardTitle>
              <TrendingUp className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">42.5%</div>
              <p className="text-xs text-green-400">+2.3% dari bulan lalu</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Sales Trend */}
          <Card className="bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Tren Penjualan Bulanan</CardTitle>
              <CardDescription className="text-gray-400">Penjualan dan jumlah item 6 bulan terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                    formatter={(value: any, name: string) => [
                      name === "sales" ? `Rp ${value.toLocaleString()}` : value,
                      name === "sales" ? "Penjualan" : "Item Terjual",
                    ]}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                  <Line type="monotone" dataKey="items" stroke="#3B82F6" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Selling Items */}
          <Card className="bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Item Terlaris</CardTitle>
              <CardDescription className="text-gray-400">Produk dengan penjualan tertinggi</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={topSellingItems}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="revenue"
                    label={({ name, sold }) => `${name}: ${sold}`}
                  >
                    {topSellingItems.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                    formatter={(value: any) => [`Rp ${value.toLocaleString()}`, "Revenue"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Sales */}
          <Card className="bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Penjualan Harian (Minggu Ini)</CardTitle>
              <CardDescription className="text-gray-400">
                Pola penjualan berdasarkan hari dalam seminggu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailySales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                    formatter={(value: any, name: string) => [
                      name === "sales" ? `Rp ${value.toLocaleString()}` : value,
                      name === "sales" ? "Penjualan" : "Item",
                    ]}
                  />
                  <Bar dataKey="sales" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Breakdown Kategori</CardTitle>
              <CardDescription className="text-gray-400">Distribusi penjualan per kategori</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryBreakdown.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{category.category}</span>
                      <span className="text-gray-400 text-sm">{category.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${category.percentage}%`,
                          backgroundColor: category.color,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Rp {category.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Product Performance */}
        <Card className="bg-white/5 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Performa Produk Detail</CardTitle>
            <CardDescription className="text-gray-400">Analisis mendalam per produk</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellingItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: item.color }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-gray-400 text-sm">Rp {item.price.toLocaleString()} per unit</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{item.sold} terjual</p>
                    <p className="text-green-400 font-semibold">Rp {item.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <Card className="bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Metrik Penjualan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Conversion Rate</span>
                <span className="text-white font-bold">68.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Repeat Customer</span>
                <span className="text-white font-bold">34.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Avg Items per Sale</span>
                <span className="text-white font-bold">2.8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Return Rate</span>
                <span className="text-red-400 font-bold">1.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Inventory Turnover</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Air Mineral</span>
                <span className="text-green-400 font-bold">12.5x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Snack</span>
                <span className="text-green-400 font-bold">8.2x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Aksesoris</span>
                <span className="text-yellow-400 font-bold">4.8x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Pakaian</span>
                <span className="text-red-400 font-bold">2.1x</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Profit Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Gross Profit</span>
                <span className="text-green-400 font-bold">Rp 4.05M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Net Profit</span>
                <span className="text-green-400 font-bold">Rp 3.2M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Best Margin</span>
                <span className="text-white font-bold">Jas Hujan (65%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Lowest Margin</span>
                <span className="text-yellow-400 font-bold">Air Mineral (25%)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
