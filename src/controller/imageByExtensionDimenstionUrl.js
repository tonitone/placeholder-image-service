import fs from 'fs'
import path from 'path'
import { getImages } from '../api/pixabay.js'

import { createImage } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions, returnGifNotAllowedResponse } from '../model/imageGeneration.js'

export const imageByExtensionDimenstionUrl = async (req, res, next) => {
  returnGifNotAllowedResponse(req, res)

  extractRequestParametersToCreateImageOptions(req.params)

  createImageOptions.callbackOnGeneratedResponseObject = res

  createImageOptions.generationType = 'fromUrl'

  try {
    const apiKeyFilePath = path.resolve('src/api/pixabay.api-key.json')
    const apiKey = JSON.parse(fs.readFileSync(apiKeyFilePath, { encoding: 'utf-8' })).apiKey || ''
    return getImages(req.params.queryString, apiKey).then(fetchedImageUrl => {
      function getRandomInt (max) {
        return Math.floor(Math.random() * max)
      }

      createImageOptions.imageUrl = fetchedImageUrl[getRandomInt(fetchedImageUrl.length)]

      createImage(createImageOptions)
    })
  } catch (err) {
    next(err)
  }
}
