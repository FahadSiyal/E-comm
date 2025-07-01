"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Home,
  Calendar,
  Bell,
  MapPin,
  User,
  ShoppingCart,
  ChevronDown,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data
const categories = [
  { id: 1, name: "SMARTPHONE", image: "/placeholder.svg?height=80&width=80" },
  { id: 2, name: "DESKTOP PC", image: "/placeholder.svg?height=80&width=80" },
  { id: 3, name: "BAREBONE", image: "/placeholder.svg?height=80&width=80" },
  { id: 4, name: "GAMING CASING", image: "/placeholder.svg?height=80&width=80" },
  { id: 5, name: "FAN KIT", image: "/placeholder.svg?height=80&width=80" },
  { id: 6, name: "CPU COOLER", image: "/placeholder.svg?height=80&width=80" },
  { id: 7, name: "HEADPHONE", image: "/placeholder.svg?height=80&width=80" },
  { id: 8, name: "FAN", image: "/placeholder.svg?height=80&width=80" },
  { id: 9, name: "HEADPHONES", image: "/placeholder.svg?height=80&width=80" },
  { id: 10, name: "LIQUID COOLER", image: "/placeholder.svg?height=80&width=80" },
  { id: 11, name: "CABLES", image: "/placeholder.svg?height=80&width=80" },
  { id: 12, name: "NVME", image: "/placeholder.svg?height=80&width=80" },
]

const brands = [
  { id: 1, name: "PREMIER", image: "/placeholder.svg?height=80&width=80" },
  { id: 2, name: "AMD", image: "/placeholder.svg?height=80&width=80" },
  { id: 3, name: "WD", image: "/placeholder.svg?height=80&width=80" },
  { id: 4, name: "FOCAL", image: "/placeholder.svg?height=80&width=80" },
  { id: 5, name: "DAHUA", image: "/placeholder.svg?height=80&width=80" },
  { id: 6, name: "LOGITECH", image: "/placeholder.svg?height=80&width=80" },
  { id: 7, name: "NVIDIA", image: "/placeholder.svg?height=80&width=80" },
  { id: 8, name: "THERMALTAKE", image: "/placeholder.svg?height=80&width=80" },
  { id: 9, name: "CHINESE BRAND", image: "/placeholder.svg?height=80&width=80" },
  { id: 10, name: "FOXCONN", image: "/placeholder.svg?height=80&width=80" },
  { id: 11, name: "BIOSTAR", image: "/placeholder.svg?height=80&width=80" },
  { id: 12, name: "PEGATRO", image: "/placeholder.svg?height=80&width=80" },
]

const products = [
  {
    id: 1,
    name: "panadol",
    price: 500,
    image: "/placeholder.svg?height=150&width=150",
    category: "SMARTPHONE",
    brand: "PREMIER",
  },
  {
    id: 2,
    name: "Samsung Galaxy S3",
    price: 20000,
    image: "/placeholder.svg?height=150&width=150",
    category: "SMARTPHONE",
    brand: "AMD",
  },
  {
    id: 3,
    name: "normal psu",
    price: 1000,
    image: "/placeholder.svg?height=150&width=150",
    category: "DESKTOP PC",
    brand: "WD",
  },
  {
    id: 4,
    name: "THINKVISION 24 L",
    price: 12000,
    image: "/placeholder.svg?height=150&width=150",
    category: "DESKTOP PC",
    brand: "FOCAL",
  },
  {
    id: 5,
    name: "NORMAL PSU",
    price: 1000,
    image: "/placeholder.svg?height=150&width=150",
    category: "DESKTOP PC",
    brand: "DAHUA",
  },
  {
    id: 6,
    name: "AMD FIRE PRO W210",
    price: 1,
    image: "/placeholder.svg?height=150&width=150",
    category: "GAMING CASING",
    brand: "AMD",
  },
  { id: 7, name: "500GB", price: 1, image: "/placeholder.svg?height=150&width=150", category: "NVME", brand: "WD" },
  {
    id: 8,
    name: "Gaming Headset Pro",
    price: 5500,
    image: "/placeholder.svg?height=150&width=150",
    category: "HEADPHONE",
    brand: "LOGITECH",
  },
  {
    id: 9,
    name: "RGB Gaming Fan",
    price: 2500,
    image: "/placeholder.svg?height=150&width=150",
    category: "FAN",
    brand: "THERMALTAKE",
  },
  {
    id: 10,
    name: "Liquid Cooler X1",
    price: 8500,
    image: "/placeholder.svg?height=150&width=150",
    category: "LIQUID COOLER",
    brand: "NVIDIA",
  },
]

export default function EcommerceInventory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [categoryStartIndex, setCategoryStartIndex] = useState(0)
  const [brandStartIndex, setBrandStartIndex] = useState(0)
  const [productStartIndex, setProductStartIndex] = useState(0)

  const itemsPerView = 6

  // Filter products based on search, category, and brand
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      const matchesBrand = !selectedBrand || product.brand === selectedBrand
      return matchesSearch && matchesCategory && matchesBrand
    })
  }, [searchTerm, selectedCategory, selectedBrand])

  const addToCart = (productId) => {
    setCartItems((prev) => [...prev, productId])
  }

  const clearFilters = () => {
    setSelectedCategory("")
    setSelectedBrand("")
    setSearchTerm("")
  }

  const visibleCategories = categories.slice(categoryStartIndex, categoryStartIndex + itemsPerView)
  const visibleBrands = brands.slice(brandStartIndex, brandStartIndex + itemsPerView)
  const visibleProducts = filteredProducts.slice(productStartIndex, productStartIndex + itemsPerView)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
   
      {/* Hero Banner */}
      <div className="relative h-64 bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold text-white opacity-20 mb-4">Mera Brand</div>
          <div className="flex items-center justify-center space-x-2">
         
            <h1 className="text-2xl font-bold text-gray-700">Inventory</h1>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <nav className="flex items-center space-x-4 text-sm text-gray-600">
            <button onClick={clearFilters} className="hover:text-gray-900">
              Home
            </button>
            <span>/</span>
            <button onClick={clearFilters} className="hover:text-gray-900">
              Products
            </button>
            <span>/</span>
            <span className="text-gray-900">About</span>
          </nav>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-1 w-64"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Categories Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCategoryStartIndex(Math.max(0, categoryStartIndex - itemsPerView))}
                disabled={categoryStartIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCategoryStartIndex(Math.min(categories.length - itemsPerView, categoryStartIndex + itemsPerView))
                }
                disabled={categoryStartIndex + itemsPerView >= categories.length}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {visibleCategories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedCategory === category.name ? "ring-2 ring-orange-500" : ""}`}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? "" : category.name)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-gray-400 text-xs font-bold">MB</span>
                  </div>
                  <p className="text-xs font-medium text-gray-700">{category.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Brands Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Brands</h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setBrandStartIndex(Math.max(0, brandStartIndex - itemsPerView))}
                disabled={brandStartIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setBrandStartIndex(Math.min(brands.length - itemsPerView, brandStartIndex + itemsPerView))
                }
                disabled={brandStartIndex + itemsPerView >= brands.length}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {visibleBrands.map((brand) => (
              <Card
                key={brand.id}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedBrand === brand.name ? "ring-2 ring-orange-500" : ""}`}
                onClick={() => setSelectedBrand(selectedBrand === brand.name ? "" : brand.name)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-gray-400 text-xs font-bold">MB</span>
                  </div>
                  <p className="text-xs font-medium text-gray-700">{brand.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Active Filters */}
        {(selectedCategory || selectedBrand || searchTerm) && (
          <div className="mb-6 flex items-center space-x-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedCategory && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("")}>
                Category: {selectedCategory} ×
              </Badge>
            )}
            {selectedBrand && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedBrand("")}>
                Brand: {selectedBrand} ×
              </Badge>
            )}
            {searchTerm && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchTerm("")}>
                Search: {searchTerm} ×
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}

        {/* Products Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Products {filteredProducts.length > 0 && `(${filteredProducts.length})`}
            </h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setProductStartIndex(Math.max(0, productStartIndex - itemsPerView))}
                disabled={productStartIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setProductStartIndex(
                    Math.min(filteredProducts.length - itemsPerView, productStartIndex + itemsPerView),
                  )
                }
                disabled={productStartIndex + itemsPerView >= filteredProducts.length}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <Button onClick={clearFilters} className="mt-4">
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {visibleProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-gray-400 text-sm font-bold">MB</span>
                      </div>
                      <Button
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => addToCart(product.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-orange-500 font-semibold">Rs.{product.price.toLocaleString()}</p>
                    <div className="mt-2 flex space-x-1">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>

    </div>
  )
}
