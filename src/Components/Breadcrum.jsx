import React from 'react'
import Link from 'next/link'

export default function Breadcrum({ title }) {
    return (
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6 wow fadeInUp" data-wow-delay="0.1s">{title}</h1>
            <ol className="breadcrumb justify-content-center mb-0 wow fadeInUp" data-wow-delay="0.3s">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <li className="breadcrumb-item active text-white">{title}</li>
            </ol>
        </div>
    )
}
