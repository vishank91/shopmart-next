"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const AdminUserPage = dynamic(() => import("@/PageComponents/Admin/User/AdminUserPage"), { ssr: false })
export default function page() {
  return (
    <AdminUserPage />
  )
}
