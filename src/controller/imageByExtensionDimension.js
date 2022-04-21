import { createImage, defaults } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions, returnGifNotAllowedResponse } from '../model/imageGeneration.js'
import { returnFileName } from '../model/fileName.js'

/**
 * It creates a image with desired dimension, with a background color of defaults.backgroundColor and
 * returns it as a PNG
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns A function call from createImage
 */
export const imageByExtensionDimension = (req, res) => {
  returnGifNotAllowedResponse(req, res)
  extractRequestParametersToCreateImageOptions(req.params)

  createImageOptions.fileNameSuffix = 'color_' + defaults.backgroundColor
  createImageOptions.fileName = returnFileName(createImageOptions)

  return createImage(
    {
      ...createImageOptions,
      backgroundColor: defaults.backgroundColor,
      textColor: 'ff0000',
      callbackOnGeneratedResponseObject: res
    }
  )
}
