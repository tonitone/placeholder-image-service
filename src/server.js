import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import express from 'express'
import mime from 'mime-types'
import swaggerUi from 'swagger-ui-express'
import { createImage, getImagePath } from './createImage.js'

/**
 *
 * @param {object} dimension
 */
export const setImageDimension = dimension => {
  const dimensions = dimension.split('x')
  createImageOptions.dimension = {
    width: dimensions[0],
    height: dimensions[1]
  }
}
const expressPort = 8000
const jimpOptions = {}
const createImageOptions = {
  extension: 'png',
  dimension: {
    width: 1,
    height: 1
  },
  storePath: './public/image-store'
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

app.get('/:extension/:dimension', (req, res, next) => {
  const fileName = path.resolve(path.resolve(getImagePath()))

  setImageDimension(req.params.dimension)
  createImageOptions.extension = req.params.extension

  createImage(createImageOptions).then(function () {
    res
      .status(200)
      .contentType(mime.lookup(req.params.extension))
      .sendFile(
        fileName,
        jimpOptions,
        function (err) {
          if (err) {
            next(err)
          } else {
            console.log('Sent:', fileName)
          }
        }
      )
  })
})

app.listen(expressPort)
