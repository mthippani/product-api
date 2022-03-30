import { productSchema } from "./product.schema"

const express = require('express')
const router = express()
const productService = require('../../service/product.service')

/**
 * Get all the products
 */
router.get('/', function (req, res) {
  res.send(productService.getAllProducts())
})

/**
 * Get the products by id
 */
router.get('/:id', function (req, res) {
  let id =req.params.id;
  let product = productService.getProductById(parseInt(id))
  if(product){
    res.send(product)
  }
  res.send(`No records found with given id : ${id}`)
})

/**
 * Creating the product
 */
router.post('/', async function (req, res) {
  try {
    await productSchema.validateAsync(req.body)
    let product =req.body;
    let products = productService.insertProduct(product);
    res.send(products)
    } catch(err) {
    res.send(err)
  }
})

/**
 * Update the product for given id
 */
router.put('/:id', async function (req, res) {
  let id =req.params.id;
  try {
    await productSchema.validateAsync(req.body)
    let updatedProduct =req.body;
    let product = productService.updatedProduct(parseInt(id),updatedProduct)
    if(product){
      res.send(product)
    }
  } catch(err) {
    res.send(err)
  }
  res.send(`No records found with given id : ${id}`)
})

/**
 * Delete the product for given id
 */
router.delete('/:id', function (req, res) {
  let id =req.params.id;
  let index = productService.deleteProduct(parseInt(id))
  if(index>=0){
    res.send({});
  }
  res.send(`No records found with given id : ${id}`)
})

export default router