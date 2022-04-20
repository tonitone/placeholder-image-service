import { createImage, defaults } from '../model/createImage.js'
import { createImageOptions, extractRequestParametersToCreateImageOptions } from '../model/imageGeneration.js'
import { returnFileName } from '../model/fileName.js'

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
