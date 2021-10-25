import { getParameters } from './getParameters.js'
import { createImage } from '../createImage.js'

if (process.argv.length !== 3) {
  console.log('no arguments!')
  console.log('test with this:')
  console.log('node index.js /png/640x480/layout:blank,color:000000,bg-color:ff0000/')
  process.exit(1)
}
console.time()

const imageParameters = getParameters(process.argv[2])
imageParameters.storePath = './public/image-store'
imageParameters.isCli = true

if (!imageParameters.error) {
  createImage(imageParameters).then(function () {
    console.log('done')
    console.timeEnd()
  })
}
