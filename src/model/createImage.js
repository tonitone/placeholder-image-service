import Color from 'color'
import fs from 'fs'
import Jimp from 'jimp'
import mime from 'mime-types'

export const defaults = {
  storePath: '../public/image-store',
  backgroundColor: 'efefef',
  fileName: null
}

let imagePath = ''

/**
 *
 * @returns {string} imagePath
 */
const getImagePath = () => {
  return imagePath
}

/**
 *
 * @param {string} path sets ths imagePath
 */
const setImagePath = path => {
  imagePath = path
}

/**
 * It writes the image to the file system and then calls the callback function if it exists
 * @param {object} image
 * @param {object} options
 * @returns The image is being returned.
 */
const callbackWriteImage = (image, options) => {
  return image.write(
    getImagePath(),
    function () {
      if (typeof options.callbackOnGenerated === 'function') {
        if (options.callbackOnGeneratedResponseObject) {
          options.callbackOnGenerated(
            {
              responseObject: options.callbackOnGeneratedResponseObject,
              imagePath: getImagePath()
            }
          )
          options.callbackOnGeneratedResponseObject
            .status(200)
            .contentType(mime.lookup(options.extension))
        } else {
          options.callbackOnGenerated()
        }
      }
    }
  )
}

/**
 * It creates a new image, writes a message to it, and then saves it to disk
 * @param {object} options image options for image generations
 */
const createImageFromScratch = (options) => {
  const message = `${options.dimensions.width} X ${options.dimensions.height}`
  const x = 1
  const y = 1

  const image = new Jimp(
    options.dimensions.width,
    options.dimensions.height,
    options.backgroundColor,
    (err) => {
      if (err) throw (err)
    }
  )
  const isLightBackground = Color('#' + options.backgroundColor).isLight()

  Jimp.loadFont(isLightBackground ? Jimp.FONT_SANS_16_BLACK : Jimp.FONT_SANS_16_WHITE)
    .then(font => {
      image.print(font, x, y, message)
      return image
    }).then(image => {
      return callbackWriteImage(image, options)
    })
}

/**
 * It creates an image from another image
 * @param {object} options
 */
const createImageFromUrl = (options) => {
  Jimp.read({
    url: options.imageUrl, // Required!
    headers: {}
  }).then(image => {
    image.cover(
      parseInt(options.dimensions.width),
      parseInt(options.dimensions.height),
      parseInt(Jimp.RESIZE_BILINEAR),
      function () {
        return callbackWriteImage(image, options)
      }
    )
    return image
  })
    .catch(err => {
      console.log(err)
    })
}

/**
 * If the image exists, send it to the browser
 * @param {string} imagePath - The path to the image on the server.
 * @param {object} imageOptions
 */
const returnExistingImage = (imagePath, imageOptions) => {
  fs.readFile(imagePath, function (err, data) {
    if (err) {
      throw err // Fail if the file can't be read.
    }
    imageOptions.callbackOnGeneratedResponseObject.writeHead(
      200,
      { 'Content-Type': mime.lookup(imageOptions.extension) }
    )
    imageOptions.callbackOnGeneratedResponseObject.end(data) // Send the file data to the browser.
  })
}

/* It's creating an object with two properties. The properties are the names of the functions that are
being passed in. */
const createImageFunctions = {
  fromScratch: createImageFromScratch,
  fromUrl: createImageFromUrl
}

/**
 * @param {object} options
 * @returns
 */
export const createImage = (options = {}) => {
  options = Object.assign(defaults, options)
  setImagePath(`${options.storePath}/${options.fileName}`)

  if (fs.existsSync(getImagePath())) {
    if (options.isCli) {
      console.log('Image exists, we won\'t generate a new one!')
      console.log(getImagePath())
      console.log('You could delete all images. Use: yarn run deletePublicImageStore')
    } else {
      returnExistingImage(getImagePath(), options)
    }
    return false
  }

  const createImageFunction = createImageFunctions[options.generationType]

  if (!createImageFunction) throw new Error('Invalid createImageFunction ' + options.generationType); return createImageFunction(options)
}
