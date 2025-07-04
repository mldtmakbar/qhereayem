"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mountain, ArrowLeft, User, Mail, Phone, Calendar, Edit, Save, X, Instagram, MessageCircle } from "lucide-react"
import Link from "next/link"
import Aurora from "@/components/Aurora"
import GooeyNav from "@/components/GooeyNav"

const navItems = [
  { label: "Gear", href: "/dashboard" },
  { label: "Paket", href: "/dashboard/packages" },
  { label: "AI Chat", href: "/dashboard/chat" },
  { label: "Riwayat", href: "/dashboard/history" },
  { label: "Profil", href: "/dashboard/profile" },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "081234567890",
    joinDate: "2024-01-15",
    totalBookings: 5,
    totalSpent: 750000,
    socialMedia: {
      instagram: "",
      whatsapp: "",
    },
  })
  const [editForm, setEditForm] = useState(userProfile)
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (!userRole) {
      router.push("/login")
      return
    }

    // Load user profile from localStorage or API
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      setUserProfile(profile)
      setEditForm(profile)
    }
  }, [router])

  const handleSave = () => {
    setUserProfile(editForm)
    localStorage.setItem("userProfile", JSON.stringify(editForm))
    setIsEditing(false)
    alert("Profil berhasil diperbarui!")
  }

  const handleCancel = () => {
    setEditForm(userProfile)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#1e3a8a", "#3b82f6", "#8b5cf6"]} blend={0.3} amplitude={0.8} speed={0.3} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 backdrop-blur-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Mountain className="h-6 w-6 text-white" />
              <span className="text-lg font-bold text-white">®QHERE AYEM OUTDOOR</span>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <div className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <GooeyNav
                items={navItems}
                particleCount={12}
                particleDistances={[60, 8]}
                particleR={80}
                initialActiveIndex={4}
                animationTime={500}
                timeVariance={200}
                colors={[1, 2, 3, 4]}
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informasi Profil
                </CardTitle>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/20 bg-transparent backdrop-blur-sm"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-2" />
                      Simpan
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/20 bg-transparent backdrop-blur-sm"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Batal
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Nama Lengkap
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 backdrop-blur-sm bg-white/5 rounded-lg">
                      <User className="h-4 w-4 text-white/70" />
                      <span className="text-white">{userProfile.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 backdrop-blur-sm bg-white/5 rounded-lg">
                      <Mail className="h-4 w-4 text-white/70" />
                      <span className="text-white">{userProfile.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">
                    No. Telepon
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 backdrop-blur-sm bg-white/5 rounded-lg">
                      <Phone className="h-4 w-4 text-white/70" />
                      <span className="text-white">{userProfile.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-white">Tanggal Bergabung</Label>
                  <div className="flex items-center gap-2 p-3 backdrop-blur-sm bg-white/5 rounded-lg">
                    <Calendar className="h-4 w-4 text-white/70" />
                    <span className="text-white">{new Date(userProfile.joinDate).toLocaleDateString("id-ID")}</span>
                  </div>
                </div>

                {/* Social Media Section */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Akun Sosial Media</h3>

                  <div>
                    <Label htmlFor="instagram" className="text-white">
                      Instagram
                    </Label>
                    {isEditing ? (
                      <Input
                        id="instagram"
                        value={editForm.socialMedia.instagram}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            socialMedia: { ...editForm.socialMedia, instagram: e.target.value },
                          })
                        }
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                        placeholder="@username_instagram"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 backdrop-blur-sm bg-white/5 rounded-lg">
                        <Instagram className="h-4 w-4 text-pink-400" />
                        <span className="text-white">{userProfile.socialMedia.instagram || "Belum diisi"}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="whatsapp" className="text-white">
                      WhatsApp
                    </Label>
                    {isEditing ? (
                      <Input
                        id="whatsapp"
                        value={editForm.socialMedia.whatsapp}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            socialMedia: { ...editForm.socialMedia, whatsapp: e.target.value },
                          })
                        }
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                        placeholder="081234567890"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 backdrop-blur-sm bg-white/5 rounded-lg">
                        <MessageCircle className="h-4 w-4 text-green-400" />
                        <span className="text-white">{userProfile.socialMedia.whatsapp || "Belum diisi"}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{userProfile.totalBookings}</p>
                  <p className="text-white/70 text-sm">Total Booking</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">Rp {userProfile.totalSpent.toLocaleString()}</p>
                  <p className="text-white/70 text-sm">Total Spent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
