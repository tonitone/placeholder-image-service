import { createImage } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions, returnGifNotAllowedResponse } from '../model/imageGeneration.js'

export const imageByExtensionDimension = (req, res) => {
  returnGifNotAllowedResponse(req, res)

  extractRequestParametersToCreateImageOptions(req.params)

  return createImage(
    {
      ...createImageOptions,
      backgroundColor: 'efefef',
      textColor: 'ff0000',
      callbackOnGeneratedResponseObject: res
    }
  )
}
