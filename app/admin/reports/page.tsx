"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mountain,
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Receipt,
} from "lucide-react"
import Link from "next/link"

// Mock data for comprehensive reports
const mockBookingData = [
  {
    id: 1,
    date: "2024-12-01",
    customer: "Ahmad Rizki",
    items: ["Tenda Dome", "Sleeping Bag"],
    total: 150000,
    status: "Selesai",
    type: "Booking",
  },
  {
    id: 2,
    date: "2024-12-02",
    customer: "Sari Dewi",
    items: ["Carrier 60L"],
    total: 100000,
    status: "Selesai",
    type: "Booking",
  },
  {
    id: 3,
    date: "2024-12-03",
    customer: "Budi Santoso",
    items: ["Paket Adventure Pro"],
    total: 300000,
    status: "Disetujui",
    type: "Booking",
  },
]

const mockSalesData = [
  {
    id: 1,
    date: "2024-12-01",
    customer: "Maya Putri",
    items: ["Kompor Portable"],
    total: 250000,
    status: "Selesai",
    type: "Penjualan",
  },
  {
    id: 2,
    date: "2024-12-02",
    customer: "Eko Prasetyo",
    items: ["Headlamp LED"],
    total: 150000,
    status: "Selesai",
    type: "Penjualan",
  },
  {
    id: 3,
    date: "2024-12-03",
    customer: "Rina Sari",
    items: ["Matras Gunung"],
    total: 180000,
    status: "Selesai",
    type: "Penjualan",
  },
]

const mockExpensesData = [
  {
    id: 1,
    date: "2024-12-01",
    category: "Pemeliharaan",
    description: "Service peralatan",
    amount: 500000,
    type: "Pengeluaran",
  },
  {
    id: 2,
    date: "2024-12-02",
    category: "Operasional",
    description: "Listrik & Air",
    amount: 300000,
    type: "Pengeluaran",
  },
  {
    id: 3,
    date: "2024-12-03",
    category: "Inventory",
    description: "Pembelian stock baru",
    amount: 2000000,
    type: "Pengeluaran",
  },
]

export default function AdminReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState("12")
  const [selectedYear, setSelectedYear] = useState("2024")
  const [reportType, setReportType] = useState("semua")
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      router.push("/login")
    }
  }, [router])

  // Combine all data
  const allTransactions = [...mockBookingData, ...mockSalesData, ...mockExpensesData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  // Calculate totals
  const totalBookingRevenue = mockBookingData.reduce((sum, item) => sum + item.total, 0)
  const totalSalesRevenue = mockSalesData.reduce((sum, item) => sum + item.total, 0)
  const totalExpenses = mockExpensesData.reduce((sum, item) => sum + item.amount, 0)
  const totalRevenue = totalBookingRevenue + totalSalesRevenue
  const netProfit = totalRevenue - totalExpenses

  const exportReport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Tanggal,Tipe,Customer/Kategori,Deskripsi,Jumlah,Status\n" +
      allTransactions
        .map(
          (row) =>
            `${row.date},${row.type},${row.customer || row.category || ""},${row.items?.join("; ") || row.description || ""},${row.total || row.amount},${row.status || "Selesai"}`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `laporan_${selectedMonth}_${selectedYear}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Liquid Glass Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Mountain className="h-6 w-6 text-white" />
            <span className="text-lg font-bold text-white">Laporan Komprehensif</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40 backdrop-blur-sm bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Pilih Bulan" />
            </SelectTrigger>
            <SelectContent className="backdrop-blur-md bg-black/80 border-white/20">
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {new Date(2024, i).toLocaleDateString("id-ID", { month: "long" })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32 backdrop-blur-sm bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent className="backdrop-blur-md bg-black/80 border-white/20">
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={exportReport} className="bg-green-600 hover:bg-green-700 backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Liquid Glass Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Revenue Booking</CardTitle>
              <Package className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Rp {totalBookingRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% dari bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Revenue Penjualan</CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Rp {totalSalesRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% dari bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Pengeluaran</CardTitle>
              <Receipt className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Rp {totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-red-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5% dari bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Net Profit</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
                Rp {netProfit.toLocaleString()}
              </div>
              <p className={`text-xs flex items-center ${netProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
                {netProfit >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {netProfit >= 0 ? "+15%" : "-3%"} dari bulan lalu
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <Tabs defaultValue="semua" className="space-y-6">
          <TabsList className="backdrop-blur-sm bg-white/10 border-white/20">
            <TabsTrigger value="semua" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Semua Transaksi
            </TabsTrigger>
            <TabsTrigger value="booking" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Booking
            </TabsTrigger>
            <TabsTrigger value="penjualan" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Penjualan
            </TabsTrigger>
            <TabsTrigger value="pengeluaran" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Pengeluaran
            </TabsTrigger>
          </TabsList>

          <TabsContent value="semua">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Semua Transaksi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allTransactions.map((transaction) => (
                    <div
                      key={`${transaction.type}-${transaction.id}`}
                      className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <p className="text-white font-medium">
                            {transaction.customer || transaction.category || "N/A"}
                          </p>
                          <p className="text-white/60 text-sm">
                            {transaction.items?.join(", ") || transaction.description || "N/A"}
                          </p>
                          <p className="text-white/40 text-xs">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold ${transaction.type === "Pengeluaran" ? "text-red-400" : "text-green-400"}`}
                        >
                          {transaction.type === "Pengeluaran" ? "-" : "+"}Rp{" "}
                          {(transaction.total || transaction.amount).toLocaleString()}
                        </p>
                        <Badge
                          className={
                            transaction.type === "Booking"
                              ? "bg-blue-600"
                              : transaction.type === "Penjualan"
                                ? "bg-green-600"
                                : "bg-red-600"
                          }
                        >
                          {transaction.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Laporan Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookingData.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <p className="text-white font-medium">{booking.customer}</p>
                          <p className="text-white/60 text-sm">{booking.items.join(", ")}</p>
                          <p className="text-white/40 text-xs">{booking.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">+Rp {booking.total.toLocaleString()}</p>
                        <Badge
                          className={
                            booking.status === "Selesai"
                              ? "bg-green-600"
                              : booking.status === "Disetujui"
                                ? "bg-blue-600"
                                : "bg-yellow-600"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="penjualan">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Laporan Penjualan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSalesData.map((sale) => (
                    <div
                      key={sale.id}
                      className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <p className="text-white font-medium">{sale.customer}</p>
                          <p className="text-white/60 text-sm">{sale.items.join(", ")}</p>
                          <p className="text-white/40 text-xs">{sale.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">+Rp {sale.total.toLocaleString()}</p>
                        <Badge className="bg-green-600">{sale.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pengeluaran">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Laporan Pengeluaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockExpensesData.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <p className="text-white font-medium">{expense.category}</p>
                          <p className="text-white/60 text-sm">{expense.description}</p>
                          <p className="text-white/40 text-xs">{expense.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-red-400 font-bold">-Rp {expense.amount.toLocaleString()}</p>
                        <Badge className="bg-red-600">Pengeluaran</Badge>
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
  )
}
