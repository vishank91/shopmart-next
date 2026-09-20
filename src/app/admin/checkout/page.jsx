"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const AdminCheckoutPage = dynamic(() => import("@/PageComponents/Admin/Checkout/AdminCheckoutPage"), { ssr: false })
export default function page() {
  return (
    <AdminCheckoutPage />
  )
}
