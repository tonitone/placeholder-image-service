/**
 *
 * @param {*} params
 * @returns
 */
export const getParameters = (params) => {
  const regex = /\/(\w{3,4})\/(\d+)x(\d+)\/((layout:blank)(,bg-color:(.{6}))*(,color:(.{6})))/
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
    layout: matches[5],
    backgroundColor: matches[7],
    color: matches[9]
  }
}
