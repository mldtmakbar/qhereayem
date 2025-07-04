"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Mountain,
  MapPin,
  Ruler,
  Thermometer,
  Clock,
  AlertTriangle,
  Star,
  Search,
  Filter,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

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
  {
    id: "3",
    name: "Gunung Semeru",
    location: "Jawa Timur",
    height: 3676,
    difficulty: "Sulit",
    estimatedTime: "3-4 hari",
    temperature: "5-15°C",
    description:
      "Gunung tertinggi di Pulau Jawa dengan pemandangan yang menakjubkan. Jalur pendakian sangat menantang dan memerlukan persiapan yang matang.",
    tips: [
      "Persiapan fisik yang baik sangat diperlukan",
      "Bawa peralatan camping lengkap",
      "Perhatikan cuaca dan kondisi jalur",
      "Daftar ke pos pendakian sebelum mendaki",
    ],
    bestSeason: "April - Oktober",
    facilities: ["Pos pendakian", "Shelter", "Sumber air terbatas"],
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    lastClimbed: "2024-01-10",
    createdAt: "2024-01-03",
  },
]

export default function MountainInfoPage() {
  const [mountains, setMountains] = useState<MountainInfo[]>(mockMountainData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const router = useRouter()

  const filteredMountains = mountains.filter((mountain) => {
    const matchesSearch =
      mountain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mountain.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === "all" || mountain.difficulty === selectedDifficulty
    return matchesSearch && matchesDifficulty
  })

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
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Mountain className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">Informasi Gunung</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
              <Input
                placeholder="Cari gunung atau lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/60" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="backdrop-blur-sm bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
              >
                <option value="all">Semua Tingkat</option>
                <option value="Pemula">Pemula</option>
                <option value="Menengah">Menengah</option>
                <option value="Sulit">Sulit</option>
                <option value="Ekstrem">Ekstrem</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mountain Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMountains.map((mountain) => (
            <Card key={mountain.id} className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <CardHeader>
                <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                  <Image src={mountain.image || "/placeholder.svg"} alt={mountain.name} fill className="object-cover" />
                </div>
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
                  <Badge className={getDifficultyColor(mountain.difficulty)}>{mountain.difficulty}</Badge>
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
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white/80 text-sm">{mountain.rating.toFixed(1)}</span>
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

                {/* Tips Preview */}
                {mountain.tips.length > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      Tips Pendakian
                    </h4>
                    <ul className="space-y-1">
                      {mountain.tips.slice(0, 2).map((tip, index) => (
                        <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                      {mountain.tips.length > 2 && (
                        <li className="text-white/50 text-sm">+{mountain.tips.length - 2} tips lainnya...</li>
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

                {/* Action Button */}
                <div className="pt-2 border-t border-white/10">
                  <Link href={`/mountain-info/${mountain.id}`}>
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                      Lihat Detail Lengkap
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMountains.length === 0 && (
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <CardContent className="text-center py-12">
              <Mountain className="h-12 w-12 text-white/40 mx-auto mb-4" />
              <p className="text-white/60 mb-4">Tidak ada gunung yang ditemukan</p>
              <p className="text-white/50 text-sm">Coba ubah kata kunci pencarian atau filter</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
