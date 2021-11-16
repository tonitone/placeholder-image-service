import Color from 'color'
import fs from 'fs'
import Jimp from 'jimp'
import mime from 'mime-types'

const defaults = {
  storePath: '../public/image-store',
  backgroundColor: 'cccccc',
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
 *
 * @param {object} image
 * @param {object} options
 * @returns {object}
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
        } else {
          options.callbackOnGenerated()
        }
      }
      options.callbackOnGeneratedResponseObject
        .status(200)
        .contentType(mime.lookup(options.extension))
    }
  )
}
/**
 *
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

  Jimp.loadFont(isLightBackground ? Jimp.FONT_SANS_8_BLACK : Jimp.FONT_SANS_8_WHITE)
    .then(font => {
      image.print(font, x, y, message)
      return image
    }).then(image => {
      return callbackWriteImage(image, options)
    })
}

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

const createImageFunctions = {
  fromScratch: createImageFromScratch,
  fromUrl: createImageFromUrl
}

/**
 *
 * @param {object} options
 */
export const createImage = (options = {}) => {
  options = Object.assign(defaults, options)
  options.fileName = `${options.dimensions.width}x${options.dimensions.height}_${options.backgroundColor}.${options.extension}`

  setImagePath(`${options.storePath}/${options.fileName}`)

  if (options.isCli && fs.existsSync(getImagePath())) {
    console.log('Image exists, we won\'t generate a new one!')
    console.log('You could delete all images. Use: yarn run deletePublicImageStore')
  }

  const createImageFunction = createImageFunctions[options.generationType]

  if (!createImageFunction) throw new Error('Invalid createImageFunction ' + options.generationType); return createImageFunction(options)
}