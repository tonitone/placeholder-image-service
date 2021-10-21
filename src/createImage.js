import Jimp from 'jimp'
import fs from 'fs'

const storePath = './public/image-store'
let imagePath = ''

export const getImagePath = _ => {
  return imagePath
}

export const createImage = parameters => {
  return new Promise(function (resolve, reject) {
    const fileName = `${parameters.dimension.width}_${parameters.dimension.height}_${parameters.backgroundColor}`
    const message = `${parameters.dimension.width} X ${parameters.dimension.height}`
    const x = 10
    const y = 10

    parameters.backgroundColor = parameters.backgroundColor || '000000ff'
    imagePath = `${storePath}/${fileName}.${parameters.extension}`

    if (fs.existsSync(getImagePath())) {
      return true
    }
    const image = new Jimp(
      parameters.dimension.width,
      parameters.dimension.height,
      parameters.backgroundColor,
      (err, image) => {
        if (err) throw err
      })

    Jimp.loadFont(Jimp.FONT_SANS_14_BLACK)
      .then(font => {
        image.print(font, x, y, message)
        return image
      }).then(image => {
        return image.write(getImagePath()) // save
      })
  })
}
