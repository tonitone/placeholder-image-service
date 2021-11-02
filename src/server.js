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
export const extraceRequestParametersToCreateImageOptions = parameters => {
  createImageOptions.dimension = returnDimensions(parameters.dimension)
  createImageOptions.extension = parameters.extension
  createImageOptions.backgroundColor = parameters.backgroundColor || null
  createImageOptions.textColor = parameters.textColor || null
}
const expressPort = 8000
const jimpOptions = {}
const createImageOptions = {
  extension: 'png',
  dimension: {
    width: 1,
    height: 1
  },
  backgroundColor: null,
  textColor: null,
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

/**
 *
 * @param {object} response
 * @param {string} fileName
 */
export const createImageCallback = (response, fileName) => {
  response.sendFile(
    path.resolve(fileName),
    jimpOptions
  )
  return false
}

app.get('/:extension/:dimension', (req, res) => {
  extraceRequestParametersToCreateImageOptions(req.params)

  createImageOptions.callbackOnGeneratedResponseObject = res

  res
    .status(200)
    .contentType(mime.lookup(req.params.extension))
  createImage(createImageOptions)
})

app.get('/:extension/:dimension/:backgroundColor/:textColor', (req, res) => {
  extraceRequestParametersToCreateImageOptions(req.params)

  createImageOptions.callbackOnGeneratedResponseObject = res

  res
    .status(200)
    .contentType(mime.lookup(req.params.extension))
  createImage(createImageOptions)
})

app.listen(expressPort)
