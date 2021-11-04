import { getParameters } from './getParameters.js'
import { createImage } from '../createImage.js'
const timerDescription = 'Image generated in'

if (process.argv.length !== 3) {
  console.log('no arguments!')
  console.log('test with this:')
  console.log('node index.js /png/640x480/color/ff0000')
  process.exit(1)
}

console.time(timerDescription)

const imageParameters = getParameters(process.argv[2])
imageParameters.storePath = './public/image-store'
imageParameters.isCli = true
imageParameters.callbackOnGenerated = _ => {
  console.timeEnd(timerDescription)
}

if (!imageParameters.error) {
  createImage(imageParameters)
}
