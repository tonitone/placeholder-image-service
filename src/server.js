import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import express from 'express'
import mime from 'mime-types'
import swaggerUi from 'swagger-ui-express'
import { getImages } from './api/pixabay.js'
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
  generationType: null,
  imageUrl: null,
  callbackOnGeneratedResponseObject: null
}

const swaggerDocument = YAML.parse(
  fs.readFileSync('./swagger.yml', 'utf8')
)
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// csp
app.use(function (req, res, next) {
  res.setHeader('Content-Security-Policy', "default-src 'self' pixabay.com")
  return next()
})

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

app.get('/:extension/:dimension/color/:backgroundColor', (req, res) => {
  extractRequestParametersToCreateImageOptions(req.params)

  createImageOptions.callbackOnGeneratedResponseObject = res
  createImageOptions.generationType = 'fromScratch'
  res
    .status(200)
    .contentType(mime.lookup(req.params.extension))
  createImage(createImageOptions)
})

app.get('/:extension/:dimension/search/:queryString', (req, res, next) => {
  extractRequestParametersToCreateImageOptions(req.params)
  createImageOptions.callbackOnGeneratedResponseObject = res

  createImageOptions.generationType = 'fromUrl'

  try {
    getImages(req.params.queryString).then(fetchedImageUrl => {
      function getRandomInt (max) {
        return Math.floor(Math.random() * max)
      }

      createImageOptions.imageUrl = fetchedImageUrl[getRandomInt(fetchedImageUrl.length)]
      res
        .status(200)
        .contentType(mime.lookup(req.params.extension))
      createImage(createImageOptions)
    })
  } catch (err) {
    next(err)
  }
})
app.listen(expressPort)
