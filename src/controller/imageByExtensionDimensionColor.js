import { createImage, defaults } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions, returnGifNotAllowedResponse } from '../model/imageGeneration.js'
import { returnFileName } from '../model/fileName.js'

/**
 * It creates a image with desired dimension, background color and returns it as a PNG
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns A function call from createImage
 */
export const imageByExtensionDimensionColor = (req, res) => {
  returnGifNotAllowedResponse(req, res)
  extractRequestParametersToCreateImageOptions(req.params)

  createImageOptions.callbackOnGeneratedResponseObject = res
  createImageOptions.fileNameSuffix = 'color_' + defaults.backgroundColor
  createImageOptions.fileName = returnFileName(createImageOptions)

  return createImage(createImageOptions)
}
