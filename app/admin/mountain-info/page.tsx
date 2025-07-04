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
  Mountain,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Ruler,
  Thermometer,
  Clock,
  AlertTriangle,
  Star,
  Users,
  Calendar,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import AdminSidebar from "@/components/AdminSidebar"
import Aurora from "@/components/Aurora"

interface MountainInfo {
  id: string
  name: string
  location: string
  height: number
  difficulty: "Pemula" | "Menengah" | "Sulit" | "Ekstrem"
  estimatedTime: string
  temperature: string
  description: string
  tips: string[]
  bestSeason: string
  facilities: string[]
  image: string
  rating: number
  lastClimbed: string
  createdAt: string
}

const mockMountainData: MountainInfo[] = [
  {
    id: "1",
    name: "Gunung Merapi",
    location: "Yogyakarta & Jawa Tengah",
    height: 2930,
    difficulty: "Menengah",
    estimatedTime: "6-8 jam",
    temperature: "15-25°C",
    description:
      "Gunung berapi aktif yang terkenal dengan pemandangan sunrise yang spektakuler. Jalur pendakian cukup menantang dengan medan berbatu dan pasir vulkanik.",
    tips: [
      "Bawa masker untuk melindungi dari debu vulkanik",
      "Mulai pendakian dini hari untuk menghindari panas",
      "Perhatikan status aktivitas gunung sebelum mendaki",
      "Bawa air yang cukup karena tidak ada sumber air di jalur",
    ],
    bestSeason: "April - Oktober (musim kering)",
    facilities: ["Pos pendakian", "Toilet", "Warung", "Parkir"],
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    lastClimbed: "2024-01-15",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Gunung Merbabu",
    location: "Jawa Tengah",
    height: 3145,
    difficulty: "Menengah",
    estimatedTime: "7-9 jam",
    temperature: "10-20°C",
    description:
      "Gunung dengan savana yang indah dan pemandangan 360 derajat. Jalur pendakian melalui hutan pinus dan padang savana yang luas.",
    tips: [
      "Bawa jaket tebal karena suhu dingin di puncak",
      "Siapkan tenda yang kuat untuk camping",
      "Bawa headlamp dengan baterai cadangan",
      "Perhatikan cuaca karena sering berkabut",
    ],
    bestSeason: "Mei - September",
    facilities: ["Basecamp", "Toilet", "Sumber air", "Parkir"],
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    lastClimbed: "2024-01-20",
    createdAt: "2024-01-02",
  },
]

export default function MountainInfoPage() {
  const [mountains, setMountains] = useState<MountainInfo[]>(mockMountainData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMountain, setEditingMountain] = useState<MountainInfo | null>(null)
  const [formData, setFormData] = useState<Partial<MountainInfo>>({})
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole !== "admin") {
      router.push("/login")
      return
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingMountain) {
      // Update existing mountain
      setMountains((prev) => prev.map((m) => (m.id === editingMountain.id ? { ...editingMountain, ...formData } : m)))
    } else {
      // Add new mountain
      const newMountain: MountainInfo = {
        id: Date.now().toString(),
        name: formData.name || "",
        location: formData.location || "",
        height: formData.height || 0,
        difficulty: formData.difficulty || "Pemula",
        estimatedTime: formData.estimatedTime || "",
        temperature: formData.temperature || "",
        description: formData.description || "",
        tips: formData.tips || [],
        bestSeason: formData.bestSeason || "",
        facilities: formData.facilities || [],
        image: formData.image || "/placeholder.svg?height=200&width=300",
        rating: 0,
        lastClimbed: "",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setMountains((prev) => [...prev, newMountain])
    }

    setIsDialogOpen(false)
    setEditingMountain(null)
    setFormData({})
  }

  const handleEdit = (mountain: MountainInfo) => {
    setEditingMountain(mountain)
    setFormData(mountain)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setMountains((prev) => prev.filter((m) => m.id !== id))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Pemula":
        return "bg-green-600"
      case "Menengah":
        return "bg-yellow-600"
      case "Sulit":
        return "bg-orange-600"
      case "Ekstrem":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

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
                <Mountain className="h-6 w-6 text-white" />
                <div className="flex items-center">
                  <span className="text-xl font-bold text-white">Informasi Gunung</span>
                  <span className="mx-2 text-white/50">|</span>
                  <p className="text-sm text-white/70">Kelola Info Pendakian</p>
                </div>
              </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Info Gunung
                </Button>
              </DialogTrigger>
              <DialogContent className="backdrop-blur-md bg-black/80 border-white/20 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingMountain ? "Edit" : "Tambah"} Informasi Gunung</DialogTitle>
                  <DialogDescription className="text-white/60">
                    {editingMountain ? "Perbarui" : "Tambahkan"} informasi gunung untuk panduan pendaki
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white/80">Nama Gunung</label>
                      <Input
                        value={formData.name || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                        placeholder="Contoh: Gunung Merapi"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/80">Lokasi</label>
                      <Input
                        value={formData.location || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                        placeholder="Contoh: Yogyakarta & Jawa Tengah"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white/80">Ketinggian (mdpl)</label>
                      <Input
                        type="number"
                        value={formData.height || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, height: Number.parseInt(e.target.value) }))}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                        placeholder="2930"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/80">Tingkat Kesulitan</label>
                      <Select
                        value={formData.difficulty}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, difficulty: value as any }))}
                      >
                        <SelectTrigger className="backdrop-blur-sm bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Pilih tingkat kesulitan" />
                        </SelectTrigger>
                        <SelectContent className="backdrop-blur-md bg-black/80 border-white/20">
                          <SelectItem value="Pemula">Pemula</SelectItem>
                          <SelectItem value="Menengah">Menengah</SelectItem>
                          <SelectItem value="Sulit">Sulit</SelectItem>
                          <SelectItem value="Ekstrem">Ekstrem</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white/80">Estimasi Waktu</label>
                      <Input
                        value={formData.estimatedTime || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, estimatedTime: e.target.value }))}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                        placeholder="6-8 jam"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/80">Suhu</label>
                      <Input
                        value={formData.temperature || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, temperature: e.target.value }))}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                        placeholder="15-25°C"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/80">Musim Terbaik</label>
                    <Input
                      value={formData.bestSeason || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bestSeason: e.target.value }))}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                      placeholder="April - Oktober (musim kering)"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/80">Deskripsi</label>
                    <Textarea
                      value={formData.description || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                      placeholder="Deskripsi lengkap tentang gunung..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/80">Tips Pendakian (pisahkan dengan koma)</label>
                    <Textarea
                      value={formData.tips?.join(", ") || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          tips: e.target.value.split(", ").filter((tip) => tip.trim()),
                        }))
                      }
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                      placeholder="Bawa masker, Mulai dini hari, Perhatikan status gunung"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/80">Fasilitas (pisahkan dengan koma)</label>
                    <Input
                      value={formData.facilities?.join(", ") || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          facilities: e.target.value.split(", ").filter((f) => f.trim()),
                        }))
                      }
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                      placeholder="Pos pendakian, Toilet, Warung, Parkir"
                    />
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
                      {editingMountain ? "Update" : "Tambah"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Total Gunung</CardTitle>
                <Mountain className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mountains.length}</div>
                <p className="text-xs text-white/60">Informasi tersedia</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Tingkat Pemula</CardTitle>
                <Users className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {mountains.filter((m) => m.difficulty === "Pemula").length}
                </div>
                <p className="text-xs text-white/60">Cocok untuk pemula</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Rating Tertinggi</CardTitle>
                <Star className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {Math.max(...mountains.map((m) => m.rating)).toFixed(1)}
                </div>
                <p className="text-xs text-white/60">Dari pendaki</p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/80">Update Terakhir</CardTitle>
                <Calendar className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">Hari ini</div>
                <p className="text-xs text-white/60">Info terbaru</p>
              </CardContent>
            </Card>
          </div>

          {/* Mountain Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mountains.map((mountain) => (
              <Card key={mountain.id} className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Mountain className="h-5 w-5" />
                        {mountain.name}
                      </CardTitle>
                      <CardDescription className="text-white/60 flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {mountain.location}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(mountain)}
                        className="text-white hover:bg-white/20 backdrop-blur-sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(mountain.id)}
                        className="text-red-400 hover:bg-red-500/20 backdrop-blur-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Mountain Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-white/80">
                      <Ruler className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">{mountain.height.toLocaleString()} mdpl</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Clock className="h-4 w-4 text-green-400" />
                      <span className="text-sm">{mountain.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Thermometer className="h-4 w-4 text-orange-400" />
                      <span className="text-sm">{mountain.temperature}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(mountain.difficulty)}>{mountain.difficulty}</Badge>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed">{mountain.description}</p>

                  {/* Best Season */}
                  <div className="backdrop-blur-sm bg-white/5 p-3 rounded-lg">
                    <p className="text-white/80 text-sm">
                      <strong>Musim Terbaik:</strong> {mountain.bestSeason}
                    </p>
                  </div>

                  {/* Tips */}
                  {mountain.tips.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        Tips Pendakian
                      </h4>
                      <ul className="space-y-1">
                        {mountain.tips.slice(0, 3).map((tip, index) => (
                          <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                        {mountain.tips.length > 3 && (
                          <li className="text-white/50 text-sm">+{mountain.tips.length - 3} tips lainnya...</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Facilities */}
                  {mountain.facilities.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Fasilitas</h4>
                      <div className="flex flex-wrap gap-2">
                        {mountain.facilities.map((facility, index) => (
                          <Badge key={index} variant="outline" className="border-white/20 text-white/70">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rating & Last Climbed */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white/80 text-sm">{mountain.rating.toFixed(1)}</span>
                    </div>
                    {mountain.lastClimbed && (
                      <span className="text-white/60 text-sm">
                        Terakhir didaki: {new Date(mountain.lastClimbed).toLocaleDateString("id-ID")}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {mountains.length === 0 && (
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardContent className="text-center py-12">
                <Mountain className="h-12 w-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Belum ada informasi gunung</p>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Info Gunung Pertama
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminSidebar>
  )
}
