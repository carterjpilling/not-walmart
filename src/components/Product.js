import React, { Component } from 'react'

class Product extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0,
    }
  }
  // This handler is assigned to the buttons down below.
  handleQuantityChange(action) {
    if (action === 'up') {
      this.setState({
        quantity: this.state.quantity + 1
      })
    } else {
      if (this.state.quantity > 0) {
        this.setState({
          quantity: this.state.quantity - 1,
        })
      }
    }
  }
  //Sets the 0 quantity inbetween the -/+ to 0. Visual goodness. 
  handleAddToCart() {
    this.props.addToCart(this.props.data.id, this.state.quantity)
    this.setState({
      quantity: 0,
    })
  }

  render() {
    return (
      <div className="product">
        {/* props from props. data from the data={element} on products.js, and image from the json object name */}
        <img src={this.props.data.image} />
        <p>{this.props.data.name}</p>
        <p>${this.props.data.price}</p>
        <div className="button-hold">
          <button onClick={() => this.handleQuantityChange('down')}>Quantity -</button>
          {/* readout of current quantity */}
          <p>{this.state.quantity}</p>
          <button onClick={() => this.handleQuantityChange('up')}>Quantity +</button>
        </div>
        {/* Curly brackets allow you to write JS, truthy means not zero*/}
        {this.state.quantity ? <button onClick={() => this.handleAddToCart()}>Add to Cart</button> : null}
      </div >
    )
  }
}
export default Product
