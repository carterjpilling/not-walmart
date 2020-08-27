import React from 'react'
import Product from './Product'

const Products = (props) => {
  //running map on products array
  return <div className="products">
    {props.products.map(element => {
      return <Product
        addToCart={props.addToCart}
        key={element.id}
        data={element} />
    })}</div>
}
export default Products
