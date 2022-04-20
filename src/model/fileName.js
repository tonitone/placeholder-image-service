
/**
 * @param {object} options
 * @returns {string}
 */
export const returnFileName = (options) => {
  const findIllegalCharsExpression = /[/\\?%*:|"<>]/g
  const dimension = `${options.dimensions.width}x${options.dimensions.height}`
  const fileName = `${dimension}_${options.fileNameSuffix}.${options.extension}`
  return fileName.replace(findIllegalCharsExpression, '-')
}
