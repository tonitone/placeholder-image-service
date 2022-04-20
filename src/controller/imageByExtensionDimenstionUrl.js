import fs from 'fs'
import path from 'path'
import { getImages } from '../api/pixabay.js'

import { createImage } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions, returnGifNotAllowedResponse } from '../model/imageGeneration.js'
import { returnFileName } from '../model/fileName.js'

export const imageByExtensionDimenstionUrl = async (req, res, next) => {
  returnGifNotAllowedResponse(req, res)

  extractRequestParametersToCreateImageOptions(req.params)

  createImageOptions.callbackOnGeneratedResponseObject = res

  createImageOptions.generationType = 'fromUrl'

  createImageOptions.fileNameSuffix = 'search_' + req.params.queryString
  createImageOptions.fileName = returnFileName(createImageOptions)

  try {
    const apiKeyFilePath = path.resolve('src/api/pixabay.api-key.json')
    const apiKey = JSON.parse(fs.readFileSync(apiKeyFilePath, { encoding: 'utf-8' })).apiKey || ''
    return getImages(req.params.queryString, apiKey).then(fetchedImageUrl => {
      function getRandomInt (max) {
        return Math.floor(Math.random() * max)
      }
      if (fetchedImageUrl.length < 1) {
        console.log('no images found')
      }

      createImageOptions.imageUrl = fetchedImageUrl[getRandomInt(fetchedImageUrl.length)]
      createImage(createImageOptions)
    })
  } catch (err) {
    next(err)
  }
}
