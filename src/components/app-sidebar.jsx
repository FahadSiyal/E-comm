import React from "react";
import { useEffect, useState } from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  ListIcon,
  FolderIcon,
  UsersIcon,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SlLogout } from "react-icons/sl";

const data = {
  user: {
    name: "aarij",
    email: "aarij@gmail.com",
    avatar: "./sample shirt.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/wp-admin",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Orders",
      url: "/wp-admin/orders",
      icon: ListIcon,
    },
    {
      title: "Products",
      url: "/wp-admin/products",
      icon: FolderIcon,
    },
    // {
    //   title: "Users",
    //   url: "/wp-admin/users",
    //   icon: IoIosPeople,
      
    // },
    {
      title: "Manufacturers",
      url: "/wp-admin/seller",
      icon: UsersIcon,
    },
  ],
};




export function AppSidebar(props) {
  const [isMobile, setIsMobile] = useState(false);


  const handleLogout = () => {
  localStorage.removeItem("adminToken");
  window.location.href = "/wp-admin";
};


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar collapsible="offcanvas" {...props}>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
                >
                
                  <NavLink to="/">
                    <img
                      src="./sample shirt.jpg"
                      alt=""
                      className="h-5 w-5 rounded-xl"
                    />
                    <span className="text-base font-semibold text-red-600">
                      Mera Brand 
                      
                    </span>
                  </NavLink>
                 
                  
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <NavMain items={data.navMain} />
          </SidebarContent>
          <div className="flex items-center px-5 gap-2 mb-6">
          <SlLogout />
<button onClick={handleLogout} className="text-gray-700 font-medium hover:underline">
  Logout
</button>
</div>
          {/* <SidebarFooter>
            <NavUser user={data.user} />
          </SidebarFooter> */}
        </Sidebar>
      )}
      {isMobile && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            <img
              src="./sample shirt.jpg"
              alt="avatar"
              className="h-8 w-8 rounded-full"
            />
            <span className="font-semibold text-red-600">Store Name</span>
          </div>

          <div className="ml-auto">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <span className="text-2xl font-bold">⋮</span>
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-64 p-4">
                <SheetHeader>
                  <h2 className="text-lg font-semibold ">Store</h2>
                </SheetHeader>

                <SidebarContent>
                  <NavMain items={data.navMain} />
                </SidebarContent>


              </SheetContent>
            </Sheet>
          </div>
        </nav>
      )}
    </>
  );
}
