"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mountain,
  Tent,
  Backpack,
  Compass,
  Star,
  MapPin,
  Clock,
  Thermometer,
  Users,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Send,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import GooeyNav from "@/components/GooeyNav"
import Aurora from "@/components/Aurora"

const mountainInfo = [
  {
    id: "1",
    name: "Gunung Merapi",
    location: "Yogyakarta & Jawa Tengah",
    height: 2930,
    difficulty: "Menengah",
    estimatedTime: "6-8 jam",
    temperature: "15-25°C",
    description: "Gunung berapi aktif yang terkenal dengan pemandangan sunrise yang spektakuler.",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
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
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Gunung Semeru",
    location: "Jawa Timur",
    height: 3676,
    difficulty: "Sulit",
    estimatedTime: "3-4 hari",
    temperature: "5-15°C",
    description: "Gunung tertinggi di Pulau Jawa dengan pemandangan yang menakjubkan.",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const navItems = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang", href: "#about" },
  { label: "Koleksi", href: "#collections" },
  { label: "Info Gunung", href: "#mountain-info" },
  { label: "Kontak", href: "#contact" },
]

export default function LandingPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle contact form submission
    console.log("Contact form submitted:", contactForm)
    setContactForm({ name: "", email: "", message: "" })
    alert("Pesan Anda telah terkirim!")
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
    <div className="min-h-screen relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} blend={0.5} amplitude={1.0} speed={0.5} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src="/images/logo-new.png" alt="Logo" width={40} height={40} />
                <span className="text-xl font-bold text-white">®QHERE AYEM OUTDOOR</span>
              </div>
              <div className="hidden md:block">
                <GooeyNav
                  items={navItems}
                  particleCount={15}
                  particleDistances={[90, 10]}
                  particleR={100}
                  initialActiveIndex={0}
                  animationTime={600}
                  timeVariance={300}
                  colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />
              </div>
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">Daftar</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-20 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Petualangan Dimulai
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Dari Sini
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Sewa peralatan gunung berkualitas tinggi untuk petualangan tak terlupakan. Dari tenda hingga carrier,
                kami menyediakan semua yang Anda butuhkan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/collections">
                  <Button
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20"
                  >
                    <Tent className="mr-2 h-5 w-5" />
                    Lihat Koleksi SEWA
                  </Button>
                </Link>
                <Link href="/dashboard/packages">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/20 bg-transparent backdrop-blur-md"
                  >
                    <Mountain className="mr-2 h-5 w-5" />
                    Paket Adventure
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Tentang Kami</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                ®QHERE AYEM OUTDOOR adalah penyedia layanan sewa peralatan gunung terpercaya yang telah melayani para
                petualang selama bertahun-tahun.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader className="text-center">
                  <Tent className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-white">Peralatan Berkualitas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center">
                    Semua peralatan kami dipilih dengan teliti dan dirawat dengan baik untuk memastikan keamanan dan
                    kenyamanan petualangan Anda.
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <CardTitle className="text-white">Tim Berpengalaman</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center">
                    Tim kami terdiri dari para pendaki berpengalaman yang siap memberikan saran dan panduan untuk
                    petualangan Anda.
                  </p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader className="text-center">
                  <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <CardTitle className="text-white">Layanan Terbaik</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center">
                    Kami berkomitmen memberikan layanan terbaik dengan harga yang kompetitif dan proses sewa yang mudah
                    dan cepat.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Collections Preview */}
        <section id="collections" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Koleksi SEWA Kami</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Berbagai peralatan gunung berkualitas tinggi siap menemani petualangan Anda
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader className="text-center">
                  <Tent className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <CardTitle className="text-white text-lg">Tenda</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/70 text-sm">Tenda berkualitas untuk berbagai cuaca</p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader className="text-center">
                  <Backpack className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <CardTitle className="text-white text-lg">Carrier</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/70 text-sm">Tas gunung dengan kapasitas besar</p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader className="text-center">
                  <Compass className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <CardTitle className="text-white text-lg">Navigasi</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/70 text-sm">Peralatan navigasi dan orientasi</p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader className="text-center">
                  <Mountain className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <CardTitle className="text-white text-lg">Climbing</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/70 text-sm">Peralatan panjat tebing dan via ferrata</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/collections">
                <Button
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20"
                >
                  Lihat Semua Koleksi
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Mountain Info Section */}
        <section id="mountain-info" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Informasi Gunung</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Panduan lengkap untuk petualangan mendaki gunung di Indonesia
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {mountainInfo.map((mountain) => (
                <Card key={mountain.id} className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                  <CardHeader>
                    <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={mountain.image || "/placeholder.svg"}
                        alt={mountain.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Mountain className="h-5 w-5" />
                      {mountain.name}
                    </CardTitle>
                    <CardDescription className="text-white/60 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {mountain.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-white/80">
                        <Mountain className="h-4 w-4 text-blue-400" />
                        <span>{mountain.height.toLocaleString()} mdpl</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="h-4 w-4 text-green-400" />
                        <span>{mountain.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Thermometer className="h-4 w-4 text-orange-400" />
                        <span>{mountain.temperature}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(mountain.difficulty)}>{mountain.difficulty}</Badge>
                      </div>
                    </div>

                    <p className="text-white/70 text-sm leading-relaxed">{mountain.description}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white/80 text-sm">{mountain.rating.toFixed(1)}</span>
                      </div>
                      <Link href={`/mountain-info/${mountain.id}`}>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm">
                          Lihat Detail
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/mountain-info">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/20 bg-transparent backdrop-blur-md"
                >
                  <Mountain className="mr-2 h-5 w-5" />
                  Lihat Semua Info Gunung
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Hubungi Kami</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Ada pertanyaan atau butuh bantuan? Jangan ragu untuk menghubungi kami
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Phone className="h-6 w-6 text-blue-400" />
                      <div>
                        <h3 className="text-white font-medium">Telepon</h3>
                        <p className="text-white/70">+62 812-3456-7890</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <Mail className="h-6 w-6 text-green-400" />
                      <div>
                        <h3 className="text-white font-medium">Email</h3>
                        <p className="text-white/70">info@qhereayem.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin className="h-6 w-6 text-red-400" />
                      <div>
                        <h3 className="text-white font-medium">Alamat</h3>
                        <p className="text-white/70">Jl. Petualangan No. 123, Yogyakarta</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-white font-medium mb-4">Ikuti Kami</h3>
                    <div className="flex gap-4">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm">
                        <Instagram className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm">
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">Kirim Pesan</CardTitle>
                  <CardDescription className="text-white/60">
                    Kami akan merespons pesan Anda dalam 24 jam
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Nama Anda"
                        value={contactForm.name}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email Anda"
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Pesan Anda"
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                      <Send className="h-4 w-4 mr-2" />
                      Kirim Pesan
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer with GooeyNav Animation */}
        <footer className="py-16 px-4 border-t border-white/10">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Image src="/images/logo-new.png" alt="Logo" width={40} height={40} />
                <span className="text-2xl font-bold text-white">®QHERE AYEM OUTDOOR</span>
              </div>
              <p className="text-white/70 max-w-md mx-auto">
                Petualangan terbaik dimulai dengan persiapan yang tepat. Percayakan kebutuhan peralatan gunung Anda
                kepada kami.
              </p>
            </div>

            {/* Animated Footer Navigation */}
            <div className="flex justify-center mb-8" style={{ height: "100px" }}>
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

            <div className="text-center text-white/60 text-sm">
              <p>&copy; 2024 ®QHERE AYEM OUTDOOR. Semua hak dilindungi.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
