"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const AdminSeoDataPage = dynamic(() => import("@/PageComponents/Admin/SeoData/AdminSeoDataPage"), { ssr: false })
export default function page() {
  return (
    <AdminSeoDataPage />
  )
}
