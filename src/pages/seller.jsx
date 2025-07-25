import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaShippingFast, FaMoneyCheckAlt, FaBullhorn } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { BsClipboardCheck } from "react-icons/bs";
import { FaUserPlus, FaAddressCard, FaWallet, FaBoxOpen } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { BiSolidUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import ScrollToTop from "../components/ScrollToTop";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { loginSchema } from "../validations/formSchema";
import axios from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";

// UI Components


const seller = () => {
  const navigate=useNavigate()
  const features = [
    {
      icon: <FiShoppingBag className="text-4xl text-red-500" />,
      title: "Reach",
      desc: "Millions of customers on Daraz, Pakistan's most visited shopping destination",
    },
    {
      icon: <BsClipboardCheck className="text-4xl text-red-500" />,
      title: "Free Registration",
      desc: "Account registration & listing items for sale is free",
    },
    {
      icon: <FaShippingFast className="text-4xl text-red-500" />,
      title: "Reliable Shipping",
      desc: "Fast, reliable and hassle-free delivery through Daraz logistic network",
    },
    {
      icon: <FaMoneyCheckAlt className="text-4xl text-red-500" />,
      title: "Timely Payments",
      desc: "Funds are safely deposited directly to your bank account on a weekly basis",
    },
    {
      icon: <FaBullhorn className="text-4xl text-red-500" />,
      title: "Marketing Tools",
      desc: "Find new customers & grow more with advertising and our whole range of marketing tools",
    },
    {
      icon: <MdOutlineSupportAgent className="text-4xl text-red-500" />,
      title: "Support & Training",
      desc: "Learn all about ecommerce for free and get help with seller support and Daraz University",
    },
  ];
  const steps = [
    {
      icon: <BiSolidUser className="text-4xl text-red-500" />,
      title: "Signup for Free",
      desc: "Create your account through our website or mobile app with just your phone number",
    },
    {
      icon: <FaUserPlus className="text-4xl text-red-500" />,
      title: "Add Profile Information",
      desc: "Complete your profile by providing your email and store name so that we can identify you",
    },
    {
      icon: <FaAddressCard className="text-4xl text-red-500" />,
      title: "Add Address Information",
      desc: "Provide all address details of your business",
    },
    {
      icon: <FaWallet className="text-4xl text-red-500" />,
      title: "Add ID & Bank Information",
      desc: "Add in your ID & Business related details. Include necessary bank information for payments",
    },
    {
      icon: <FaBoxOpen className="text-4xl text-red-500" />,
      title: "List Products",
      desc: "Add products to your store through seller center. Start selling as soon as your products go live after going through quality control",
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/seller/login", data);
      console.log("Logged in:", response.data.token);
      reset();
      navigate('/wp-admin')

      toast.success(" Seller Logged in successfully!");
    } catch (error) {
      toast.error("Login failed:", error);
      toast.error(" Seller Failed to login. Please try again.");
    }
  };

  return (
    <section className="">
      <ScrollToTop />

      <div className="bg-red-500 h-auto py-20 w-full   text-left flex items-center   justify-between   gap-5">
        <div className=" flex justify-between  gap-20 w-full max-w-7xl mx-auto items-center ">
          <div className="">
            <h1 className="font-bold text-3xl md:text-6xl text-white max-w-xl">
              Become A Mera Brand Seller
            </h1>
            <Link to={"/shopDetails"}>
              <button className="bg-white font-bold text-red-500 px-3 lg:px-5 py-2 lg:py-4 rounded-lg mt-7">
                Start Selling
              </button>
            </Link>
          </div>

          {/* Seller Login Form Start  */}
          <div className="flex items-center justify-center  rounded-lg bg-gray-100">
      <Card className="bg-white flex flex-col px-5 py-8 w-96 space-y-6 shadow-md rounded-lg">
        <div>
          <h1 className="text-2xl font-bold text-center">Seller Login</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Input
              {...register("email")}
              placeholder="Enter Your Email"
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter Your Password"
              className="w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <Button type="submit" className="lg:w-36 text-white bg-red-500">
              Next
            </Button>
          </div>
        </form>
      </Card>
    </div>
          {/* Seller Login Form Start  */}
        </div>
      </div>

      <div className="flex flex-col max-w-7xl lg:mx-auto mx-7 ">
        <h2 className="text-3xl md:text-4xl font-bold my-10 mb-10">
          Why Sell on Mera Brand?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="shrink-0">{item.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex flex-col my-20 max-w-7xl lg:mx-auto mx-7
            "
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          5 Simple Steps to Start Selling
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div>{step.icon}</div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col max-w-7xl lg:mx-auto mx-7 my-20 ">
        <Accordion type="single" collapsible className="w-full">
          <h1 className="font-bold text-3xl py-5">
            Frequently asked Questions
          </h1>
          <AccordionItem value="item-1">
            <AccordionTrigger className=" px-2">
              Product Information
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance px-2 py-4">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
              <p>
                Key features include advanced processing capabilities, and an
                intuitive user interface designed for both beginners and
                experts.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className=" px-2">
              Shipping Details
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance px-2 py-4">
              <p>
                We offer worldwide shipping through trusted courier partners.
                Standard delivery takes 3-5 business days, while express
                shipping ensures delivery within 1-2 business days.
              </p>
              <p>
                All orders are carefully packaged and fully insured. Track your
                shipment in real-time through our dedicated tracking portal.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className=" px-2">Return Policy</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance px-2 py-4">
              <p>
                We stand behind our products with a comprehensive 30-day return
                policy. If you&apos;re not completely satisfied, simply return
                the item in its original condition.
              </p>
              <p>
                Our hassle-free return process includes free return shipping and
                full refunds processed within 48 hours of receiving the returned
                item.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default seller;
