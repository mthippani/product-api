const joi = require('joi')
const j2s = require('joi-to-swagger')
export const productSchema = joi.object().keys({
    name:  joi.string().min(3).max(500).required(),
    description:  joi.string().min(5).max(500).required(),
    price:   joi.number().precision(2).min(1).max(20000).required()
})
const schema = j2s(productSchema).swagger
export default schema