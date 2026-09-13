import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'

import { getCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"
import { getTestimonial, createTestimonial, updateTestimonial } from "../../Redux/ActionCreators/TestimonialActionCreators"

const inputOptions = {
  message: "",
  star: "5"
}
export default function Orders() {
  let [orders, setOrders] = useState([])
  let [review, setReview] = useState([])

  let [showModal, setShowModal] = useState(false)
  let [option, setOption] = useState({})

  let [inputData, setInputData] = useState({ ...inputOptions })

  let CheckoutStateData = useSelector(state => state.CheckoutStateData)
  let TestimonialStateData = useSelector(state => state.TestimonialStateData)
  let dispatch = useDispatch()

  function create(product) {
    setShowModal(true)
    setOption({
      type: "Create",
      product: product
    })
    setInputData({ ...inputOptions })
  }

  function update(product) {
    setShowModal(true)
    setOption({
      type: "Update",
      product: product
    })
    setInputData({ ...review.find(x => x.product === product.id) })
  }

  function getInputData(e) {
    let { name, value } = e.target
    setInputData({ ...inputData, [name]: value })
  }

  async function postData(e) {
    e.preventDefault()
    if (option.type === "Create") {
      let item = {
        user: localStorage.getItem("userid"),
        username: localStorage.getItem("name"),
        product: option.product.id,
        productName: option.product.name,
        message: inputData.message,
        star: inputData.star
      }
      dispatch(createTestimonial(item))
      review.push(item)
      setReview(review)
    }
    else{
      let index = review.findIndex(x=>x.product===option.product.id)
      review[index].message = inputData.message
      review[index].star = inputData.star
      dispatch(updateTestimonial({...review[index]}))
      setReview(review)
    }
    setShowModal(false)
    setInputData(inputOptions)
  }

  function check(pid) {
    let item = review.find(x => x.product === pid)
    return item ? true : false
  }


  useEffect(() => {
    (() => {
      dispatch(getCheckout())
      if (CheckoutStateData.length) {
        setOrders(CheckoutStateData.filter(x => x.user === localStorage.getItem("userid")))
        // setOrders(CheckoutStateData)
      }
    })()
  }, [CheckoutStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getTestimonial())
      if (TestimonialStateData.length) {
        setReview(TestimonialStateData.filter(x => x.user === localStorage.getItem("userid")))
      }
    })()
  }, [TestimonialStateData.length])
  return (
    <>
      {orders.length ?
        <div className='my-3'>
          {orders.map(item => {
            return <div className='table-responsive' key={item.id}>
              <h5 className='bg-secondary text-center p-2 text-light'>Order Details</h5>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Order Status</th>
                    <th>Payment Mode</th>
                    <th>Payment Satus</th>
                    <th>Delivery Address</th>
                    <th>Subtotal</th>
                    <th>Shipping</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.orderStatus}</td>
                    <td>{item.paymentMode}</td>
                    <td>{item.paymentStatus}</td>
                    <td>
                      <div>
                        <p>{item.deliveryAddress?.name}</p>
                        <p>{item.deliveryAddress?.phone}, {item.deliveryAddress?.email}</p>
                        <p>{item.deliveryAddress?.address}</p>
                        <p>{item.deliveryAddress?.pin}, {item.deliveryAddress?.city}, {item.deliveryAddress?.state}</p>
                      </div>
                    </td>
                    <td>&#8377;{item.subtotal}</td>
                    <td>&#8377;{item.shipping}</td>
                    <td>&#8377;{item.total}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
              <h5 className='bg-primary text-center p-2 text-light'>Products In This Order</h5>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {item.products?.map(record => {
                    return <tr key={record.id}>
                      <td>
                        <Link href={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}${record.pic}`} target='_blank'>
                          <img src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}${record.pic}`} height={70} width={70} alt="" />
                        </Link>
                      </td>
                      <td>{record.name}</td>
                      <td>{record.brand}</td>
                      <td>{record.color}</td>
                      <td>{record.size}</td>
                      <td>&#8377;{record.price}</td>
                      <td>{record.quantity}</td>
                      <td>&#8377;{record.total}</td>
                      <td>
                        <div className="btn-group">
                          <Link href={`/product/${record.product}`} className='btn btn-primary'>Buy Again</Link>
                          {item.orderStatus === "Delivered" ?
                            check(record.product) ?
                              <button className='btn btn-primary' onClick={() => update({ id: record.product, name: record.name })}>Update Review</button> :
                              <button className='btn btn-secondary' onClick={() => create({ id: record.product, name: record.name })}>Write Review</button>
                            : null}
                        </div>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          })}
        </div> :
        <div className='card p-5 text-center'>
          <h3>No Order History Found</h3>
          <Link href="/shop" className='btn btn-primary w-25 m-auto'>Shop Now</Link>
        </div>}


      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} id="exampleModal">
        <div className="modal-dialog  modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{option.type}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={postData}>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label>Message*</label>
                    <textarea name="message" rows={8} required value={inputData.message} onChange={getInputData} placeholder='Message' className='form-control border-primary' />
                  </div>

                  <div className="col-12 mb-3">
                    <label>Star*</label>
                    <select name="star" value={inputData.star} onChange={getInputData} className='form-select'>
                      <option>5</option>
                      <option>4</option>
                      <option>3</option>
                      <option>2</option>
                      <option>1</option>
                    </select>
                  </div>

                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary w-100">{option.type}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
