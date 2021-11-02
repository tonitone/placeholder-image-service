/**
 *
 * @param {*} params
 * @returns
 */
export const getParameters = (params) => {
  const regex = /\/(\w{3,4})\/(\d+)x(\d+)\/((bgcolor:(.{6}))*)/
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
