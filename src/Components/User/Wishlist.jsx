import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'

import { getWishlist, deleteWishlist } from "../../Redux/ActionCreators/WishlistActionCreators"
export default function Wishlist() {
  let [data, setData] = useState([])

  let WishlistStateData = useSelector(state => state.WishlistStateData)
  let dispatch = useDispatch()

  function deleteRecord(id) {
    if (window.confirm("Are You Sure to Delete That Record")) {
      dispatch(deleteWishlist({ id: id }))
      setData(data.filter(x => x.id !== slug))
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getWishlist())
      if (WishlistStateData.length) {
        setData(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
        // setData(WishlistStateData)
      }
    })()
  }, [WishlistStateData.length])
  return (
    data.length ?
      <div className="table-responsive">
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Brand</th>
              <th>Color</th>
              <th>Size</th>
              <th>Stock</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => {
              return <tr key={item.id}>
                <td>
                  <Link href={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}${item.pic}`} target='_blank'>
                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}${item.pic}`} height={70} width={70} alt="" />
                  </Link>
                </td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.color?.join(", ")}</td>
                <td>{item.size?.join(", ")}</td>
                <td>{item.stockQuantity ? `${item.stockQuantity} Left In Stock` : 'Out of Stock'}</td>
                <td>&#8377;{item.price}</td>
                <td><Link href={`/product/${item.id}`} className='btn btn-primary'><i className='bi bi-cart-plus'></i></Link></td>
                <td><button className='btn btn-danger' onClick={()=>deleteRecord(item.id)}><i className='bi bi-x'></i></button></td>
              </tr>
            })}
          </tbody>
        </table>
      </div> :
      <div className='card p-5 text-center'>
        <h3>No Items in Wishlist</h3>
        <Link href="/shop" className='btn btn-primary w-25 m-auto'>Shop Now</Link>
      </div>
  )
}
