"use client"
import React from 'react'
import Link from 'next/link'

export default function AdminSidebar() {
    return (
        <>
            <div className="list-group">
                <Link href="/admin" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-house-door fs-5'></i> <span className='float-end'>Home</span></Link>
                <Link href="/admin/maincategory" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-card-checklist fs-5'></i> <span className='float-end'>Maincategory</span></Link>
                <Link href="/admin/subcategory" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-list fs-5'></i> <span className='float-end'>Subcategory</span></Link>
                <Link href="/admin/brand" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-list-ul fs-5'></i> <span className='float-end'>Brand</span></Link>
                <Link href="/admin/product" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-bookmark-check fs-5'></i> <span className='float-end'>Product</span></Link>
                <Link href="/admin/feature" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-bookmarks fs-5'></i> <span className='float-end'>Feature</span></Link>
                <Link href="/admin/faq" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-question-square fs-5'></i> <span className='float-end'>Faq</span></Link>
                <Link href="/admin/setting" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-gear fs-5'></i> <span className='float-end'>Setting</span></Link>
                <Link href="/admin/newsletter" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-envelope fs-5'></i> <span className='float-end'>Newsletter</span></Link>
                <Link href="/admin/contact" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-telephone fs-5'></i> <span className='float-end'>Contact Us</span></Link>
                <Link href="/admin/checkout" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-bag-check fs-5'></i> <span className='float-end'>Checkout</span></Link>
                {typeof localStorage !== "undefined" && localStorage.getItem("role") === "Super Admin" ? <Link href="/admin/user" className="list-group-item list-group-item-action active mb-1" aria-current="true"><i className='bi bi-people fs-5'></i> <span className='float-end'>User</span></Link> : null}
            </div>
        </>
    )
}
