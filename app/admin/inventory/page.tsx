"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mountain, ArrowLeft, Search, Plus, Edit, Trash2, Package } from "lucide-react"
import Link from "next/link"
import AdminSidebar from "@/components/AdminSidebar"
import Aurora from "@/components/Aurora"

const initialProducts = [
  // Rental Items
  {
    id: 1,
    name: "Tenda Dome 4 Orang",
    price: 75000,
    stock: 5,
    category: "Tenda",
    type: "rental",
    image: "/placeholder.svg?height=200&width=200",
    description: "Tenda berkualitas untuk 4 orang",
    rented: 2,
  },
  {
    id: 2,
    name: "Carrier 60L",
    price: 50000,
    stock: 8,
    category: "Tas",
    type: "rental",
    image: "/placeholder.svg?height=200&width=200",
    description: "Tas carrier kapasitas 60 liter",
    rented: 1,
  },
  {
    id: 3,
    name: "Sleeping Bag",
    price: 25000,
    stock: 12,
    category: "Sleeping",
    type: "rental",
    image: "/placeholder.svg?height=200&width=200",
    description: "Sleeping bag hangat dan nyaman",
    rented: 3,
  },
  // Sale Items
  {
    id: 4,
    name: "Air Mineral 1.5L",
    price: 5000,
    stock: 50,
    category: "Minuman",
    type: "sale",
    image: "/placeholder.svg?height=200&width=200",
    description: "Air mineral kemasan 1.5 liter",
    sold: 25,
  },
  {
    id: 5,
    name: "Jas Hujan",
    price: 50000,
    stock: 15,
    category: "Pakaian",
    type: "sale",
    image: "/placeholder.svg?height=200&width=200",
    description: "Jas hujan berkualitas",
    sold: 8,
  },
  {
    id: 6,
    name: "Gelas Plastik",
    price: 5000,
    stock: 30,
    category: "Aksesoris",
    type: "sale",
    image: "/placeholder.svg?height=200&width=200",
    description: "Gelas plastik untuk camping",
    sold: 12,
  },
]

export default function AdminInventoryPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [selectedType, setSelectedType] = useState("Semua")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    type: "rental",
    description: "",
  })

  const categories = ["Semua", ...Array.from(new Set(products.map((p) => p.category)))]
  const types = ["Semua", "rental", "sale"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Semua" || product.category === selectedCategory
    const matchesType = selectedType === "Semua" || product.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      alert("Mohon lengkapi semua field")
      return
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: Number.parseInt(formData.price),
      stock: Number.parseInt(formData.stock),
      category: formData.category,
      type: formData.type,
      description: formData.description,
      image: "/placeholder.svg?height=200&width=200",
      rented: 0,
      sold: 0,
    }

    setProducts([...products, newProduct])
    setFormData({ name: "", price: "", stock: "", category: "", type: "rental", description: "" })
    setIsAddDialogOpen(false)
  }

  const handleEditProduct = () => {
    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      alert("Mohon lengkapi semua field")
      return
    }

    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id
        ? {
            ...product,
            name: formData.name,
            price: Number.parseInt(formData.price),
            stock: Number.parseInt(formData.stock),
            category: formData.category,
            type: formData.type,
            description: formData.description,
          }
        : product,
    )

    setProducts(updatedProducts)
    setEditingProduct(null)
    setFormData({ name: "", price: "", stock: "", category: "", type: "rental", description: "" })
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      setProducts(products.filter((product) => product.id !== id))
    }
  }

  const openEditDialog = (product: any) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      type: product.type,
      description: product.description,
    })
  }

  const resetForm = () => {
    setFormData({ name: "", price: "", stock: "", category: "", type: "rental", description: "" })
    setEditingProduct(null)
  }

  return (
    <AdminSidebar>
      <div className="min-h-screen relative">
        <Aurora />

        {/* Header */}
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Mountain className="h-6 w-6 text-white" />
              <span className="text-lg font-bold text-white">Kelola Inventori</span>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Search, Filter, and Add Button */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type === "Semua" ? "Semua Tipe" : type === "rental" ? "Sewa" : "Jual"}
                </option>
              ))}
            </select>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Produk
                </Button>
              </DialogTrigger>
              <DialogContent className="backdrop-blur-md bg-black/80 border-white/20 text-white">
                <DialogHeader>
                  <DialogTitle>Tambah Produk Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Produk</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Tipe Produk</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white"
                    >
                      <option value="rental">Sewa</option>
                      <option value="sale">Jual</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">{formData.type === "rental" ? "Harga/Hari" : "Harga Jual"}</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stok</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="category">Kategori</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Deskripsi</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddProduct} className="bg-white/20 hover:bg-white/30 text-white">
                      Tambah
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        resetForm()
                        setIsAddDialogOpen(false)
                      }}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <CardContent className="p-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-white">{product.name}</h3>
                      <div className="flex gap-1">
                        <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                          {product.category}
                        </Badge>
                        <Badge
                          className={`text-xs ${
                            product.type === "rental" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
                          }`}
                        >
                          {product.type === "rental" ? "SEWA" : "JUAL"}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <p className="text-white font-bold">
                        Rp {product.price.toLocaleString()}
                        {product.type === "rental" ? "/hari" : ""}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="backdrop-blur-sm bg-white/5 p-2 rounded">
                        <p className="text-gray-400">Stok Tersedia</p>
                        <p className="text-white font-semibold">{product.stock}</p>
                      </div>
                      <div className="backdrop-blur-sm bg-white/5 p-2 rounded">
                        <p className="text-gray-400">{product.type === "rental" ? "Sedang Disewa" : "Terjual"}</p>
                        <p className="text-yellow-400 font-semibold">
                          {product.type === "rental" ? product.rented : product.sold}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => openEditDialog(product)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-white/20 text-white hover:bg-white/10"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteProduct(product.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Tidak ada produk ditemukan</p>
            </div>
          )}

          {/* Edit Dialog */}
          <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
            <DialogContent className="backdrop-blur-md bg-black/80 border-white/20 text-white">
              <DialogHeader>
                <DialogTitle>Edit Produk</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">Nama Produk</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-type">Tipe Produk</Label>
                  <select
                    id="edit-type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white"
                  >
                    <option value="rental">Sewa</option>
                    <option value="sale">Jual</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-price">{formData.type === "rental" ? "Harga/Hari" : "Harga Jual"}</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-stock">Stok</Label>
                    <Input
                      id="edit-stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-category">Kategori</Label>
                  <Input
                    id="edit-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">Deskripsi</Label>
                  <Input
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="backdrop-blur-sm bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleEditProduct} className="bg-white/20 hover:bg-white/30 text-white">
                    Simpan
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetForm()
                      setEditingProduct(null)
                    }}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Batal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AdminSidebar>
  )
}
