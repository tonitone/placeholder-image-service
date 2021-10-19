import Jimp from 'jimp'

export const createImage = parameters => {
  const publicPath = './public/'
  const image = new Jimp(
    parameters.dimension.width,
    parameters.dimension.height,
    parameters.backgroundColor,
    (err, image) => {
      if (err) throw err
    })

  const fileName = `${parameters.dimension.width}_${parameters.dimension.height}_${parameters.backgroundColor}`
  const message = `${parameters.dimension.width} X ${parameters.dimension.height}`
  const x = 10
  const y = 10

  Jimp.loadFont(Jimp.FONT_SANS_14_BLACK)
    .then(font => {
      image.print(font, x, y, message)
      return image
    }).then(image => {
      const file = `${publicPath}/${fileName}.${image.getExtension()}`
      return image.write(file) // save
    })
}
