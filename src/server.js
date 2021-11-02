import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import express from 'express'
import mime from 'mime-types'
import swaggerUi from 'swagger-ui-express'
import { createImage } from './createImage.js'

/**
 *
 * @param {object} dimension
 */
export const returnDimensions = dimension => {
  const dimensions = dimension.split('x')
  return {
    width: dimensions[0],
    height: dimensions[1]
  }
}
/**
 *
 * @param {object} parameters request parameters "req.params"
 */
export const extractRequestParametersToCreateImageOptions = parameters => {
  createImageOptions = Object.assign(createImageOptions, parameters)
  createImageOptions.dimensions = returnDimensions(parameters.dimension)
}
const expressPort = 8000
const jimpOptions = {}
let createImageOptions = {
  extension: 'png',
  dimensions: {
    width: 1,
    height: 1
  },
  backgroundColor: 'cccccc',
  textColor: '000000',
  storePath: './public/image-store',
  /**
   *
   * @param {object} options
   */
  callbackOnGenerated: (options) => {
    options.responseObject.sendFile(
      path.resolve(options.imagePath),
      jimpOptions
    )
  },
  callbackOnGeneratedResponseObject: null
}

const swaggerDocument = YAML.parse(
  fs.readFileSync('./swagger.yml', 'utf8')
)
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// public folder
app.use('/public', express.static('./public'))

// swagger stuff
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
  return res.status(200).send({
    success: 'true',
    message: ':-D'
  })
})

app.get('/placeholder', (req, res) => {
  extractRequestParametersToCreateImageOptions({
    dimension: '1x1',
    extension: 'png'
  })

  createImageOptions.callbackOnGeneratedResponseObject = res

  res
    .status(200)
    .contentType(mime.lookup(createImageOptions.extension))
  createImage(createImageOptions)
})

app.get('/:extension/:dimension', (req, res) => {
  if (req.params.extension === 'gif') {
    return res.status(200).send({
      success: 'false',
      message: 'we don\'t support gif'
    })
  }

  extractRequestParametersToCreateImageOptions(req.params)

  createImageOptions.callbackOnGeneratedResponseObject = res

  res
    .status(200)
    .contentType(mime.lookup(req.params.extension))
  createImage(createImageOptions)
})

app.get('/:extension/:dimension/:backgroundColor', (req, res) => {
  extractRequestParametersToCreateImageOptions(req.params)

  createImageOptions.callbackOnGeneratedResponseObject = res

  res
    .status(200)
    .contentType(mime.lookup(req.params.extension))
  createImage(createImageOptions)
})
app.listen(expressPort)
