"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mountain, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Aurora from "@/components/Aurora"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      if (email === "admin@qhereayem.com" && password === "admin123") {
        localStorage.setItem("userRole", "admin")
        router.push("/admin")
      } else if (email && password) {
        localStorage.setItem("userRole", "user")
        router.push("/dashboard")
      } else {
        alert("Email dan password harus diisi!")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#1e3a8a", "#3b82f6", "#8b5cf6"]} blend={0.3} amplitude={0.8} speed={0.3} />
      </div>

      {/* Back Button */}
      <Link href="/" className="absolute top-4 left-4 z-20">
        <Button variant="ghost" className="text-white hover:bg-white/10 backdrop-blur-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </Link>

      <Card className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 shadow-lg relative z-10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mountain className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">®QHERE AYEM OUTDOOR</span>
          </div>
          <CardTitle className="text-2xl text-white">Masuk ke Akun</CardTitle>
          <CardDescription className="text-white/70">
            Masukkan email dan password untuk mengakses dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-white/50"
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-white/70 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Belum punya akun?{" "}
              <Link href="/register" className="text-white hover:underline">
                Daftar di sini
              </Link>
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="mt-6 p-4 backdrop-blur-sm bg-white/10 rounded-lg border border-white/20">
            <p className="text-white font-semibold mb-2">Demo Accounts:</p>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-white/80">Admin:</p>
                <p className="text-white/60">admin@qhereayem.com / admin123</p>
              </div>
              <div>
                <p className="text-white/80">User:</p>
                <p className="text-white/60">user@example.com / password123</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
