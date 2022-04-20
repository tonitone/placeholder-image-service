import { createImage, defaults } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions, returnGifNotAllowedResponse } from '../model/imageGeneration.js'
import { returnFileName } from '../model/fileName.js'

export const imageByExtensionDimensionColor = (req, res) => {
  returnGifNotAllowedResponse(req, res)

  extractRequestParametersToCreateImageOptions(req.params)

  createImageOptions.callbackOnGeneratedResponseObject = res

  createImageOptions.fileNameSuffix = 'color_' + defaults.backgroundColor
  createImageOptions.fileName = returnFileName(createImageOptions)

  return createImage(createImageOptions)
}
