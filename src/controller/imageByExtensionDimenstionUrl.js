import mime from 'mime-types'
import fs from 'fs'
import path from 'path'
import { getImages } from '../api/pixabay.js'

import { createImage } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions } from '../model/imageGeneration.js'

export const imageByExtensionDimenstionUrl = async (req, res, next) => {
  extractRequestParametersToCreateImageOptions(req.params)
  createImageOptions.callbackOnGeneratedResponseObject = res

  createImageOptions.generationType = 'fromUrl'

  try {
    const apiKeyFilePath = path.resolve('src/api/pixabay.api-key.json')
    const apiKey = JSON.parse(fs.readFileSync(apiKeyFilePath, { encoding: 'utf-8' })).apiKey || ''
    getImages(req.params.queryString, apiKey).then(fetchedImageUrl => {
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
}
