import React from "react";
// import TestimonialSlider from '@/components/TestimonialSlider'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Link, NavLink } from "react-router-dom";
function Home() {
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
  return (
    <>
      <section className="bg-white">
        {/* Slider */}
        <div className="lg:w-auto max-w-7xl md:w-auto w-auto md:mx-10 mx-3  lg:mx-auto   overflow-hidden relative  ">
          <Carousel setApi={setApi} className="w-full rounded-2xl">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="w-full">
                  <Card className="w-full p-0 overflow-hidden">
                    <CardContent className="flex items-center justify-center p-0 h-[300px] md:h-[400px] lg:h-[500px]">
                      <div className="relative w-full h-full flex justify-center items-center text-center bg-black tracking-widest">
                        {/* Background Image */}
                        <img
                          src="./banner.jpg"
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
            <h1 className="font-bold text-xl">Categories</h1>
          </div>

          {/* 👇 Make this container relative */}
          <div className="relative w-full">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="">
                {Array.from({ length: 16 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/4 sm:basis-1/7 md:basis-1/7 lg:basis-1/8 xl:basis-1/8 2xl:basis-[10%]"
                  >
                    <div className="p-1">
                      <Card className="flex justify-center bg-gray-300 h-24 p-0 overflow-hidden">
                        <CardContent className="relative flex items-center justify-center h-24 overflow-hidden p-0 bg-[url('./categories.jpg')] bg-center bg-cover">
                          <span className="z-10 text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded">
                            Category 
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* ✅ Positioned absolutely within the relative parent */}
              <CarouselPrevious className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white  p-2 rounded-full" />
              <CarouselNext className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10  bg-white  p-2 rounded-full" />
            </Carousel>
          </div>
        </div>
        {/* Categories Slider */}

        {/* Brand */}
        <div className="flex flex-col justify-center mt-10 max-w-7xl lg:mx-auto md:mx-10 mx-3 gap-3 overflow-hidden">
          <div>
            <h1 className="font-bold text-xl">Brands</h1>
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
                    className="basis-1/4 sm:basis-1/7 md:basis-1/7 lg:basis-1/8 xl:basis-1/8 2xl:basis-[10%]"
                  >
                    <div className="p-1">
                      <Card className="flex justify-center bg-gray-300  h-24 p-0 overflow-hidden">
                      <CardContent className="relative flex items-center justify-center h-24 overflow-hidden p-0 bg-[url('./brands.jpg')] bg-center bg-cover">
                          <span className="z-10 text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded">
                            Brand 
                          </span>
                        </CardContent>
                      </Card>
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
          <div>
            <h1 className="font-bold text-xl">Shops</h1>
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
                    className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 2xl:basis-1/4 "
                  >
                    <div className="p-1">
                    <Card className="flex justify-center bg-gray-300  h-52 p-0 overflow-hidden">
                      <CardContent className="relative flex items-center justify-center h-full overflow-hidden p-0 bg-[url('./shop.jpg')] bg-center bg-cover">
                          <span className="z-10 text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded">
                           Shop
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              
            </Carousel>
          </div>
        </div>
        {/* Shops */}

        {/*Categories Section */}
        <div className=" bg-white p-10 md:p-20">
          <div className="flex flex-col md:flex-row items-center mx-5 md:mx-10">
            <div className="w-full md:w-full justify-center p-6 text-center md:text-left">
              <h3 className="text-center text-red-500 font-bold mt-6 text-lg md:text-xl">
                Customer Favorites
              </h3>
              <h1 className="text-center pb-10 text-2xl md:text-4xl font-bold mt-5">
                Our Collections
              </h1>
              <div className="">
                <Link
                  to={"shop"}
                  className="flex flex-wrap justify-center md:justify-start gap-6 mt-5"
                >
                  {[
                    { name: "Men", img: "./men-1.jpg" },
                    { name: "Women", img: "./women.jpg" },
                    { name: "Childrens", img: "./children-sample.jpg" },
                  ].map((dish, index) => (
                    <Card
                      key={index}
                      className="w-full sm:w-80 justify-center mx-auto py-0"
                    >
                      <div className="relative w-full h-76   overflow-hidden rounded-lg">
                        <img
                          src={dish.img}
                          alt=""
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute bottom-2 left-2 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-md">
                          <CardTitle>
                            <h2 className="text-sm md:text-base font-bold text-slate-800">
                              {dish.name}
                            </h2>
                          </CardTitle>
                        </div>
                      </div>

                      {/* <CardHeader className='bg-white'>
                    <img src={dish.img} alt={dish.name} className='bg-blue-200  w-20 flex m-auto  object-cover rounded-3xl mt-2' />
                    {/* <CardDescription className='text-sm md:text-base mt-3 flex justify-center'>
                      {dish.desc}
                    </CardDescription> */}

                      {/* </CardHeader> */}
                    </Card>
                  ))}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/*Dishes Section */}
        <div className="p-10 md:p-20 sm:p-10 mx-auto">
          <div className="flex flex-col md:flex-row items-center mx-10 md:mx-10 w-full mx-auto">
            <div className="flex flex-col md:w-full justify-center text-center md:text-left">
              <h3 className="text-center text-red-500 font-bold mt-6 text-lg md:text-xl">
                Featured Products
              </h3>
              <h1 className="text-center text-2xl md:text-4xl font-bold mt-5">
                Best Seller Product
              </h1>
              <p className="text-center">
                Problems trying to resolve the conflict between
              </p>

              <Link to={"menu"}>
                <div className="flex lg:flex-nowrap md:flex-nowrap flex-wrap w-full mx-auto md:justify-start gap-10 mt-10 lg:px-0 px-8">
                  {[
                    {
                      desc: "Timeless, versatile, and effortlessly cool — this denim jacket is your go-to layer for every season. Dress it up or keep it casual, its a staple that never goes out of style.",
                      price: 24,
                      rating: 4.2,
                      img: "./men-sample.jpg",
                    },
                    {
                      desc: "Soft, breathable, and built for comfort — our premium cotton tee fits just right and feels even better. A wardrobe essential, now in your favorite everyday colors.",
                      price: 27,
                      rating: 4.9,
                      img: "./women.jpg",
                    },
                    {
                      desc: "Elegant flow meets everyday ease. This maxi dress drapes beautifully and moves with you — perfect for brunch dates, beach walks, or just turning heads wherever you go.",
                      price: 17,
                      rating: 4.9,
                      img: "./children-sample.jpg",
                    },
                    {
                      desc: "Soft, breathable, and built for comfort — our premium cotton tee fits just right and feels even better. A wardrobe essential, now in your favorite everyday colors.",
                      price: 31,
                      rating: 4.5,
                      img: "./women-1.jpg",
                    },
                  ].map((dish, index) => (
                    <div
                      key={index}
                      className="sm:w-80 flex flex-col justify-between mx-auto bg-white shadow-lg rounded-lg"
                    >
                      <div className="p-0">
                        <div className="relative w-full h-50 overflow-hidden rounded-t-lg">
                          <img
                            src={dish.img}
                            alt={dish.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1 px-6 pt-4">
                        <p className="text-sm md:text-base lg:line-clamp-none md:line-clamp-4 line-clamp-2 ">
                          {dish.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between w-full px-6 pb-4 pt-2 mt-auto">
                        <div className="font-bold text-lg">
                          <span className="text-red-600">$</span>{" "}
                          {dish.price.toFixed(2)}
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">{dish.rating}</span>
                          <img
                            src="./star.png"
                            alt="star"
                            className="w-5 h-5"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* {Till} */}

        {/* Banner Section */}
        <div className="relative h-64 flex justify-center items-center text-center bg-black tracking-widest">
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
