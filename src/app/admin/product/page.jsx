"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const AdminProductPage = dynamic(() => import("@/PageComponents/Admin/Product/AdminProductPage"), { ssr: false })
export default function page() {
  return (
    <AdminProductPage />
  )
}
