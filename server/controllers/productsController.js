const products = require('../data.json')

module.exports = {
  getAllProducts: (req, res) => {
    res.status(200).send(products)
  }
}