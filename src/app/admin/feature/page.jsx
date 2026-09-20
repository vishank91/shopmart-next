"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const AdminFeaturePage = dynamic(() => import("@/PageComponents/Admin/Feature/AdminFeaturePage"), { ssr: false })
export default function page() {
  return (
    <AdminFeaturePage />
  )
}
