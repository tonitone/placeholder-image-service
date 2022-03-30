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
 * @param {object} request
 * @param {object} response
 * @returns response
 */
export const returnGifNotAllowedResponse = (request, response) => {
  if (request.params.extension === 'gif') {
    return response.status(200).send({
      success: 'false',
      message: 'we don\'t support gif'
    })
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
