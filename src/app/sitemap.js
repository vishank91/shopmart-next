export default async function sitemap() {
    let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/product`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    response = await response.json()

    let productURL = response.map(x => {
        return {
            url: process.env.NEXT_PUBLIC_FRONT_END_URL + "/product/" + x.id,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        }
    })
    let urls = [
        {
            url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/shop`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/feature`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/faq`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/testimonial`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/contactus`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/tc`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${process.env.NEXT_PUBLIC_FRONT_END_URL}/refund-policy`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ].concat(productURL)

    return urls
}