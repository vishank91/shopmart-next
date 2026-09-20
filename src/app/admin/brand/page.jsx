"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const AdminBrandPage = dynamic(() => import("@/PageComponents/Admin/Brand/AdminBrandPage"), { ssr: false })
export default function page() {
  return (
    <AdminBrandPage />
  )
}
