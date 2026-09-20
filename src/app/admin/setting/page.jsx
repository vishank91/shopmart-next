"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const AdminSettingPage = dynamic(() => import("@/PageComponents/Admin/Setting/AdminSettingPage"), { ssr: false })
export default function page() {
  return (
    <AdminSettingPage />
  )
}
