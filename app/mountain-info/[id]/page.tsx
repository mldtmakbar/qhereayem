"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Mountain,
  MapPin,
  Ruler,
  Thermometer,
  Clock,
  AlertTriangle,
  Star,
  ArrowLeft,
  Calendar,
  Users,
  Camera,
  Info,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

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
  detailedDescription?: string
  route?: string[]
  equipment?: string[]
  warnings?: string[]
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
    description: "Gunung berapi aktif yang terkenal dengan pemandangan sunrise yang spektakuler.",
    detailedDescription:
      "Gunung Merapi adalah salah satu gunung berapi paling aktif di Indonesia dan dunia. Terletak di perbatasan Provinsi Daerah Istimewa Yogyakarta dan Jawa Tengah, gunung ini menawarkan pengalaman pendakian yang menantang dengan pemandangan yang luar biasa. Jalur pendakian utama dimulai dari Selo, Boyolali, dan memakan waktu sekitar 6-8 jam untuk mencapai puncak. Pendaki akan melewati medan yang bervariasi, mulai dari hutan tropis, padang rumput, hingga area berbatu vulkanik.",
    tips: [
      "Bawa masker untuk melindungi dari debu vulkanik",
      "Mulai pendakian dini hari untuk menghindari panas",
      "Perhatikan status aktivitas gunung sebelum mendaki",
      "Bawa air yang cukup karena tidak ada sumber air di jalur",
      "Gunakan sepatu hiking yang kuat untuk medan berbatu",
      "Bawa jaket tebal untuk suhu dingin di puncak",
    ],
    route: [
      "Basecamp Selo (1.500 mdpl)",
      "Pos 1 - Pasar Bubrah (2.000 mdpl)",
      "Pos 2 - New Selo (2.200 mdpl)",
      "Pos 3 - Sabana 1 (2.400 mdpl)",
      "Pos 4 - Sabana 2 (2.600 mdpl)",
      "Puncak Merapi (2.930 mdpl)",
    ],
    equipment: [
      "Sepatu hiking/trekking",
      "Jaket tebal/windbreaker",
      "Masker debu",
      "Headlamp + baterai cadangan",
      "Air minum minimal 3 liter",
      "Makanan ringan/energy bar",
      "Sarung tangan",
      "Kacamata hitam",
      "Sunblock",
      "P3K pribadi",
    ],
    warnings: [
      "Selalu cek status aktivitas gunung di PVMBG",
      "Dilarang mendaki saat status Waspada atau Alert",
      "Waspada gas beracun di area kawah",
      "Cuaca dapat berubah drastis",
      "Jalur licin saat hujan",
    ],
    bestSeason: "April - Oktober (musim kering)",
    facilities: ["Pos pendakian", "Toilet", "Warung", "Parkir"],
    image: "/placeholder.svg?height=400&width=600",
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
    description: "Gunung dengan savana yang indah dan pemandangan 360 derajat.",
    detailedDescription:
      "Gunung Merbabu menawarkan pengalaman pendakian yang berbeda dengan savana luas yang memukau. Terletak di Jawa Tengah, gunung ini memiliki ketinggian 3.145 mdpl dan menawarkan pemandangan 360 derajat yang spektakuler. Jalur pendakian melewati hutan pinus yang rindang, padang savana yang luas, dan puncak yang memberikan panorama pegunungan Jawa Tengah yang menakjubkan.",
    tips: [
      "Bawa jaket tebal karena suhu dingin di puncak",
      "Siapkan tenda yang kuat untuk camping",
      "Bawa headlamp dengan baterai cadangan",
      "Perhatikan cuaca karena sering berkabut",
      "Bawa sleeping bag dengan rating suhu rendah",
      "Siapkan makanan yang cukup untuk perjalanan panjang",
    ],
    route: [
      "Basecamp Wekas (1.200 mdpl)",
      "Pos 1 - Warung Bandrek (1.500 mdpl)",
      "Pos 2 - Sabana 1 (2.000 mdpl)",
      "Pos 3 - Sabana 2 (2.400 mdpl)",
      "Pos 4 - Sabana 3 (2.800 mdpl)",
      "Puncak Kenteng Songo (3.145 mdpl)",
    ],
    equipment: [
      "Tenda 4 season",
      "Sleeping bag suhu rendah",
      "Matras/sleeping pad",
      "Kompor portable + gas",
      "Peralatan masak ringan",
      "Jaket down/bulu angsa",
      "Celana panjang hiking",
      "Sepatu hiking waterproof",
      "Rain cover/ponco",
      "Air minum 4-5 liter",
    ],
    warnings: [
      "Suhu sangat dingin di malam hari (bisa 0°C)",
      "Angin kencang di area savana",
      "Kabut tebal dapat turun tiba-tiba",
      "Jalur mudah tersesat saat berkabut",
      "Tidak ada sumber air di jalur atas",
    ],
    bestSeason: "Mei - September",
    facilities: ["Basecamp", "Toilet", "Sumber air", "Parkir"],
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.7,
    lastClimbed: "2024-01-20",
    createdAt: "2024-01-02",
  },
]

export default function MountainDetailPage() {
  const params = useParams()
  const [mountain, setMountain] = useState<MountainInfo | null>(null)

  useEffect(() => {
    const mountainData = mockMountainData.find((m) => m.id === params.id)
    setMountain(mountainData || null)
  }, [params.id])

  if (!mountain) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
          <CardContent className="text-center py-12">
            <Mountain className="h-12 w-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/60">Informasi gunung tidak ditemukan</p>
          </CardContent>
        </Card>
      </div>
    )
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/mountain-info">
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Mountain className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">{mountain.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg mb-8">
          <CardContent className="p-0">
            <div className="aspect-video relative rounded-t-lg overflow-hidden">
              <Image src={mountain.image || "/placeholder.svg"} alt={mountain.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{mountain.name}</h1>
                    <p className="text-white/80 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {mountain.location}
                    </p>
                  </div>
                  <Badge className={getDifficultyColor(mountain.difficulty)} size="lg">
                    {mountain.difficulty}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Deskripsi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed">{mountain.detailedDescription || mountain.description}</p>
              </CardContent>
            </Card>

            {/* Route */}
            {mountain.route && (
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Mountain className="h-5 w-5" />
                    Jalur Pendakian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mountain.route.map((point, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{point}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Equipment */}
            {mountain.equipment && (
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Peralatan yang Dibutuhkan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {mountain.equipment.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-white/80 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  Tips Pendakian
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mountain.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <p className="text-white/80 text-sm leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Warnings */}
            {mountain.warnings && (
              <Card className="backdrop-blur-md bg-red-500/10 border border-red-500/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Peringatan Penting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mountain.warnings.map((warning, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-red-400 mt-1">⚠</span>
                        <p className="text-red-200 text-sm leading-relaxed">{warning}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Informasi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-blue-400" />
                    <span className="text-white/80 text-sm">Ketinggian</span>
                  </div>
                  <span className="text-white font-medium">{mountain.height.toLocaleString()} mdpl</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-400" />
                    <span className="text-white/80 text-sm">Estimasi Waktu</span>
                  </div>
                  <span className="text-white font-medium">{mountain.estimatedTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-orange-400" />
                    <span className="text-white/80 text-sm">Suhu</span>
                  </div>
                  <span className="text-white font-medium">{mountain.temperature}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-white/80 text-sm">Rating</span>
                  </div>
                  <span className="text-white font-medium">{mountain.rating.toFixed(1)}/5</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-400" />
                    <span className="text-white/80 text-sm">Musim Terbaik</span>
                  </div>
                </div>
                <p className="text-white/70 text-sm">{mountain.bestSeason}</p>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Fasilitas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mountain.facilities.map((facility, index) => (
                    <Badge key={index} variant="outline" className="border-white/20 text-white/70 mr-2 mb-2">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/collections">
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Sewa Peralatan
                </Button>
              </Link>
              <Link href="/dashboard/packages">
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/20 bg-transparent backdrop-blur-sm"
                >
                  <Mountain className="h-4 w-4 mr-2" />
                  Lihat Paket Adventure
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
