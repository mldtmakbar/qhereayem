"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Receipt,
  Plus,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  TrendingDown,
  FileText,
  Download,
  Filter,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

interface Expense {
  id: string
  date: string
  category: string
  description: string
  amount: number
  paymentMethod: string
  receipt?: string
  createdAt: string
}

const mockExpenses: Expense[] = [
  {
    id: "1",
    date: "2024-01-20",
    category: "Pemeliharaan Alat",
    description: "Service dan perbaikan tenda rusak",
    amount: 350000,
    paymentMethod: "Transfer Bank",
    createdAt: "2024-01-20",
  },
  {
    id: "2",
    date: "2024-01-18",
    category: "Pembelian Inventory",
    description: "Pembelian 5 sleeping bag baru",
    amount: 2500000,
    paymentMethod: "Cash",
    createdAt: "2024-01-18",
  },
  {
    id: "3",
    date: "2024-01-15",
    category: "Operasional",
    description: "Biaya listrik dan internet bulan Januari",
    amount: 450000,
    paymentMethod: "Transfer Bank",
    createdAt: "2024-01-15",
  },
  {
    id: "4",
    date: "2024-01-12",
    category: "Marketing",
    description: "Iklan Facebook dan Instagram",
    amount: 300000,
    paymentMethod: "Credit Card",
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    date: "2024-01-10",
    category: "Transportasi",
    description: "Pengiriman barang ke customer",
    amount: 150000,
    paymentMethod: "Cash",
    createdAt: "2024-01-10",
  },
]

const expenseCategories = [
  "Pembelian Inventory",
  "Pemeliharaan Alat",
  "Operasional",
  "Marketing",
  "Transportasi",
  "Gaji Karyawan",
  "Lainnya",
]

const monthlyExpenseData = [
  { month: "Jan", amount: 3750000 },
  { month: "Feb", amount: 2800000 },
  { month: "Mar", amount: 4200000 },
  { month: "Apr", amount: 3100000 },
  { month: "Mei", amount: 3800000 },
  { month: "Jun", amount: 4500000 },
]

const categoryExpenseData = [
  { name: "Pembelian Inventory", value: 45, amount: 2500000, color: "#3B82F6" },
  { name: "Operasional", value: 25, amount: 450000, color: "#10B981" },
  { name: "Pemeliharaan Alat", value: 15, amount: 350000, color: "#F59E0B" },
  { name: "Marketing", value: 10, amount: 300000, color: "#EF4444" },
  { name: "Transportasi", value: 5, amount: 150000, color: "#8B5CF6" },
]

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [formData, setFormData] = useState<Partial<Expense>>({})
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      router.push("/login")
      return
    }
  }, [router])

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const monthlyExpenses = 3750000 // Current month
  const avgExpensePerTransaction = totalExpenses / expenses.length

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingExpense) {
      // Update existing expense
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === editingExpense.id ? { ...editingExpense, ...formData } : exp)),
      )
    } else {
      // Add new expense
      const newExpense: Expense = {
        id: Date.now().toString(),
        date: formData.date || new Date().toISOString().split("T")[0],
        category: formData.category || "",
        description: formData.description || "",
        amount: formData.amount || 0,
        paymentMethod: formData.paymentMethod || "",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setExpenses((prev) => [newExpense, ...prev])
    }

    setIsDialogOpen(false)
    setEditingExpense(null)
    setFormData({})
  }

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
    setFormData(expense)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id))
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Pembelian Inventory": "bg-blue-600",
      "Pemeliharaan Alat": "bg-green-600",
      Operasional: "bg-yellow-600",
      Marketing: "bg-purple-600",
      Transportasi: "bg-red-600",
      "Gaji Karyawan": "bg-indigo-600",
      Lainnya: "bg-gray-600",
    }
    return colors[category] || "bg-gray-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="h-6 w-6 text-white" />
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">®QHERE AYEM OUTDOOR</span>
              <span className="mx-2 text-white/50">|</span>
              <p className="text-sm text-white/70">Manajemen Pengeluaran</p>
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Pengeluaran
                </Button>
              </DialogTrigger>
              <DialogContent className="backdrop-blur-md bg-black/80 border-white/20 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingExpense ? "Edit" : "Tambah"} Pengeluaran</DialogTitle>
                  <DialogDescription className="text-white/60">
                    {editingExpense ? "Perbarui" : "Catat"} pengeluaran bisnis Anda
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white/80">Tanggal</label>
                    <Input
                      type="date"
                      value={formData.date || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/80">Kategori</label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="backdrop-blur-sm bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent className="backdrop-blur-md bg-black/80 border-white/20">
                        {expenseCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/80">Deskripsi</label>
                    <Textarea
                      value={formData.description || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                      placeholder="Deskripsi pengeluaran..."
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/80">Jumlah (Rp)</label>
                    <Input
                      type="number"
                      value={formData.amount || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, amount: Number.parseInt(e.target.value) }))}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                      placeholder="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/80">Metode Pembayaran</label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                    >
                      <SelectTrigger className="backdrop-blur-sm bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Pilih metode pembayaran" />
                      </SelectTrigger>
                      <SelectContent className="backdrop-blur-md bg-black/80 border-white/20">
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Transfer Bank">Transfer Bank</SelectItem>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="Debit Card">Debit Card</SelectItem>
                        <SelectItem value="E-Wallet">E-Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Batal
                    </Button>
                    <Button type="submit" className="bg-white/20 hover:bg-white/30 text-white">
                      {editingExpense ? "Update" : "Simpan"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Pengeluaran</CardTitle>
              <DollarSign className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Rp {(totalExpenses / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-white/60">Semua waktu</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Bulan Ini</CardTitle>
              <Calendar className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Rp {(monthlyExpenses / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-red-400">+15% dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Rata-rata per Transaksi</CardTitle>
              <TrendingDown className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Rp {(avgExpensePerTransaction / 1000).toFixed(0)}K</div>
              <p className="text-xs text-white/60">Per transaksi</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Total Transaksi</CardTitle>
              <FileText className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{expenses.length}</div>
              <p className="text-xs text-white/60">Transaksi tercatat</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trend */}
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Trend Pengeluaran Bulanan</CardTitle>
              <CardDescription className="text-white/60">6 bulan terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyExpenseData}>
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
                    formatter={(value: any) => [`Rp ${value.toLocaleString()}`, "Pengeluaran"]}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#EF4444" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Pengeluaran per Kategori</CardTitle>
              <CardDescription className="text-white/60">Distribusi berdasarkan kategori</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryExpenseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryExpenseData.map((entry, index) => (
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
                    formatter={(value: any, name: string) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Expenses List */}
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Daftar Pengeluaran</CardTitle>
            <CardDescription className="text-white/60">Riwayat semua pengeluaran bisnis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white">
                      <Receipt className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{expense.description}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span>{new Date(expense.date).toLocaleDateString("id-ID")}</span>
                        <span>{expense.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge className={getCategoryColor(expense.category)}>{expense.category}</Badge>
                    <div className="text-right">
                      <p className="text-white font-bold">Rp {expense.amount.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(expense)}
                        className="text-white hover:bg-white/20 backdrop-blur-sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-400 hover:bg-red-500/20 backdrop-blur-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {expenses.length === 0 && (
              <div className="text-center py-12">
                <Receipt className="h-12 w-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Belum ada pengeluaran tercatat</p>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Pengeluaran Pertama
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
