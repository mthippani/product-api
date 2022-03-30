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
    return res.status(200).json(product)
  }
  return res.status(404).json({errorMessage:`No records found with given id : ${id}`});
})

/**
 * Creating the product
 */
router.post('/', async function (req, res) {
  try {
    await productSchema.validateAsync(req.body)
    let product =req.body;
    let products = productService.insertProduct(product);
    return res.status(201).json(products)
    } catch(err) {
    return res.status(404).json({errorMessage:err.message})
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
    let product = productService.updateProduct(parseInt(id),updatedProduct)
    if(product){
      return res.status(200).json(product);
    }
    else{
      return res.status(404).json({errorMessage:`No records found with given id : ${id}`})
    }
  } catch(err) {
    return res.status(404).json({errorMessage:err});
  }
})

/**
 * Delete the product for given id
 */
router.delete('/:id', function (req, res) {
  let id =req.params.id;
  let index = productService.deleteProduct(parseInt(id))
  if(index>=0){
    return res.status(202).json({});
  }
  return res.status(404).json({errorMessage:`No records found with given id : ${id}`})
})

export default router