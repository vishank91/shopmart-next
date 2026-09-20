"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const AdminContactUsPage = dynamic(() => import("@/PageComponents/Admin/ContactUs/AdminContactUsPage"), { ssr: false })
export default function page() {
  return (
    <AdminContactUsPage />
  )
}
