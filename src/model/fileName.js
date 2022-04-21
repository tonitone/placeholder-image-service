/**
 * It takes an object with a file name suffix, dimensions, and extension, and returns a file name with
 * the dimensions, suffix, and extension
 * @param {object} options
 * @returns {string} A string that is the file name of the image.
 */
export const returnFileName = (options) => {
  const findIllegalCharsExpression = /[/\\?%*:|"<>]/g
  const dimension = `${options.dimensions.width}x${options.dimensions.height}`
  const fileName = `${dimension}_${options.fileNameSuffix}.${options.extension}`
  return fileName.replace(findIllegalCharsExpression, '-')
}
