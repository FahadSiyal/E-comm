import React from "react" 
import { AppSidebar } from "../components/app-sidebar"         

import { SiteHeader } from "../components/site-header"
import { SidebarInset } from "../components/ui/sidebar"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { useEffect, useState } from "react"
import axiosInstance from "../services/axiosInstance"
import { ApprovalButton } from "../components/approval-button"

function Sellers() {
  const [sellers, setSellers] = useState([])

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axiosInstance.get("/seller")
        console.log(response.data)
        setSellers(response.data)
      } catch (error) {
        console.error("Error fetching sellers:", error)
      }
    }

    fetchSellers()
  }, [])

  const handleStatusChange = (sellerId, newStatus) => {
    setSellers((prevSellers) =>
      prevSellers.map((seller) => (seller._id === sellerId ? { ...seller, isApproved: newStatus } : seller)),
    )
  }

  return (
    <>
      <div className="">
        <div>
          <SidebarInset>
            <SiteHeader title="Sellers" />
            <div className="flex flex-1 flex-col bg-gray-100 ">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6"></div>
              </div>
            </div>
          </SidebarInset>
        </div>
        <div className="px-6">
          <Table className="bg-white rounded-md w-full">
            <TableCaption className="py-2">List of All Sellers</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] px-4 py-2 text-red-600">S.no</TableHead>
                <TableHead className="px-4 py-2 text-red-600">Shop Name</TableHead>
                <TableHead className="px-4 py-2 text-red-600">Email</TableHead>
                <TableHead className="px-4 py-2 text-red-600">Description</TableHead>
                <TableHead className="px-4 py-2 text-red-600">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sellers.length > 0 ? (
                sellers.map((seller, i) => (
                  <TableRow key={seller._id}>
                    <TableCell className="font-medium px-4 py-2">{i + 1}</TableCell>
                    <TableCell className="px-4 py-2">{seller.shopName}</TableCell>
                    <TableCell className="px-4 py-2">{seller.businessEmail}</TableCell>
                    <TableCell className="px-4 py-2">{seller.description}</TableCell>
                    <TableCell className="px-4 py-2">
                      <ApprovalButton
                        sellerId={seller._id}
                        initialStatus={seller.isApproved || false}
                        onStatusChange={handleStatusChange}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No Sellers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default Sellers
