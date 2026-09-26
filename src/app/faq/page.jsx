import FaqPage from '@/PageComponents/FaqPage'
import React from 'react'

export async function generateMetadata({ params, searchParams }, parent) {
  let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/seoData`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  })
  response = await response.json()
  let data = response.find(x => x.url === "/faq")
  return {
    title: data?.title ?? "ShopMart - Faq",
    description: data?.description ?? "",
    keywords: data.keywords?.split(",") || []
  }
}
export default function page() {
  return (
    <FaqPage/>
  )
}
