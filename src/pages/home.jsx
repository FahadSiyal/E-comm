import React from "react";
// import TestimonialSlider from '@/components/TestimonialSlider'
// import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { FaCartArrowDown } from "react-icons/fa6";
import { deleteCategory,addCategory } from "../features/category/categorySlice";
import {  useNavigate } from "react-router-dom";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "../services/axiosInstance";

import { Link, NavLink } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [categories, setCategory] = useState([
    { name: "Cloths", items: 5, img: "./men-sample.jpg" },
    { name: "shoes", items: 10, img: "./children-sample.jpg" },
    { name: "Accessories", items: 15, img: "./women-1.jpg" },
    { name: "shoes", items: 10, img: "./children-sample.jpg" },
    { name: "Accessories", items: 15, img: "./women-1.jpg" },
    { name: "shoes", items: 10, img: "./children-sample.jpg" },
    { name: "Accessories", items: 15, img: "./women-1.jpg" },
    { name: "shoes", items: 10, img: "./children-sample.jpg" },
    { name: "Accessories", items: 15, img: "./women-1.jpg" },
    { name: "Accessories", items: 15, img: "./women-1.jpg" },
    { name: "Electronics", items: 20, img: "./men-sample.jpg" },
    { name: "Home Appliances", items: 25, img: "./children-sample.jpg" },
  ]);
  const banner = [
    {
      img: "./banner.jpg",
    },
    {
      img: "./banner-1.jpg",
    },
    {
      img: "./banner-2.jpg",
    },
  ];



  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products again...");
        const response = await axiosInstance.get(
          `/products?page=${currentPage}&limit=${itemsPerPage}`
        );

        setProducts(response.data.products);
        console.log(response.data.products, "products finded");
        setTotalPages(response.data.totalPages);
      } catch (error) {
        toast.error("Failed to fetch products ❌", error);
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentPage]);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleCategory = (e, item) => {
    e.preventDefault(); // Prevent default link behavior
    dispatch(deleteCategory(item.name));
    navigate("/collection"); // Navigate to the collection page

    dispatch(addCategory(item.name)); // Dispatch the category to the Redux store
  };

  const [api, setApi] = React.useState(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
// const navigate=useNavigate()

  return (
    <>
      <section className="bg-white">
        {/* Slider */}
        <div className="lg:w-auto max-w-7xl md:w-auto w-auto md:mx-10 mx-3  lg:mx-auto   overflow-hidden relative  ">
          <Carousel setApi={setApi} className="w-full rounded-2xl">
            <CarouselContent>
              {banner.map((banner, index) => (
                <CarouselItem key={index} className="w-full">
                  <Card className="w-full p-0 overflow-hidden">
                    <CardContent className="flex items-center justify-center p-0 h-[300px] md:h-[400px] lg:h-[500px]">
                      <div className="relative w-full h-full flex justify-center items-center text-center bg-black tracking-widest">
                        {/* Background Image */}
                        <img
                          src={banner.img}
                          alt="Background"
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

            {/* Navigation Buttons */}
            <CarouselPrevious className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white  p-2 rounded-full" />
            <CarouselNext className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10  bg-white  p-2 rounded-full" />
          </Carousel>
        </div>
        {/* Slider */}

        {/* Categories Slider */}
        <div className="flex flex-col justify-center mt-10 max-w-7xl lg:mx-auto md:mx-10 mx-3 gap-3 overflow-hidden">
          <div>
            <h1 className="font-bold text-md">Categories</h1>
          </div>

          {/* 👇 Make this container relative */}
          <div className="relative w-full">
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent>
                {categories.map((category, index) => (
                  <Link to="/collection">
                    <CarouselItem
                      onClick={(e) => handleCategory(e, category)}

                      key={index}
                      className="basis-2/7 sm:basis-1/7 md:basis-1/7 lg:basis-1/8 xl:basis-1/8 2xl:basis-[10%] w-32"

                    >
                      <div className="p-1">
                        <Card
                          className="flex justify-center lg:h-24 h-18 p-0 overflow-hidden bg-center bg-cover"
                          style={{ backgroundImage: `url(${category.img})` }}
                        ></Card>
                        <div className="mt-2 text-center text-sm font-medium text-gray-700">
                          {category.name}
                        </div>
                      </div>
                    </CarouselItem>
                  </Link>
                ))}
              </CarouselContent>

              <CarouselPrevious className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full" />
              <CarouselNext className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full" />
            </Carousel>
          </div>
        </div>
        {/* Categories Slider */}

        {/* Brand */}
        <div className="flex flex-col justify-center mt-10 max-w-7xl lg:mx-auto md:mx-10 mx-3 gap-3 overflow-hidden">
          <div>
            <h1 className="font-bold text-md">Brands</h1>
          </div>

          {/* 👇 Make this container relative */}
          <div className="relative w-full">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {Array.from({ length: 16 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-2/7 sm:basis-1/7 md:basis-1/7 lg:basis-1/8 xl:basis-1/8 2xl:basis-[10%]"
                  >
                    <div className="p-1">
                      <Card className="flex justify-center bg-gray-300  lg:h-24  h-18 p-0 overflow-hidden bg-[url('./brands.jpg')] bg-center bg-cover"></Card>
                      <div className="text-center text-sm font-medium text-gray-700 mt-2">
                        Brand
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* ✅ Positioned absolutely within the relative parent */}
              <CarouselPrevious className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white  p-2 rounded-full" />
              <CarouselNext className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10  bg-white p-2 rounded-full" />
            </Carousel>
          </div>
        </div>
        {/* Brand */}
        {/* Shops */}
        <div className="flex flex-col justify-center mt-10 max-w-7xl lg:mx-auto md:mx-10 mx-3 gap-3 overflow-hidden">
          <div className="flex justify-between items-center">
            <span>
              {" "}
              <h1 className="font-bold text-md">Shops</h1>
            </span>
            <Link to={"/shop"}>
              {" "}
              <span>
                {" "}
                <p className="text-blue-500 text-xs">view all</p>
              </span>
            </Link>
          </div>

          {/* 👇 Make this container relative */}
          <div className="relative w-full">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {Array.from({ length: 4 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-2/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 2xl:basis-1/4 "
                  >
                    <div className="p-1">
                      <Card className="flex justify-center bg-gray-300  h-52 p-0 overflow-hidden bg-[url('./ball.jpg')] bg-center bg-cover"></Card>
                      <div className="text-center text-sm font-medium text-gray-700 mt-2">
                        Shop name
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        {/* Shops */}
        {/* Featured Products */}
        <div className="flex flex-col justify-center mt-10 max-w-7xl lg:mx-auto md:mx-10 mx-3 gap-3 overflow-hidden">
          <div className="flex justify-between items-center">
            <span>
              <h1 className="font-bold text-md">Featured Products</h1>
            </span>
          </div>

  {/* 👇 Make this container relative */}
  <div className="relative w-full">
    <Card className=" py-0">
    <Carousel opts={{ align: "start" }} className="w-full px-2 my-2">
      <CarouselContent>
        {products?.map((product, index) => (
          <CarouselItem
            key={index}
            className="basis-2/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 2xl:basis-2/9"
          >
            <div className="p-1">
            <Card
  key={product._id}
  className="bg-white shadow-md rounded-lg py-0 overflow-hidden mt-4 flex lg:h-88 md:h-88 h-66 flex-col gap-7 cursor-pointer"
  onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
>
                <div
                  className="h-56 w-full flex justify-end p-2 bg-gray-300 overflow-hidden bg-center bg-cover"
                  style={{
                    backgroundImage: `url(./ball.jpg)`,
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
                <div className="lg:text-left px-3 flex flex-col lg:gap-7 gap-5 pb-3">
                  <div>
                    <div className="text-md font-semibold">
                      {product.name}
                    </div>
                    <div className="lg:line-clamp-2 line-clamp-1 lg:text-sm text-xs text-gray-500 overflow-hidden text-ellipsis">
                      {product.desc}
                    </div>
                  </div>
                  <div className="flex justify-between lg:flex-row items-center">
                    <div className="text-md">
                      <span className="line-through decoration-red-500 text-red-800 text-xs">
                        ${product.price}
                      </span>{" "}
                      <span className="font-bold lg:text-lg text-xs">
                        ${product.actualprice}
                      </span>
                    </div>
                    <div>
                      <Button
                        className="text-white bg-black lg:text-normal text-xs hover:bg-gray-700 rounded-lg"
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
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

                {/* 👇 Carousel Controls */}
                <CarouselPrevious className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md" />
                <CarouselNext className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md" />
              </Carousel>
            </Card>
          </div>
        </div>

        {/* Featued Products */}





        {/* Banner Section */}
        <div className="relative max-w-7xl mx-auto rounded-lg my-10 h-96 flex justify-center items-center text-center bg-black tracking-widest">
          {/* Background Image */}
          <img
            src="./women.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full opacity-90"
            style={{ objectFit: "cover", backgroundRepeat: "repeat" }}
          />
          <h1 className="relative text-white tracking-tighter lg:text-4xl md:text-4xl text-xl font-bold bg-transparent">
            {" "}
            Save Big Today – Up to 50% Off Sitewide!
          </h1>
        </div>

        {/* Sub-Section */}
        <section className="py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-6 bg-white">
          {/* Left Side - Image */}
          <div className="m-auto">
            <img
              src="./women-1.jpg"
              alt="Featured Product"
              className="w-70 h-auto object-cover rounded-lg"
            />
          </div>

          {/* Right Side - Text Content */}
          <div className="flex flex-col justify-center space-y-4 text-center md:text-left">
            <p className="text-sm text-red-600 uppercase">Summer 2020</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Part of the Neural Universe
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              We know how large objects will act, but things on a small scale.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 pt-6">
              <Link to="/shop">
                {" "}
                <button className="bg-black text-white px-5 py-2 rounded-md text-sm hover:cursor-pointer">
                  Buy Now
                </button>
              </Link>
              <button className="border border-slate-300 text-black hover:bg-green-100  px-5 py-2 rounded-md text-sm">
                Read More
              </button>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        {/* <div className='bg-white p-20'>
        <div className='md:flex sm:block my-0 mx-10 items-center '>
          <div className='sm:w-full p-6'>
            <h3 className='text-red-500 font-bold mt-6 '>Testimonials</h3>
            <h1 className='text-3xl sm:text-md font-bold mt-5 '>What Our Customers Say About Us</h1>
            <p className='mt-3 text-xl  sm:text-sm '>“I had the pleasure of dining at Foodi last night, and I'm still raving about the experience! The attention to detail in presentation and service was impeccable”</p>
           
          </div> */}
        {/* <TestimonialSlider/> */}
        {/* </div>

        </div> */}
      </section>
    </>
  );
}

export default Home;
