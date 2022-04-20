import { createImage, defaults } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions, returnGifNotAllowedResponse } from '../model/imageGeneration.js'
import { returnFileName } from '../model/fileName.js'

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
