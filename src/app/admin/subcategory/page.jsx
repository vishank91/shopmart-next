"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const AdminSubcategoryPage = dynamic(() => import("@/PageComponents/Admin/Subcategory/AdminSubcategoryPage"), { ssr: false })
export default function page() {
  return (
    <AdminSubcategoryPage />
  )
}
