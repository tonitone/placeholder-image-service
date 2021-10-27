import Jimp from 'jimp'
import fs from 'fs'

const defaults = {
  storePath: '../public/image-store',
  backgroundColor: 'CCCCCC'
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
    console.log('Image exists, we won\'t generate a new one!')
    console.log('You could delete all images. Use: yarn run deletePublicImageStore')
  }

  const image = new Jimp(
    options.dimension.width,
    options.dimension.height,
    options.backgroundColor,
    (err, image) => {
      if (err) throw (err)
    })

  Jimp.loadFont(Jimp.FONT_SANS_8_BLACK)
    .then(font => {
      image.print(font, x, y, message)
      return image
    }).then(image => {
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
        }
      )
    })
}
