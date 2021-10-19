import { getParameters } from './getParameters.js'
import { createImage } from './createImage.js'

if (process.argv.length !== 3) {
  console.log('no arguments!')
  console.log('test with this:')
  console.log('node index.js /png/640x480/layout:blank,color:000000,bg-color:ff0000/')
  process.exit(1)
}

createImage(getParameters(process.argv[2]))
