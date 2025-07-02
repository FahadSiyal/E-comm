import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRoutesFromElements, Route, Router } from "react-router-dom";
import Layout from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShopDetails from "./pages/shopDetails";


import { Provider } from "react-redux";

import LayoutSidebar from "./components/LayoutSidebar";
import Dashboard  from "./pages/dashboard";
import Users from "./pages/users";
import Products from "./pages/products";
import Orders from "./pages/orders";
import Shop from './pages/shop'
import ProductDesc from './pages/productDesc'
import MarketPlace from './pages/marketplace'
import { store } from "./redux/store";
import Checkout from "./pages/checkout";
import Collection from "./pages/collection";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Seller from "./pages/seller";
import ScrollToTop from "./components/ScrollToTop";
import BussinessDetails from "./pages/bussinessDetails";// Define router
import BankingDetails from "./pages/bankingDetails";
import ShopInventory from "./pages/shopInventory";
import Sellers from "./pages/sellerDashboard";
import Credentials from "./pages/credentials";
import SellerLayoutSidebar from "./components/SellerLayoutSidebar";
import ManufacturerDashboard from "./pages/manufacturerDashboard";
import SellerOrders from "./pages/SellerOrders"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDesc />} />
        <Route path="/marketplace" element={<MarketPlace />} />
   
        {/* <Route path="/shopInventory/:id" element={<shopInventory />} /> */}
      

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/collection" element={<Collection />} />

  
        {/* <Route path="/menu" element={<Menu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart/>} /> */}
      </Route>
     
        <Route path="/manufacturer" element={<Seller />} />
        <Route path="/shopdetails" element={<ShopDetails />} />
        <Route path="/bussinessdetails" element={<BussinessDetails />} />
        <Route path="/bankingdetails" element={<BankingDetails />} />
        <Route path="/seller-auth" element={<Credentials/>} />


      <Route path="/wp-admin" element={<LayoutSidebar />}>
        <Route path="" element={<Dashboard />} />
        {/* <Route path="users" element={<Users />} /> */}
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="seller" element={<Sellers/>} />
        {/* <Route path="seller" element={<sellerDashboard />} /> */}
      </Route>

      <Route path="/manufacturerdashboard" element={<SellerLayoutSidebar/>} >
 <Route path="" element={<ManufacturerDashboard/>} />
 <Route path="sellerorders" element={<SellerOrders/>} />
      <Route path="shopInventory" element={<ShopInventory />} />
      </Route>
      
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>

      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
