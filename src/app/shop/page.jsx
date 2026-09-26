import ShopPage from '@/PageComponents/ShopPage'
import React from 'react'


export async function generateMetadata({ params, searchParams }, parent) {
  let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/seoData`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  })
  response = await response.json()
  let data = response.find(x => x.url === "/shop")
  return {
    title: data?.title ?? "ShopMart - Shop",
    description: data?.description ?? "",
    keywords: data.keywords?.split(",") || []
  }
}

export default function page() {
    return (
        <ShopPage />
    )
}
