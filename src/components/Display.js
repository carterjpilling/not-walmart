import React, { Component } from 'react'
import Products from './Products'
import Cart from './Cart'
import axios from 'axios'

class Display extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      cart: { total: 0, items: [] },
    }
    this.addToCart = this.addToCart.bind(this)
    this.changeQuantity = this.changeQuantity.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.checkout = this.checkout.bind(this)
  }

  componentDidMount() {
    axios.get('/api/products').then(res => {
      axios.get('/api/cart').then(cartRes => {
        this.setState({
          products: res.data,
          cart: cartRes.data
        })
      })
    })
  }

  addToCart(id, quantity) {
    // Make a post request and here is your body object. 
    // We know we need two things, id and quantity because thats how the backend was set up. 
    axios.post('/api/cart', { productId: id, quantity }).then(res => {
      this.setState({
        cart: res.data,
      })
    })
  }

  changeQuantity(cartId, action) {
    //its a put because we are editting existing data
    axios.put(`/api/cart/${cartId}?action=${action}`).then(res => {
      this.setState({
        cart: res.data,
      })
    })
  }

  removeFromCart(cartId) {
    axios.delete(`/api/cart/${cartId}`).then((res) => {
      this.setState({
        cart: res.data,
      })
    })
  }

  checkout() {
    axios.delete('/api/cart').then((res) => {
      this.setState({
        cart: res.data,
      })
    })
  }

  render() {
    return (
      <div className="display">
        <Products
          addToCart={this.addToCart}
          products={this.state.products} />
        <Cart
          cart={this.state.cart}
          removeFromCart={this.removeFromCart}
          checkout={this.checkout}
          changeQuantity={this.changeQuantity} />
      </div>
    )
  }
}
export default Display
