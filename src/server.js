import express from 'express'

import { routeImageGeneration } from './routes/imageGeneration.js'
import { routeSwagger } from './routes/swagger.js'
export const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

server.get('/', (req, res) => {
  return res.status(200).send(
    {
      apiDocsUrl: '/api-docs',
      message: ':-D'
    })
})

// public folder
server.use('/api-docs', routeSwagger)
server.use('/public', express.static('./public'))
server.use('/', routeImageGeneration)

server.get('/test', (req, res) => {
  return res.status(200).json({ message: 'pass!' })
})
