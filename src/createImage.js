import Jimp from 'jimp'
import fs from 'fs'

const defaults = {
  storePath: '../public/image-store'
}

let imagePath = ''

export const getImagePath = _ => {
  return imagePath
}
export const setImagePath = path => {
  imagePath = path
}

/**
 *
 * @param {object} options
 * @returns
 */
export const createImage = async (options = {}) => {
  options = Object.assign(defaults, options)
  const fileName = `${options.dimension.width}_${options.dimension.height}_${options.backgroundColor}`
  const message = `${options.dimension.width} X ${options.dimension.height}`
  const x = 10
  const y = 10

  options.backgroundColor = options.backgroundColor || '000000ff'
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
      image.write(getImagePath()) // save
    })
}
