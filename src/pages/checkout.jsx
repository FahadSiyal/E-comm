import React from "react";

import { Label } from "@radix-ui/react-label";

import { Textarea } from "../components/ui/textarea";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import axios from "../services/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/validations/formSchema";
import { toast } from "react-toastify";
import { openLoginDialog } from "@/features/dialog/dialogSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/features/cart/cartSlice";

import {
  addToCart,
  removeFromCart,
  deleteFromCart,
} from "@/features/cart/cartSlice";


const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CartItems = useSelector((state) => state.cart.cartItems);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,  },
  } = useForm({
    resolver:zodResolver(checkoutSchema)
  });
  
  const onSubmit = async (data) => {
    const payload = {
        ...data,          // all form fields (name, email, phone, address, etc.)
        CartItems,        // add cart items from Redux state
      };
    try {
      const response = await axios.post("/order", payload);
      console.log("Contact Done:",data);
      toast.success(" Order placedsuccessfully!");
      reset()
     navigate("/")
     dispatch(clearCart())
    } catch (error) {
      
     dispatch(openLoginDialog())
      toast.error("You need to loggined!");
     
    }
  };
  return (
    <>
      <section className=" min-h-screen  ">
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:my-0 mb-5  ">
          <div className="left lg:bg-white bg-none flex-col overflow-y-auto  gap-3 h-auto flex lg:px-16 px-2 lg:tracking-normal tracking-tighter lg:text-base text-sm lg:py-10 py-0 ">
            <section className=" lg:min-h-screen h-auto lg:py-10 py-2 px-0   ">
              <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  Checkout
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="lg:space-y-6 space-y-2">
                  <div>
                    <Label className="lg:text-base text-md " htmlFor="name">Full Name</Label>
                    <input
                     
                      className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-900 text-sm">{errors.name.message}</p>)}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <input
                     
                      className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your email"
                      {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red-900 text-sm">{errors.email.message}</p>
                      )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <input
                   
                      className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your phone number"
                      {...register("phone")}
                    />
                    {errors.phone && (
                        <p className="text-red-900 text-sm">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                    
                      className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your address"
                      {...register("address", )}
                    />
                    {errors.address && (
                      <p className="text-red-900 text-sm">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <input
                   
                      className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your phone number"
                      {...register("city")}
                    />
                    {errors.city && (
                        <p className="text-red-900 text-sm">{errors.city.message}</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <h3 className="font-semibold text-lg mb-2">
                      Payment Method
                    </h3>
                    <p className="text-gray-600">Cash on Delivery (COD)</p>
                  </div>

                  <Button type="submit" className="w-full bg-black text-white">
                    Place Order
                  </Button>
                </form>
              </div>
            </section>
          </div>

    <div className="right mx-2 rounded-lg lg:mx-20 md:mx-20 mt-10">
  <div>
    <h1 className="font-semibold lg:text-left text-center">Shopping Cart</h1>
  </div>
  <div>
    <Card className="lg:mt-10 mt-3 border border-black h-auto py-1">
      <div className="w-auto my-10 mx-5">
        {/* Upper Content */}
        <div className="flex lg:flex-row flex-col justify-between border-black pb-2">
          <div className="Left w-full flex flex-col gap-4">
            <div>
              <h1 className="font-bold text-xl lg:text-3xl">ITEMS</h1>
            </div>
            <div className="text-sm">
              <div className="flex gap-3">
                <div className="flex flex-col gap-1 w-full h-80 overflow-y-scroll">
                 {CartItems.map((item, index) => (
  <Card
    key={index}
    className="w-full h-20 flex flex-row items-center justify-between px-4 rounded-md bg-gray-50"
  >
    {/* Left Side: Product Info */}
    <div className="flex items-center gap-2 justify-center">
      <div className="bg-gray-800 h-7 w-7"></div>
      <div>
        <h1 className="text-sm font-semibold">{item.name}</h1>
        <span className="text-xs text-gray-500">
          Quantity: {item.quantity}
        </span>
      </div>
    </div>

    {/* Right Side: Amount and Controls */}
    <div className="flex items-center gap-3">
      <div className="text-sm font-semibold">
        Rs. {Number(item.price ).toFixed(2)}
      </div>
      <button
        onClick={() => dispatch(addToCart(item))}
        className="px-2 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
      >
        +
      </button>
      <button
        onClick={() => dispatch(removeFromCart(item))}
        className="px-2 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
      >
        -
      </button>
      <div
        onClick={() => dispatch(deleteFromCart(item))}
        className="hover:text-red-600 cursor-pointer text-lg"
      >
        <MdDelete />
      </div>
    </div>
  </Card>
))}

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Content */}
   {/* Products Summary with totals */}
<div className="mt-2 flex flex-col gap-3">
  <h1 className="font-bold">Products</h1>

  <div className="w-full flex justify-around font-bold bg-black text-white">
    <div>Title</div>
   
    <div>Amount</div>
  </div>

  {CartItems.map((item, index) => (
    <div
      key={index}
      className="w-full flex justify-around border-b-2 pb-2"
    >
      <div>{item.name}</div>
      {/* <div>{item.brand || "N/A"}</div> */}
      <div>Rs. {(item.price * item.quantity).toFixed(0)}</div>
    </div>
  ))}
</div>

{/* Final Total with delivery charges */}
<div className="flex flex-col items-end justify-end mt-5">
  {(() => {
    const subtotal = CartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const deliveryCharge = 200;
    const total = subtotal + deliveryCharge;

    return (
      <>
        <div className="flex gap-10 border-b mt-2 font-medium">
          <span>Delivery Charges:</span>
          <span>Rs. {deliveryCharge}</span>
        </div>
        <div className="flex gap-10 border-b font-bold mt-2">
          <span>Total:</span>
          <span>Rs. {total.toFixed(0)}</span>
        </div>
      </>
    );
  })()}
</div>

      
      </div>
    </Card>
  </div>
</div>

        </div>
      </section>
    </>
  );
};

export default Checkout;
