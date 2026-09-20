"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const AdminFaqPage = dynamic(() => import("@/PageComponents/Admin/Faq/AdminFaqPage"), { ssr: false })
export default function page() {
  return (
    <AdminFaqPage />
  )
}
