import path from 'path'

const jimpOptions = {}

/**
 * It takes a string of the form `widthxheight` and returns an object with `width` and `height`
 * properties
 * @param {object} dimension An object with a width and height property.
 */
export const returnDimensions = dimension => {
  const dimensions = dimension.split('x')
  return {
    width: dimensions[0],
    height: dimensions[1]
  }
}

/**
 * It returns a response if the extension of the image is gif
 * @param {object} request
 * @param {object} response
 * @returns A function that returns a response if the extension is gif
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
 * @param {object} parameters request parameters "req.params"
 */
export const extractRequestParametersToCreateImageOptions = parameters => {
  createImageOptions = Object.assign(createImageOptions, parameters)
  createImageOptions.dimensions = returnDimensions(parameters.dimension)
}

/* Creating an object with the default values for the image generation. */
export let createImageOptions = {
  extension: 'png',
  dimensions: {
    width: 1,
    height: 1
  },
  storePath: './public/image-store',
  /**
   * A callback function that is called when the image is generated.
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
