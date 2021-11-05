import mime from 'mime-types'
import { getImages } from '../api/pixabay.js'

import { createImage } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions } from '../model/imageGeneration.js'

export const imageByExtensionDimenstionUrl = (req, res, next) => {
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
}
