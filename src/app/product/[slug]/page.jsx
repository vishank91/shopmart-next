import ProductPage from '@/PageComponents/ProductPage'
import React from 'react'


export async function generateMetadata({ params, searchParams }, parent) {
    let slug = (await params).slug

    let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/product/${slug}`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    let product = await response.json()


    response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/seoData`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    response = await response.json()
    let data = response.find(x => x.url === "/product")
    let keywords = data.keywords.replaceAll("{{productName}}", product.name)
    keywords = keywords.replace("{{brand}}", data.brand)
    keywords = keywords.replace("{{category}}", data.maincategory + "/" + data.subcategory)
    return {
        title: data?.title?.replace("{{productName}}", product.name) ?? `ShopMart - ${product.name}`,
        description: data?.description?.replace("{{productName}}", product.name) ?? "",
        keywords: keywords || []
    }
}

export default function page() {
    return (
        <ProductPage />
    )
}
