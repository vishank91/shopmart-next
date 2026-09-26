"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import TextValidators from '../../../FormValidators/TextValidators'


import { createSeoData, getSeoData } from '../../../Redux/ActionCreators/SeoDataActionCreators'
export default function AdminSeoDataCreatePage() {
    let [data, setData] = useState({
        title: "",
        keywords: "",
        description: "",
        url: "",
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        title: "Seo Title Field is Mendatory",
        keywords: 'Seo Keywords Field is Mendatory',
        description: "Seo Description Field is Mendatory",
        url: "Page URL Field is Mendatory"
    })
    let [show, setShow] = useState(false)

    let SeoDataStateData = useSelector(state => state.SeoDataStateData)
    let dispatch = useDispatch()
    let navigate = useRouter()

    function getInputData(e) {
        let { name, value } = e.target

        setData({ ...data, [name]: name === "status" ? value === "1" ? true : false : value })
        setErrorMessage({ ...errorMessage, [name]: TextValidators(e) })
    }
    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let item = SeoDataStateData.find(x => x.url?.toLocaleLowerCase() === data.url?.toLocaleLowerCase())
            if (item) {
                setErrorMessage({ ...errorMessage, name: 'SeoData With This URL Already Exist' })
                setShow(true)
                return
            }
            dispatch(createSeoData({ ...data }))
            navigate.push("/admin/seoData")
        }
    }

    useEffect(() => {
        dispatch(getSeoData())
    }, [SeoDataStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light text-center p-2'>Create SeoData <Link href="/admin/seoData"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Seo Title*</label>
                                    <input type="text" name="title" onChange={getInputData} placeholder='Seo Title' className={`form-control ${show && errorMessage.title ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.title ? <p className='text-danger text-capitalize'>{errorMessage.title}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Keywords*</label>
                                    <textarea name="keywords" rows={3} onChange={getInputData} placeholder='Keywords' className={`form-control ${show && errorMessage.keywords ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.keywords ? <p className='text-danger text-capitalize'>{errorMessage.keywords}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Description*</label>
                                    <textarea name="description" rows={3} onChange={getInputData} placeholder='Description' className={`form-control ${show && errorMessage.description ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.description ? <p className='text-danger text-capitalize'>{errorMessage.description}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Page Url*</label>
                                    <input type="text" name="url" onChange={getInputData} placeholder='Page Url, Use / for Home Page' className={`form-control ${show && errorMessage.url ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.url ? <p className='text-danger text-capitalize'>{errorMessage.url}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Status</label>
                                    <select name="status" onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button type='submit' className='btn btn-primary w-100'>Create</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
