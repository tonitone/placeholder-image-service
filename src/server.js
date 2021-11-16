import express from 'express'

import { routeImageGeneration } from './routes/imageGeneration.js'
import { routeSwagger } from './routes/swagger.js'
export const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.get('/', (req, res) => {
  return res.status(200).send({
    success: 'true',
    message: ':-D'
  })
})

// public folder
server.use('/public', express.static('./public'))
server.use('/', routeImageGeneration)
server.use('/api-docs', routeSwagger)

server.get('/test', (req, res) => {
  return res.status(200).json({ message: 'pass!' })
})
