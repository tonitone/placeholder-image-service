import { createImage, defaults } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions } from '../model/imageGeneration.js'
import { returnFileName } from '../model/fileName.js'

/**
 * It creates a 1x1 image with a background color of defaults.backgroundColor and returns it as a PNG
 * @param req - The request object
 * @param res - The response object from the request
 * @returns The function createImage is being returned.
 */
export const imageByPlaceholder = (req, res) => {
  extractRequestParametersToCreateImageOptions({
    dimension: '1x1',
    extension: 'png'
  })

  createImageOptions.callbackOnGeneratedResponseObject = res
  createImageOptions.fileNameSuffix = 'color_' + defaults.backgroundColor
  createImageOptions.fileName = returnFileName(createImageOptions)

  return createImage(createImageOptions)
}
