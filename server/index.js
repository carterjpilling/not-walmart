const express = require('express')
const app = express()
const produceCtrl = require('./controllers/productsController')
const cartCtrl = require('./controllers/cartController')

const SERVER_PORT = 4040

app.use(express.json())

//* Product Endpoints
app.get('/api/products', produceCtrl.getAllProducts)

//*Cart Endpoints
app.get('/api/cart', cartCtrl.getCart)
app.post('/api/cart', cartCtrl.addToCart)
app.put('/api/cart/:cart_id', cartCtrl.changeQuantity)
app.delete('/api/cart/:cart_id', cartCtrl.removeFromCart)
app.delete('/api/cart', cartCtrl.checkout)


app.listen(SERVER_PORT, () =>
  console.log(`Not_Walmart lives on ${SERVER_PORT}`))