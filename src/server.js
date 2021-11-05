import express from 'express'

import { routeImageGeneration } from './routes/imageGeneration.js'
import { routeSwagger } from './routes/swagger.js'
const expressPort = 8000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({
    success: 'true',
    message: ':-D'
  })
})

// public folder
app.use('/public', express.static('./public'))
app.use('/', routeImageGeneration)
app.use('/api-docs', routeSwagger)

app.listen(expressPort)
