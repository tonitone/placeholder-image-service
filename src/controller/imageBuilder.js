import { createImage } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions, returnGifNotAllowedResponse } from '../model/imageGeneration.js'
import { returnFileName } from '../model/fileName.js'

/**
 * It creates and returns an image with the desired dimension and background color
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns A function call from createImage
 */
export const imageBuilder = async (req, res, config = {}) => {
  returnGifNotAllowedResponse(req, res)

  typeof req.params.dimension !== 'undefined' && extractRequestParametersToCreateImageOptions(req.params)

  if (config.generationType === 'fromUrl') {
    config.imageUrl = await config.fetchImageFromUrl(req.params.queryString, true)
    config.fileNameSuffix = 'search_' + req.params.queryString
  } else {
    config.fileNameSuffix = 'color_' + config.textColor || req.params.color
  }

  const mergedConfig = {
    ...createImageOptions,
    ...config
  }

  mergedConfig.callbackOnGeneratedResponseObject = res
  mergedConfig.fileName = returnFileName(mergedConfig)

  return createImage(mergedConfig)
}
