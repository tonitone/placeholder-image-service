import mime from 'mime-types'

import { createImage } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions } from '../model/imageGeneration.js'

export const imageByPlaceholder = (req, res) => {
  extractRequestParametersToCreateImageOptions({
    dimension: '1x1',
    extension: 'png'
  })

  createImageOptions.callbackOnGeneratedResponseObject = res

  res
    .status(200)
    .contentType(mime.lookup(createImageOptions.extension))
  createImage(createImageOptions)
}
