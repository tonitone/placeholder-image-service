import path from 'path'

const jimpOptions = {}

/**
 *
 * @param {object} dimension
 */
export const returnDimensions = dimension => {
  const dimensions = dimension.split('x')
  return {
    width: dimensions[0],
    height: dimensions[1]
  }
}

/**
 *
 * @param {object} parameters request parameters "req.params"
 */
export const extractRequestParametersToCreateImageOptions = parameters => {
  createImageOptions = Object.assign(createImageOptions, parameters)
  createImageOptions.dimensions = returnDimensions(parameters.dimension)
}

export let createImageOptions = {
  extension: 'png',
  dimensions: {
    width: 1,
    height: 1
  },
  backgroundColor: 'cccccc',
  textColor: '000000',
  storePath: './public/image-store',
  /**
   *
   * @param {object} options
   */
  callbackOnGenerated: (options) => {
    options.responseObject.sendFile(
      path.resolve(options.imagePath),
      jimpOptions
    )
  },
  generationType: 'fromScratch',
  imageUrl: null,
  callbackOnGeneratedResponseObject: null
}
