"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const AdminNewsletterPage = dynamic(() => import("@/PageComponents/Admin/Newsletter/AdminNewsletterPage"), { ssr: false })
export default function page() {
  return (
    <AdminNewsletterPage />
  )
}
