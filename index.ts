const express = require('express');
const swaggerUI = require('swagger-ui-express');
import swaggerDoc from './swagger';
import productRouter from './src/routes/product/product.route';

const cors = require('cors')
const app = express()
const bodyParser = require('body-parser').json()
app.use(bodyParser)
app.use(cors())
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))
app.use('/api/products',productRouter)
const hostname = 'localhost'
const port = 3000


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

app.use('/product', productRouter)
