"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/services/axiosInstance"

export function ApprovalButton({ sellerId, initialStatus, onStatusChange }) {
  const [isApproved, setIsApproved] = useState(initialStatus)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      const newStatus = !isApproved

      // Update status in backend
      await axiosInstance.patch(`/seller/${sellerId}/approval`, {
        isApproved: newStatus,
      })

      setIsApproved(newStatus)
      onStatusChange?.(sellerId, newStatus)
    } catch (error) {
      console.error("Error updating seller status:", error)
      // You might want to show a toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleToggle}
      disabled={isLoading}
      variant={isApproved ? "default" : "destructive"}
      className={`
        ${isApproved ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}
        min-w-[100px]
      `}
    >
      {isLoading ? "Updating..." : isApproved ? "Approved" : "Pending"}
    </Button>
  )
}
