"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Mountain,
  BarChart3,
  Calendar,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  Receipt,
  FileText,
  Info,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react"

const adminMenuItems = [
  { href: "/admin", icon: Home, label: "Dashboard" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/admin/bookings", icon: Calendar, label: "Bookings" },
  { href: "/admin/inventory", icon: Package, label: "Inventory" },
  { href: "/admin/packages", icon: ShoppingCart, label: "Packages" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/cashier", icon: CreditCard, label: "Kasir" },
  { href: "/admin/expenses", icon: Receipt, label: "Expenses" },
  { href: "/admin/reports", icon: FileText, label: "Reports" },
  { href: "/admin/mountain-info", icon: Info, label: "Mountain Info" },
]

interface AdminSidebarProps {
  children: React.ReactNode
}

export default function AdminSidebar({ children }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 backdrop-blur-md bg-white/10 border-r border-white/20 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <Mountain className="h-6 w-6 text-white" />
                <span className="text-white font-bold text-sm">QHERE AYEM</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-white hover:bg-white/20"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {adminMenuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-white hover:bg-white/20 ${
                      isActive ? "bg-white/20" : ""
                    } ${isCollapsed ? "px-2" : "px-4"}`}
                  >
                    <item.icon className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/20">
          {!isCollapsed && <div className="text-xs text-white/60 text-center">Admin Panel v1.0</div>}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  )
}
