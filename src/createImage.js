import Jimp from 'jimp'
import fs from 'fs'
import { createImageCallback } from './server.js'

const defaults = {
  storePath: '../public/image-store',
  backgroundColor: '000000ff'
}

let imagePath = ''

/**
 *
 * @param {string} _
 * @returns {string}
 */
const getImagePath = _ => {
  return imagePath
}

/**
 *
 * @param {string} path
 */
export const setImagePath = path => {
  imagePath = path
}

/**
 *
 * @param {object} options
 * @returns
 */
export const createImage = (options = {}) => {
  options = Object.assign(defaults, options)
  const fileName = `${options.dimension.width}_${options.dimension.height}_${options.backgroundColor}`
  const message = `${options.dimension.width} X ${options.dimension.height}`
  const x = 10
  const y = 10

  setImagePath(`${options.storePath}/${fileName}.${options.extension}`)

  if (options.isCli && fs.existsSync(getImagePath())) {
    return true
  }

  const image = new Jimp(
    options.dimension.width,
    options.dimension.height,
    options.backgroundColor,
    (err, image) => {
      if (err) throw (err)
    })

  Jimp.loadFont(Jimp.FONT_SANS_14_BLACK)
    .then(font => {
      image.print(font, x, y, message)
      return image
    }).then(image => {
      image.write(
        getImagePath(),
        function () {
          if (options.callbackObject) {
            createImageCallback(options.callbackObject.response, getImagePath())
          }
        }
      )
    })
}
