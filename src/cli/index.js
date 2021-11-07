import { getParameters } from './getParameters.js'
import { createImage } from '../model/createImage.js'
import { createImageOptions } from '../model/imageGeneration.js'

const timerDescription = 'Image generated in'
const options = Object.assign({}, createImageOptions, getParameters(process.argv[2]))

if (process.argv.length !== 3) {
  console.log('no arguments!')
  console.log('test with this:')
  console.log('node index.js /png/640x480/color/ff0000')
  process.exit(1)
}

console.time(timerDescription)

options.storePath = './public/image-store'
options.isCli = true
options.callbackOnGenerated = _ => {
  console.timeEnd(timerDescription)
}

if (!options.error) {
  createImage(options)
}
