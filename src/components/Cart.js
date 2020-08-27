import React from 'react'
import CartItem from './CartItem'

const Cart = (props) => {
  return (
    <div className="cart-container">
      <div className="cart">
        <h2>Your Cart</h2>
        {props.cart.items.map(element => {
          return (
            <CartItem
              changeQuantity={props.changeQuantity}
              removeFromCart={props.removeFromCart}
              key={element.cartId}
              data={element} />
          )
        })}
        {/*.map goes here */}
      </div>
      <div className="total">
        Your total: ${props.cart.total}
        {/* Doesn't take any arguments and it is bound. So we don't need an arrow function on this onClick. Also not an invocation. */}
        <button onClick={props.checkout}>Checkout</button>
      </div>
    </div>
  )
}
export default Cart
