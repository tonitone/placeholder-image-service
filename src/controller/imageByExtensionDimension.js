import mime from 'mime-types'

import { createImage } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions } from '../model/imageGeneration.js'

export const imageByExtensionDimension = (req, res) => {
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
}
