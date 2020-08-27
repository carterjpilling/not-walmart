import React from 'react'

const CartItem = (props) => {
  const { cartId } = props.data
  return (
    <div className="cart-item">
      <img src={props.data.image} />
      <div>
        <p>{props.data.name}</p>
        <p>{props.data.quantity}</p>
        <p>${props.data.price}</p>
        <div className="button-hold">
          <button onClick={() => props.changeQuantity(cartId, 'down')}>
            -
            </button>
          <button onClick={() => props.removeFromCart(cartId)}>
            Remove
            </button>
          <button onClick={() => props.changeQuantity(cartId, 'up')}>
            +
            </button>
        </div>
      </div>
    </div >
  )
}
export default CartItem
