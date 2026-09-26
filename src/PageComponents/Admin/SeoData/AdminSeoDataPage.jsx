"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'datatables.net-dt'
import "datatables.net-dt/css/dataTables.dataTables.min.css"

import Breadcrum from '../../../Components/Breadcrum'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getSeoData, deleteSeoData } from "../../../Redux/ActionCreators/SeoDataActionCreators"
export default function AdminSeoDataPage() {
    let [data, setData] = useState([])

    let SeoDataStateData = useSelector(state => state.SeoDataStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete That Record")) {
            dispatch(deleteSeoData({ id: id }))
            setData(data.filter(x => x.id !== slug))
        }
    }

    useEffect(() => {
        let time = (() => {
            dispatch(getSeoData())
            if (SeoDataStateData.length) {
                setData(SeoDataStateData)
                return setTimeout(() => new DataTable('#myTable'), 500)
            }
        })()
        return () => clearTimeout(time)
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
                        <h5 className='bg-primary text-light text-center p-2'>SeoData <Link href="/admin/seoData/create"><i className='bi bi-plus text-light float-end'></i></Link></h5>
                        <div className="table-responsive">
                            <table id='myTable' className='table table-bordered text-dark'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Title</th>
                                        <th>URL</th>
                                        <th>Keywords</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(item => {
                                        return <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.url}</td>
                                            <td>{item.keywords}</td>
                                            <td>{item.description}</td>
                                            <td>{item.status ? "Active" : "Inactive"}</td>
                                            <td><Link href={`/admin/seoData/update/${item.id}`} className='btn btn-primary'><i className='bi bi-pencil-square'></i></Link></td>
                                            <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-x'></i></button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
