import { Product } from "../models/product";

const filename = '../data/products.json'
let products = require(filename)

/**
 * Get the product for given id
 * @param id 
 * @returns product
 */
function getProductById(id:number):Product{
    return products.find(product=> product.id===id)
}

/**
 * Get all the products
 * @returns products
 */
function getAllProducts(){
    return products;
}

/**
 * Insert the product
 * @param product 
 * @returns product
 */
function insertProduct(product:Product){
    product.id=products[products.length-1]?.id||1;
    products.push(product);
    return product;
}

/**
 * Update the product with given body or payload
 * @param id number
 * @param updatedProduct 
 * @returns product
 */
function updateProduct(id:number, updatedProduct:Product){
    let index = products.findIndex(product=> product.id===id)
    products[index] = updatedProduct;
    return updatedProduct;
}

/**
 * Delete the product
 * @param id 
 * @returns index
 */
function deleteProduct(id:number){
    let index = products.findIndex(product=> product.id===id);
    console.log(index);
    if(index>=0){
        products.splice(index,1);
        console.log(products)
    }
    return index;
}


module.exports = {
    getProductById,
    getAllProducts,
    insertProduct, 
    updateProduct, 
    deleteProduct
}