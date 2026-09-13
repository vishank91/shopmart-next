import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    let [data, setData] = useState({})
    let navigate = usenavigate.push()

    useEffect(() => {
        (async () => {
            let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            if (response)
                setData(response)
            else
                navigate.push("/login")
        })()
    }, [])
    return (
        <>
            <table className='table table-bordered text-dark'>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{data.username}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{data.email}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{data.phone}</td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td>{data.role}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
