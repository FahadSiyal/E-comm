import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Import the cart icon from react-icons
import { Menu, X } from "lucide-react"; // Import Hamburger and Close icons
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
} from "@/features/cart/cartSlice";
import { MdShoppingCartCheckout } from "react-icons/md";
import { LoginForm } from "./LoginForm";
import {
  openLoginDialog,
  closeLoginDialog,
  closeSignUpDialog,
  openSignUpDialog,
} from "@/features/dialog/dialogSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
``;
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import { SignUpForm } from "./SignUpForm";

const Navbar = () => {




  const openSignUp = useSelector((state) => state.dialog.isSignUpOpen);
  const openLogin = useSelector((state) => state.dialog.isLoginOpen);
  const dispatch = useDispatch();

  //add a cart counter to the cart icon
  const CartItems = useSelector((state) => state.cart.cartItems);

  const totalCartItems = CartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartCount = CartItems.reduce((acc, item) => acc + item.quantity, 0);
  console.log("Cart Count:", cartCount); // Log the cart count

  console.log(CartItems[0]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage mobile menu state



  useEffect(() => {
    const token = Cookies.get("token");
    console.log("token " +  token);

    setIsAuthenticated(!!token); // Convert token to boolean
  }, [Cookies.get("token")]); // Dependency array to re-run effect when token changes

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    // Redirect to login page after logout
  };

  return (
    <header className="shadow sticky z-50 top-0 bg-white">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-black lg:text-3xl md:text-3xl text-lg font-bold ">
              mera brand
            </h1>
          </Link>

          {/* Mobile Menu Button (Hamburger Icon) */}
          <div className="flex justify-center items-center lg:hidden gap-3">
            <div className="none">
            </div>
            <li className="list-none">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className=" flex items-center  border-1"
                  >

                    <FaShoppingCart /> {/* Cart icon */}

                  </Button>
                </SheetTrigger>

                <SheetContent className=" bg-white transition-transform duration-300 ease-in-out transform">
                  <SheetHeader>
                    <SheetTitle>Add To Cart</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </SheetDescription>
                  </SheetHeader>

                  {/* Cart items container */}
                  <div className="flex flex-col gap-1 ">
                        {CartItems.map((item, index) => (
                          <Card
                            key={index}
                            className="w-full h-20 flex items-center justify-between px-4 rounded-md bg-gray-100 flex-row"
                          >
                            {/* Left Side: Product Info */}
                            <div className="flex items-center gap-2 justify-center">
                              <div className="bg-gray-800 h-7 w-7"></div>
                              <div>
                                <h1 className="text-sm font-semibold">
                                  {item.name}
                                </h1>
                                <span className="text-xs text-gray-500">
                                  Quantity : {item.quantity}
                                </span>
                              </div>
                            </div>

                            {/* Right Side: Controls */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => {
                                  dispatch(addToCart(item));
                                }}
                                className="px-2 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                              >
                                +
                              </button>
                              <button
                                onClick={() => {
                                  console.log("Trying to add", item._id);
                                  dispatch(removeFromCart(item));
                                }}
                                className="px-2 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                              >
                                -
                              </button>
                              <div
                                onClick={() => {
                                  dispatch(deleteFromCart(item));
                                }}
                                className="hover:text-red-500 cursor-pointer text-lg"
                              >
                                <MdDelete />
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                  {/* Optional HR divider */}

                  <SheetFooter>
                    <SheetClose asChild>
                      <a href="/Checkout">
                        {" "}
                        <Button
                          className="bg-black text-white w-full"
                          type="submit"
                        >
                          <MdShoppingCartCheckout /> Check Out
                        </Button>
                      </a>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </li>
            <button
              className="lg:hidden text-gray-700 p-2 rounded-md focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          {/* Navbar Links - Desktop */}
          <div className="hidden lg:flex lg:w-auto lg:order-1 ">
            <ul className="flex space-x-8 font-medium justify-center items-center">
              <li>
                <NavLink to="/" className="">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/wp-admin" className="">
                  Admin   Panel
                </NavLink>
              </li>
              <li>
                <NavLink to="/marketplace" className="">
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/seller" className="">
                 <button className="border bg-red-500 text-white px-4 p-2 rounded-lg">Be a seller</button>
                </NavLink>
              </li>
             
             
            </ul>
          </div>

          {/* Authentication Buttons - Desktop */}
          <div className="hidden lg:flex items-center lg:order-2 space-x-4">
            {isAuthenticated ? (
              <>
                            <Sheet className="bg-white">
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-transparent flex items-center space-x-2"
                      >
                        <div className="relative">
                          <FaShoppingCart />
                          {totalCartItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                              {totalCartItems}
                            </span>
                          )}
                        </div>

                        <span>Cart</span>
                      </Button>
                    </SheetTrigger>

                    <SheetContent className="bg-white transition-transform duration-300 ease-in-out transform">
                      <SheetHeader>
                        <SheetTitle>Add To Cart</SheetTitle>
                        <SheetDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </SheetDescription>
                      </SheetHeader>

                      {/* Cart items container */}
                      <div className="flex flex-col gap-1 ">
                        {CartItems.map((item, index) => (
                          <Card
                            key={index}
                            className="w-full h-20 flex items-center justify-between px-4 rounded-md bg-gray-100 flex-row"
                          >
                            {/* Left Side: Product Info */}
                            <div className="flex items-center gap-2 justify-center">
                              <div className="bg-gray-800 h-7 w-7"></div>
                              <div>
                                <h1 className="text-sm font-semibold">
                                  {item.name}
                                </h1>
``                                <span className="text-xs text-gray-500">
``                                  Quantity : {item.quantity}
                                </span>
                              </div>
                            </div>

                            {/* Right Side: Controls */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => {
                                  dispatch(addToCart(item));
                                }}
                                className="px-2 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                              >
                                +
                              </button>
                              <button
                                onClick={() => {
                                  console.log("Trying to add", item._id);
                                  dispatch(removeFromCart(item));
                                }}
                                className="px-2 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                              >
                                -
                              </button>
                              <div
                                onClick={() => {
                                  dispatch(deleteFromCart(item));
                                }}
                                className="hover:text-red-600 cursor-pointer text-lg"
                              >
                                <MdDelete />
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                      {/* Optional HR divider */}

                      <SheetFooter>
                        <SheetClose asChild>
                          <a href="/Checkout">
                            {" "}
                            <Button
                              className="bg-black text-white w-full"
                              type="submit"
                            >
                              <MdShoppingCartCheckout /> Check Out
                            </Button>
                          </a>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>

                      

                <div className="flex items-center bg-white">


                  {/* <img className="h-8" src="6596121.png" alt="User Avatar" /> */}
                  <span className="ml-2 text-gray-700">Hi,{ }</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white rounded-md hover:bg-red-600 text-sm px-4 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <li className="list-none">
                  <Sheet className="bg-white">
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-transparent flex items-center space-x-2"
                      >
                        <div className="relative">
                          <FaShoppingCart />
                          {totalCartItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                              {totalCartItems}
                            </span>
                          )}
                        </div>

                        <span>Cart</span>
                      </Button>
                    </SheetTrigger>

                    <SheetContent className="bg-white transition-transform duration-300 ease-in-out transform">
                      <SheetHeader>
                        <SheetTitle>Add To Cart</SheetTitle>
                        <SheetDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </SheetDescription>
                      </SheetHeader>

                      {/* Cart items container */}
                      <div className="flex flex-col gap-1 ">
                        {CartItems.map((item, index) => (
                          <Card
                            key={index}
                            className="w-full h-20 flex items-center justify-between px-4 rounded-md bg-gray-100 flex-row"
                          >
                            {/* Left Side: Product Info */}
                            <div className="flex items-center gap-2 justify-center">
                              <div className="bg-gray-800 h-7 w-7"></div>
                              <div>
                                <h1 className="text-sm font-semibold">
                                  {item.name}
                                </h1>
                                <span className="text-xs text-gray-500">
                                  Quantity : {item.quantity}
                                </span>
                              </div>
                            </div>

                            {/* Right Side: Controls */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => {
                                  dispatch(addToCart(item));
                                }}
                                className="px-2 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                              >
                                +
                              </button>
                              <button
                                onClick={() => {
                                  console.log("Trying to add", item._id);
                                  dispatch(removeFromCart(item));
                                }}
                                className="px-2 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                              >
                                -
                              </button>
                              <div
                                onClick={() => {
                                  dispatch(deleteFromCart(item));
                                }}
                                className="hover:text-red-600 cursor-pointer text-lg"
                              >
                                <MdDelete />
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                      {/* Optional HR divider */}

                      <SheetFooter>
                        <SheetClose asChild>
                          <a href="/Checkout">
                            {" "}
                            <Button
                              className="bg-black text-white w-full"
                              type="submit"
                            >
                              <MdShoppingCartCheckout /> Check Out
                            </Button>
                          </a>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </li>
                {/* Login Form Dialog */}
                <Dialog
                  open={openLogin}
                  onOpenChange={(openLogin) => dispatch(closeLoginDialog())}
                >
                  <div className="flex justify-center gap-3 ">
                    <DialogTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(openLoginDialog());
                          console.log("Login Dialog Opened");
                        }}
                        className="py-5 text-black "
                      >
                        <span className=" mt-2 border rounded-md hover:bg-gray-400 hover:text-white  px-4 py-2">
                          Login{" "}
                        </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white">
                      <DialogHeader hidden>
                        <DialogTitle>Sign Up</DialogTitle>
                        <DialogDescription>
                          Create an account to enjoy exclusive benefits.
                        </DialogDescription>
                      </DialogHeader>
                      <LoginForm />
                    </DialogContent>
                  </div>
                </Dialog>
                {/* Login Form Dialog */}
                {/* SignUp Form Dialog */}
                <Dialog
                  open={openSignUp}
                  onOpenChange={(openSignUp) => dispatch(closeSignUpDialog())}
                >
                  <div className="flex justify-center gap-3 ">
                    <DialogTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(openSignUpDialog());
                        }}
                        className="py-5 text-black "
                      >
                        <span className=" mt-2 border rounded-md hover:bg-gray-400 hover:text-white  px-4 py-2">
                          Signup{" "}
                        </span>
                      </button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px] bg-white">
                      <DialogHeader hidden>
                        <DialogTitle>Sign Up</DialogTitle>
                        <DialogDescription>
                          Create an account to enjoy exclusive benefits.
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <SignUpForm />
                      </div>
                    </DialogContent>
                  </div>
                </Dialog>
                {/* SignUp Form Dialog */}
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            <div className="lg:hidden bg-white shadow-md mt-2 rounded-md absolute w-full left-0">
              <ul className="flex flex-col text-center py-2">
                <li className="py-2 border-b">
                  <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </NavLink>
                </li>
                <li className="py-2 border-b">
                  <NavLink to="/wp-admin" onClick={() => setIsMenuOpen(false)}>
                    Admin Panel
                  </NavLink>
                </li>

                <li className="py-2 border-b">
                  <NavLink to="/shop" onClick={() => setIsMenuOpen(false)}>
                    Shop
                  </NavLink>
                </li>
                <li className="py-2 border-b">
                  <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                    About
                  </NavLink>
                </li>
                <li className="py-2 border-b">
                  <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
                    Contact
                  </NavLink>
                </li>
                <li className="flex justify-center gap-3 py-2 ">
                   {/* Login Form Dialog */}
                <Dialog
                  open={openLogin}
                  onOpenChange={(openLogin) => dispatch(closeLoginDialog())}
                >
                  <div className="flex justify-center gap-3 ">
                    <DialogTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(openLoginDialog());
                          console.log("Login Dialog Opened");
                        }}
                        className="py-5 text-black "
                      >
                        <span className=" mt-2 border rounded-md hover:bg-gray-400 hover:text-white  px-4 py-2">
                          Login{" "}
                        </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white">
                      <DialogHeader hidden>
                        <DialogTitle>Sign Up</DialogTitle>
                        <DialogDescription>
                          Create an account to enjoy exclusive benefits.
                        </DialogDescription>
                      </DialogHeader>
                      <LoginForm />
                    </DialogContent>
                  </div>
                </Dialog>
                {/* Login Form Dialog */}
                {/* SignUp Form Dialog */}
                <Dialog
                  open={openSignUp}
                  onOpenChange={(openSignUp) => dispatch(closeSignUpDialog())}
                >
                  <div className="flex justify-center gap-3 ">
                    <DialogTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(openSignUpDialog());
                        }}
                        className="py-5 text-black "
                      >
                        <span className=" mt-2 border rounded-md hover:bg-gray-400 hover:text-white  px-4 py-2">
                          Signup{" "}
                        </span>
                      </button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px] bg-white">
                      <DialogHeader hidden>
                        <DialogTitle>Sign Up</DialogTitle>
                        <DialogDescription>
                          Create an account to enjoy exclusive benefits.
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <SignUpForm />
                      </div>
                    </DialogContent>
                  </div>
                </Dialog>
                {/* SignUp Form Dialog */}
                </li>

                {/* Mobile Auth Buttons */}
                {isAuthenticated ? (
                  <li className="py-2">
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white rounded-md hover:bg-red-600 text-sm px-4 py-2"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;


// const CartItems = useSelector((state) => state.cart.cartItems);
// const totalCartItems = CartItems.reduce((acc, item) => acc + item.quantity, 0);
// const cartCount = CartItems.reduce((acc, item) => acc + item.quantity, 0);
// console.log("Cart Count:", cartCount); // Log the cart count

// console.log(CartItems[0]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage mobile menu state



//   useEffect(() => {
//     const token = Cookies.get("token");
//     console.log("token" + token);

//     setIsAuthenticated(!!token); // Convert token to boolean
//   }, [Cookies.get("token")]); // Dependency array to re-run effect when token changes

//   const handleLogout = () => {
//     Cookies.remove("token");
//     setIsAuthenticated(false);
//     // Redirect to login page after logout
//   };


// div className="relative">
//                           <FaShoppingCart />
//                           {totalCartItems > 0 && (
//                             <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                               {totalCartItems}
//                             </span>
//                           )}
//                         </div>



// clothbackend-oookieeoa-aarijs-projects-e50dbb08.vercel.app