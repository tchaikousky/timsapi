const express = require('express');
const router = express.Router();
const productModel = require('../models/ProductModel');
const cors = require('cors');

router.get('/', cors(), async function(req, res, next) {
    const product = await productModel.getAllProduct();

    res.json(product);
});

router.get('/search/:searchParam?', cors(), async function(req, res, next) {
  const { searchParam } = req.params;
  const products = await productModel.searchProduct(searchParam);
  console.log(req.params);
  res.json(products);
});

router.get('/:productId?', cors(), async function(req, res, next) {
  const { productId } = req.params;
  const product = await productModel.getSingleProduct(productId);

  res.json(product);
});



module.exports = router;