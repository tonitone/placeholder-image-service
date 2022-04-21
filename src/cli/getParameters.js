/**
 * It takes a string of parameters, and returns an object with the extension, dimensions, and
 * background color
 * @param {string} params - the URL path that was requested
 * @returns {object} An object with the following properties:
 *   - extension: the file extension
 *   - dimensions: an object with the width and height
 *   - backgroundColor: the hex color code
 */
export const getParameters = (params) => {
  const regex = /\/(\w{3,4})\/(\d+)x(\d+)\/((color\/(.{6}))*)/
  const matches = params.match(regex)

  if (matches === null) {
    return { error: 'no usable parameters found' }
  }

  return {
    extension: matches[1],
    dimensions: {
      width: matches[2],
      height: matches[3]
    },
    backgroundColor: matches[6]
  }
}
