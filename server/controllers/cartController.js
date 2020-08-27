const products = require('../data.json')

const cart = { total: 0, items: [] }
let cartId = 0

const updateCartTotal = () => {
  //Takes price and times by quantity using reduce. Sets them equal to total. 
  const total = cart.items.reduce((acc, element) => {
    return acc + (element.price * element.quantity)
  }, 0)
  //Takes total and sets global total to total. 
  cart.total = total.toFixed(2)
}


module.exports = {
  getCart: (req, res) => {
    res.status(200).send(cart)
  },
  addToCart: (req, res) => {
    const { productId, quantity } = req.body

    //* Checks if specific item is already in our cart. 
    const index = cart.items.findIndex((element) => element.id === +productId)

    //* If the item is not in our cart. Then set up a new cart item. (Find product, give it cartId, increase quantity)
    if (index === -1) {
      const product = products.find(element => element.id === +productId)

      //Assigns properties to product to keep track of them in the cart items array. 
      product.cartId = cartId
      product.quantity = +quantity

      cart.items.push(product)

      cartId++
    } else {
      //*If an item is already in the cart.... or if its not - 1. IOW, increase quantity
      cart.items[index].quantity += +quantity
    }

    updateCartTotal()
    res.status(200).send(cart)
  },
  changeQuantity: (req, res) => {
    const { cart_id } = req.params
    const { action } = req.query

    const index = cart.items.findIndex((element) => element.cartId === +cart_id)

    //What happens if a bad card id gets sent. 
    if (index === -1) {
      return res.status(404).send('Product not in cart')
    }
    //add to Quantity
    if (action === 'up') {
      cart.items[index].quantity += 1
    } else {
      //Means there is more than 1. And not 0. 
      if (cart.items[index].quantity > 1) {
        cart.items[index].quantity -= 1
      } else {
        //Remove item from your cart. 
        cart.items.splice(index, 1)
      }
    }


    updateCartTotal()
    res.status(200).send(cart)
  },
  removeFromCart: (req, res) => {
    const { cart_id } = req.params

    const index = cart.items.findIndex((element) => element.cartId === +cart_id)

    if (index === -1) {
      return res.status(404).send('Item not in cart')
    }
    cart.items.splice(index, 1)

    updateCartTotal()
    res.status(200).send(cart)

  },
  checkout: (req, res) => {
    cart.total = 0
    cart.items = []

    res.status(200).send(cart)
  }
}