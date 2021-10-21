import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import express from 'express'
import mime from 'mime-types'
import swaggerUi from 'swagger-ui-express'
import { createImage, getImagePath } from './createImage.js'
const swaggerDocument = YAML.parse(
  fs.readFileSync('./swagger.yml', 'utf8')
)

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// public folder
app.use(express.static('../public'))

// swagger stuff
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
  return res.status(200).send({
    success: 'true',
    message: ':-D'
  })
})

app.get('/:extension/:dimension', async (req, res, next) => {
  const options = { }
  const dimension = req.params.dimension.split('x')
  const fileName = path.resolve(path.resolve(getImagePath()))
  await createImage({
    extension: req.params.extension,
    dimension: {
      width: dimension[0],
      height: dimension[1]
    }
  })
  res
    .status(200)
    .contentType(mime.lookup(req.params.extension))
    .sendFile(
    // path.resolve(getImagePath()),
      fileName,
      // { root: 'image-store' }
      options,
      function (err) {
        if (err) {
          next(err)
        } else {
          console.log('Sent:', fileName)
        }
      }
    )
  res.end(fileName, 'binary')
})

app.listen(8000)
