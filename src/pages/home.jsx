

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { FaCartArrowDown } from "react-icons/fa6"

// UI Components
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Redux Actions
import { addToCart } from "@/features/cart/cartSlice"
import { deleteCategory, addCategory } from "../features/category/categorySlice"

// Services
import axiosInstance from "../services/axiosInstance"

// Product Card Component
const ProductCard = ({ product, onAddToCart, onNavigate }) => (
  <div className="p-1">
    <Card className="bg-white shadow-md rounded-lg py-0 overflow-hidden mt-4 flex lg:h-88 md:h-88 h-66 flex-col gap-7">
      <div
        className="h-56 w-full flex justify-end p-2 bg-gray-300 overflow-hidden bg-center bg-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
        style={{
          backgroundImage: `url(./men-1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => onNavigate(product._id, product)}
      >
        <div>
          <button className="text-xs bg-green-200 p-[4px] rounded-lg">30% off</button>
        </div>
      </div>

      <div className="lg:text-left px-3 flex flex-col lg:gap-7 gap-5 pb-3">
        <div>
          <div className="text-md font-semibold">{product.name}</div>
          <div className="lg:line-clamp-2 line-clamp-1 lg:text-sm text-xs text-gray-500 overflow-hidden text-ellipsis">
            {product.desc}
          </div>
        </div>

        <div className="flex justify-between lg:flex-row items-center">
          <div className="text-md">
            <span className="line-through decoration-red-500 text-red-800 text-xs">${product.price}</span>{" "}
            <span className="font-bold lg:text-lg text-xs">${product.actualprice}</span>
          </div>

          <div>
            <Button
              className="text-white bg-black lg:text-normal text-xs hover:bg-gray-700 rounded-lg"
              onClick={() => onAddToCart(product)}
            >
              <FaCartArrowDown />
              <span className="ml-2 hidden sm:inline">Add To Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
)

// Product Carousel Component
const ProductCarousel = ({ title, products, onAddToCart, onNavigateToProduct }) => (
  <div className="flex flex-col justify-center mt-10 max-w-7xl lg:mx-auto md:mx-10 mx-3 gap-3 overflow-hidden">
    <div className="flex justify-between items-center">
      <h1 className="font-bold text-md">{title}</h1>
    </div>

    <div className="relative w-full">
      <Card className="white py-0">
        <Carousel opts={{ align: "start" }} className="w-full px-2 my-2">
          <CarouselContent>
            {products?.map((product) => (
              <CarouselItem
                key={product._id}
                className="basis-2/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 2xl:basis-2/9"
              >
                <ProductCard product={product} onAddToCart={onAddToCart} onNavigate={onNavigateToProduct} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md" />
          <CarouselNext className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md" />
        </Carousel>
      </Card>
    </div>
  </div>
)

// Main Home Component
function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // State
  const [categories] = useState([
    { name: "Cloths", items: 5, img: "./men-sample.jpg" },
    { name: "Accessories", items: 10, img: "./watch.jpg" },
    { name: "Electronics", items: 15, img: "./computer.jpg" },
    { name: "Home Appliances", items: 10, img: "./elect.jpg" },
    { name: "Bags", items: 15, img: "./bags.jpg" },
    { name: "Sports", items: 10, img: "./sports.jpg" },
    { name: "Books", items: 10, img: "./boks.jpg" },
    { name: "Shoes", items: 15, img: "./shoe.jpg" },
    { name: "Lighting", items: 15, img: "./light.jpg" },
    { name: "Baby Products", items: 15, img: "./children-sample.jpg" },
    { name: "Hobbies", items: 15, img: "./women-1.jpg" },
  ])

  const [banner] = useState([{ img: "./banner.jpg" }, { img: "./banner-1.jpg" }, { img: "./banner-2.jpg" }])

  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [itemsPerPage] = useState(8)

  // Carousel API state
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  // Effects
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...")
        const response = await axiosInstance.get(`/products?page=${currentPage}&limit=${itemsPerPage}`)
        setProducts(response.data.products)
        console.log(response.data.products, "products found")
        setTotalPages(response.data.totalPages)
      } catch (error) {
        toast.error("Failed to fetch products ❌")
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [currentPage, itemsPerPage])

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // Handlers
  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    toast.success("Product added to cart!")
  }

  const handleCategory = (category) => {
    dispatch(deleteCategory(category.name))
    dispatch(addCategory(category.name))
    navigate("/collection")
  }

  const handleNavigateToProduct = (id, product) => {
    navigate(`/product/${id}`, { state: { product } })
  }

  return (
    <section className="bg-white">
      {/* Hero Slider */}
      <div className="lg:w-auto max-w-7xl md:w-auto w-auto md:mx-10 mx-3 lg:mx-auto overflow-hidden relative">
        <Carousel setApi={setApi} className="w-full rounded-2xl">
          <CarouselContent>
            {banner.map((bannerItem, index) => (
              <CarouselItem key={index} className="w-full">
                <Card className="w-full p-0 overflow-hidden">
                  <CardContent className="flex items-center justify-center p-0 h-[300px] md:h-[400px] lg:h-[500px]">
                    <div className="relative w-full h-full flex justify-center items-center text-center bg-black tracking-widest">
                      <img
                        src={bannerItem.img || "/placeholder.svg"}
                        alt="Banner"
                        className="absolute inset-0 w-full h-full opacity-90 object-cover"
                      />
                      <h1 className="relative text-white tracking-tighter lg:text-4xl md:text-4xl text-xl font-bold">
                        Your Favorites, Organized – Browse by What Matters
                      </h1>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full" />
          <CarouselNext className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full" />
        </Carousel>
      </div>

      {/* Categories Section */}
      <div className="flex flex-col justify-center mt-10 max-w-7xl lg:mx-auto md:mx-10 mx-3 gap-3 overflow-hidden">
        <div>
          <h1 className="font-bold text-md">Categories</h1>
        </div>

        <div className="relative w-full">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {categories.map((category, index) => (
                <CarouselItem
                  key={index}
                  className="basis-2/7 sm:basis-1/7 md:basis-1/7 lg:basis-1/8 xl:basis-1/8 2xl:basis-[10%] w-32 cursor-pointer"
                  onClick={() => handleCategory(category)}
                >
                  <div className="p-1">
                    <Card
                      className="flex justify-center lg:h-24 h-18 p-0 overflow-hidden bg-center bg-cover"
                      style={{ backgroundImage: `url(${category.img})` }}
                    />
                    <div className="mt-2 text-center text-sm font-medium text-gray-700">{category.name}</div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full" />
            <CarouselNext className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full" />
          </Carousel>
        </div>
      </div>

      {/* Brands Section */}
      {/* <div className="flex flex-col justify-center mt-10 max-w-7xl lg:mx-auto md:mx-10 mx-3 gap-3 overflow-hidden">
        <div>
          <h1 className="font-bold text-md">Brands</h1>
        </div>

        <div className="relative w-full">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {Array.from({ length: 16 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-2/7 sm:basis-1/7 md:basis-1/7 lg:basis-1/8 xl:basis-1/8 2xl:basis-[10%]"
                >
                  <div className="p-1">
                    <Card className="flex justify-center bg-gray-300 lg:h-24 h-18 p-0 overflow-hidden bg-[url('./b1.jpg')] bg-center bg-cover" />
                    <div className="text-center text-sm font-medium text-gray-700 mt-2">Brand</div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full" />
            <CarouselNext className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full" />
          </Carousel>
        </div>
      </div> */}

      {/* Shops Section */}
      {/* <div className="flex flex-col justify-center mt-10 max-w-7xl lg:mx-auto md:mx-10 mx-3 gap-3 overflow-hidden">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-md">Manufacturers</h1>
          <Link to="/">
            <p className="text-blue-500 text-xs">view all</p>
          </Link>
        </div>

        <div className="relative w-full">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-2/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 2xl:basis-1/4"
                >
                  <div className="p-1">
                    <Card className="flex justify-center bg-gray-300 h-52 p-0 overflow-hidden bg-[url('./s3.jpg')] bg-center bg-cover" />
                    <div className="text-center text-sm font-medium text-gray-700 mt-2">Shop name</div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div> */}

      {/* Product Sections */}
      <ProductCarousel
        title="Featured Products"
        products={products}
        onAddToCart={handleAddToCart}
        onNavigateToProduct={handleNavigateToProduct}
      />

      {/* Banner Section */}
      <div className="relative max-w-7xl mx-auto rounded-lg my-10 h-96 flex justify-center items-center text-center bg-black tracking-widest">
        <img
          src="./women.jpg"
          alt="Promotional Banner"
          className="absolute inset-0 w-full h-full opacity-90 object-cover"
        />
        <h1 className="relative text-white tracking-tighter lg:text-4xl md:text-4xl text-xl font-bold bg-transparent">
          Save Big Today – Up to 50% Off Sitewide!
        </h1>
      </div>

      <ProductCarousel
        title="Popular Products"
        products={products}
        onAddToCart={handleAddToCart}
        onNavigateToProduct={handleNavigateToProduct}
      />

      <ProductCarousel
        title="Trending Products"
        products={products}
        onAddToCart={handleAddToCart}
        onNavigateToProduct={handleNavigateToProduct}
      />
    </section>
  )
}

export default Home
