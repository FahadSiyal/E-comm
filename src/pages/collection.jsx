"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { FaCartArrowDown } from "react-icons/fa6";
import { toast } from "react-toastify";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { addToCart } from "@/features/cart/cartSlice";
import axiosInstance from "../services/axiosInstance";
import Breadcrumbdemo from "../components/Breadcrumb";

const Collection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const category = useSelector((state) => state.category.categories);

  // API state
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [itemsPerPage] = useState(9);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchInput);
    return () => debouncedSearch.cancel();
  }, [searchInput, debouncedSearch]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let endpoint = `/products?page=${currentPage}&limit=${itemsPerPage}&category=${category}`;

        // Add search term to backend query
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
  }, [currentPage, category, searchTerm]);

  // Filter products based on search (client-side filtering as backup)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.desc?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [products, searchTerm]);

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product._id);
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSearchInput("");
  };

  const getProductImage = (categoryName) => {
    switch (categoryName?.toLowerCase()) {
      case "shoes":
        return "./shoe.jpg";
      case "cloths":
        return "./cloths.jpg";
      case "accessories":
        return "./mobile.jpg";
      case "electronics":
        return "./computer.jpg";
      default:
        return "./children-sample.jpg";
    }
  };

  const categoryName = category[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumbdemo />

    

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 sm:w-80"
            />
          </div>
          <div className="text-sm text-gray-600">
            {totalProducts > 0 && `${totalProducts} products found`}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Active Filters */}
        {(searchTerm || category.length > 0) && (
          <div className="mb-6 flex items-center space-x-2 flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  setSearchTerm("");
                  setSearchInput("");
                }}
              >
                Search: {searchTerm} ×
              </Badge>
            )}
            {category.length > 0 && (
              <Badge className="bg-green-200  " variant="secondary">Category: {category.join(", ")}</Badge>
            )}
            <Button className="bg-red-200" variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}

        {/* Collection Header */}
        <div className="mb-8">
          <h1 className="font-bold text-2xl lg:text-3xl">
            {category.length > 0 ? category.join(", ") : "All Products"}{" "}
            <span className="text-lg text-red-500">collection</span>
          </h1>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>

        {/* Products Section */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-gray-500 text-lg mt-4">Loading products...</p>
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
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  lg:mx-10 mx-2  gap-4 mt-10 ">
              {filteredProducts.map((product) => (
                <Card
                  key={product._id}
                  className="bg-white shadow-md rounded-lg py-0 overflow-hidden mt-4 flex lg:h-88 md:h-88 h-66 flex-col gap-7 cursor-pointer"
                  onClick={() =>
                    navigate(`/product/${product._id}`, { state: { product } })
                  }
                >
                  <div
                    className=" h-56 w-full flex justify-end p-2 bg-gray-300 overflow-hidden bg-center bg-cover"
                    style={{
                      backgroundImage: `url(./men-1.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div>
                      <button className="text-xs bg-green-200 p-[4px] rounded-lg">
                        30% off
                      </button>
                    </div>
                  </div>
                  <div className="lg:text-left  px-3 flex flex-col  lg:gap-7 gap-5  pb-3 ">
                    <div>
                      <div className="text-md font-semibold">
                        {product.name}
                      </div>
                      <div className="lg:line-clamp-2 line-clamp-1 lg:text-sm text-xs text-gray-500  overflow-hidden text-ellipsis">
                        {product.desc}
                      </div>
                    </div>
                    <div className="flex justify-between lg:flex-row  items-center">
                      <div className="text-md ">
                        <span className="line-through decoration-red-500 text-red-800 text-xs">
                          ${product.price}
                        </span>{" "}
                        <span className="font-bold lg:text-lg text-xs ">
                          ${product.actualprice}
                        </span>
                      </div>
                      <div>
                        <Button
                          className=" text-white bg-black lg:text-normal text-xs hover:bg-gray-700 rounded-lg md:rounded-lg  "
                          // onClick={() => handleAddToCart(product)}
                          onClick={() => {
                            console.log("Trying to add", product._id);
                            dispatch(addToCart(product));
                          }}
                        >
                          <FaCartArrowDown />
                          <span className="ml-2 hidden sm:inline">
                            Add To Cart
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* {filteredProducts.map((product) => ( */}

            {/* Pagination */}
            <div className="mt-8">
              <Pagination className="cursor-pointer">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    >
                      Previous
                    </PaginationPrevious>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink
                      isActive={currentPage === 1}
                      onClick={() => setCurrentPage(1)}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>

                  {currentPage > 3 && (
                    <PaginationItem>
                      <span className="px-2">...</span>
                    </PaginationItem>
                  )}

                  {[currentPage - 1, currentPage, currentPage + 1].map(
                    (page) => {
                      if (page > 1 && page < totalPages) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={currentPage === page}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      return null;
                    }
                  )}

                  {currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <span className="px-2">...</span>
                    </PaginationItem>
                  )}

                  {totalPages > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        isActive={currentPage === totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}

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
                      Next
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Collection;
