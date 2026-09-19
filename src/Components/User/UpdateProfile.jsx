import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
export default function UpdateProfile({ changeSearchParams }) {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: ""
  })
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    username: "",
    email: "",
    phone: ""
  })
  let [show, setShow] = useState(false)

  let navigate = useRouter()

  function getInputData(e) {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
    setErrorMessage({ ...errorMessage, [name]: TextValidators(e) })
  }
  async function postData(e) {
    e.preventDefault()

    let item = Object.values(errorMessage).find(x => x !== "")
    if (item) {
      setShow(true)
      return
    }

    //Remove Following Lines in Case of Real Backend
    let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/user`)
    response = await response.json()


    item = response.find(x => x.id !== data.id && (x.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.email?.toLocaleLowerCase()))
    if (item) {
      setErrorMessage({
        ...errorMessage,
        username: item.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() ? "Username Already Taken" : "",
        email: item.email?.toLocaleLowerCase() === data.email?.toLocaleLowerCase() ? "Email Address Already Taken" : "",
      })
      setShow(true)
      return
    }
    // Till This Line

    response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/user/${data.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ ...data })
    })
    response = response.json()
    // if(response.status==="Done")
    changeSearchParams('Profile')
    // else{
    //     setErrorMessage({...errorMessage,...response.message})
    //     setShow(true)
    // }
  }

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
        setData({ ...data, ...response })
      else
        navigate.push("/login")
    })()
  }, [])
  return (
    <form onSubmit={postData}>
      <div className="row">
        <div className="col-lg-6 mb-3">
          <label>Full Name*</label>
          <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
          {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
        </div>

        <div className="col-lg-6 mb-3">
          <label>Phone Number*</label>
          <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
          {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
        </div>

        <div className="col-lg-6 mb-3">
          <label>Username*</label>
          <input type="text" name="username" value={data.username} onChange={getInputData} placeholder='Username' className={`form-control ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
          {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
        </div>

        <div className="col-lg-6 mb-3">
          <label>Email Address*</label>
          <input type="email" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
          {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
        </div>

        <div className="col-12 mb-3">
          <button type="submit" className='btn btn-primary w-100'>Update Profile</button>
        </div>
      </div>
    </form>
  )
}
