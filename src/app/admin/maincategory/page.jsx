"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const AdminMaincategoryPage = dynamic(() => import("@/PageComponents/Admin/Maincategory/AdminMaincategoryPage"), { ssr: false })
export default function page() {
  return (
    <AdminMaincategoryPage />
  )
}
