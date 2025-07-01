"use client";

import { useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FaCartArrowDown } from "react-icons/fa6";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Mock data for categories and brands (keeping these as static for now)
const categories = [
  { id: 1, name: "SMARTPHONE", image: "/placeholder.svg?height=80&width=80" },
  { id: 2, name: "DESKTOP PC", image: "/placeholder.svg?height=80&width=80" },
  { id: 3, name: "BAREBONE", image: "/placeholder.svg?height=80&width=80" },
  {
    id: 4,
    name: "GAMING CASING",
    image: "/placeholder.svg?height=80&width=80",
  },
  { id: 5, name: "FAN KIT", image: "/placeholder.svg?height=80&width=80" },
  { id: 6, name: "CPU COOLER", image: "/placeholder.svg?height=80&width=80" },
  { id: 7, name: "HEADPHONE", image: "/placeholder.svg?height=80&width=80" },
  { id: 8, name: "FAN", image: "/placeholder.svg?height=80&width=80" },
  { id: 9, name: "HEADPHONES", image: "/placeholder.svg?height=80&width=80" },
  {
    id: 10,
    name: "LIQUID COOLER",
    image: "/placeholder.svg?height=80&width=80",
  },
  { id: 11, name: "CABLES", image: "/placeholder.svg?height=80&width=80" },
  { id: 12, name: "NVME", image: "/placeholder.svg?height=80&width=80" },
];

const brands = [
  { id: 1, name: "PREMIER", image: "/placeholder.svg?height=80&width=80" },
  { id: 2, name: "AMD", image: "/placeholder.svg?height=80&width=80" },
  { id: 3, name: "WD", image: "/placeholder.svg?height=80&width=80" },
  { id: 4, name: "FOCAL", image: "/placeholder.svg?height=80&width=80" },
  { id: 5, name: "DAHUA", image: "/placeholder.svg?height=80&width=80" },
  { id: 6, name: "LOGITECH", image: "/placeholder.svg?height=80&width=80" },
  { id: 7, name: "NVIDIA", image: "/placeholder.svg?height=80&width=80" },
  { id: 8, name: "THERMALTAKE", image: "/placeholder.svg?height=80&width=80" },
  {
    id: 9,
    name: "CHINESE BRAND",
    image: "/placeholder.svg?height=80&width=80",
  },
  { id: 10, name: "FOXCONN", image: "/placeholder.svg?height=80&width=80" },
  { id: 11, name: "BIOSTAR", image: "/placeholder.svg?height=80&width=80" },
  { id: 12, name: "PEGATRO", image: "/placeholder.svg?height=80&width=80" },
];

export default function EcommerceInventory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for API products
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
 

  // UI states

  const itemsPerView = 6;
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 500),
    []
  );
  useEffect(() => {
    debouncedSearch(searchInput);
    return () => debouncedSearch.cancel();
  }, [searchInput]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let endpoint = `/products?page=${currentPage}&limit=${itemsPerPage}`;

        // add search term to backend query
        if (searchTerm.trim()) {
          endpoint += `&search=${encodeURIComponent(searchTerm.trim())}`;
        }

        const response = await axiosInstance.get(endpoint);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setTotalProducts(
          response.data.totalProducts || response.data.products.length
        );
      } catch (error) {
        toast.error("Failed to fetch products ❌");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage, searchTerm]); // 👈 make sure `searchTerm` is added here

  // Filter products based on search, category, and brand
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.desc?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesBrand = !selectedBrand || product.brand === selectedBrand;
      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [products, searchTerm, selectedCategory, selectedBrand]);

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product._id);
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-64 bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold text-white opacity-20 mb-4">
            Mera Brand
          </div>
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-700">Inventory</h1>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-1 w-64"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Active Filters */}
        {(selectedCategory || selectedBrand || searchTerm) && (
          <div className="mb-6 flex items-center space-x-2">
            <span className="text-sm text-gray-600">Active filters:</span>

            {searchTerm && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setSearchTerm("")}
              >
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
              Products{" "}
              {totalProducts > 0 &&
                `(${totalProducts} total, ${filteredProducts.length} shown)`}
            </h2>
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching your criteria.
              </p>
              <Button onClick={clearFilters} className="mt-4">
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product._id}
                    className="group hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() =>
                      navigate(`/product/${product._id}`, {
                        state: { product },
                      })
                    }
                  >
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <div
                          className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(./men-1.jpg)`,
                          }}
                        >
                          {!product.image && (
                            <span className="text-gray-400 text-sm font-bold">
                              MB
                            </span>
                          )}
                        </div>
                        <Button
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-white-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                        >
                          <FaCartArrowDown className="h-4 w-4" />
                        </Button>
                        {product.actualprice && product.price && (
                          <div className="absolute top-2 left-2">
                            <span className="text-xs bg-green-200 p-1 rounded-lg">
                              {Math.round(
                                ((product.price - product.actualprice) /
                                  product.price) *
                                  100
                              )}
                              % off
                            </span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center space-x-2 mb-2">
                        {product.actualprice ? (
                          <>
                            <span className="line-through decoration-red-500 text-red-800 text-xs">
                              ${product.price}
                            </span>
                            <span className="text-orange-500 font-semibold text-sm">
                              ${product.actualprice}
                            </span>
                          </>
                        ) : (
                          <span className="text-orange-500 font-semibold text-sm">
                            ${product.price}
                          </span>
                        )}
                      </div>

                      {product.desc && (
                        <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                          {product.desc}
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap gap-1">
                        {product.category && (
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        )}
                        {product.brand && (
                          <Badge variant="outline" className="text-xs">
                            {product.brand}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8">
                <Pagination className="cursor-pointer">
                  <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      >
                        <span>Previous</span>
                      </PaginationPrevious>
                    </PaginationItem>

                    {/* First Page */}
                    <PaginationItem>
                      <PaginationLink
                        isActive={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                      >
                        <span>1</span>
                      </PaginationLink>
                    </PaginationItem>

                    {/* Dots before current if needed */}
                    {currentPage > 3 && (
                      <PaginationItem>
                        <span className="px-2">...</span>
                      </PaginationItem>
                    )}

                    {/* Current, previous, next */}
                    {[currentPage - 1, currentPage, currentPage + 1].map(
                      (page) => {
                        if (page > 1 && page < totalPages) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                isActive={currentPage === page}
                                onClick={() => setCurrentPage(page)}
                              >
                                <span>{page}</span>
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        return null;
                      }
                    )}

                    {/* Dots after current if needed */}
                    {currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <span className="px-2">...</span>
                      </PaginationItem>
                    )}

                    {/* Last Page */}
                    {totalPages > 1 && (
                      <PaginationItem>
                        <PaginationLink
                          isActive={currentPage === totalPages}
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          <span>{totalPages}</span>
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* Next Button */}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      >
                        <span>Next</span>
                      </PaginationNext>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
