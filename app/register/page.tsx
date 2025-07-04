"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mountain, Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const router = useRouter()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!")
      return
    }
    // Simple demo registration
    localStorage.setItem("userRole", "user")
    router.push("/dashboard")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mountain className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">MountainGear</span>
          </div>
          <CardTitle className="text-white">Buat Akun Baru</CardTitle>
          <CardDescription className="text-gray-400">Daftar untuk mulai menyewa peralatan gunung</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Nama Lengkap
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">
                No. Telepon
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Konfirmasi Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Ulangi password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Daftar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-blue-400 hover:underline">
                Masuk sekarang
              </Link>
            </p>
            <Link href="/" className="text-blue-400 hover:underline text-sm">
              Kembali ke beranda
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
