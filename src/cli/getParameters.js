/**
 *
 * @param {*} params
 * @returns
 */
export const getParameters = (params) => {
  const regex = /\/(\w{3,4})\/(\d+)x(\d+)\/((layout:blank)(,color:(.{6}))(,bg-color:(.{6}))*)/
  const matches = params.match(regex)

  if (matches === null) {
    return { error: 'no usable parameters found' }
  }

  return {
    extension: matches[1],
    dimension: {
      width: matches[2],
      height: matches[3]
    },
    layout: matches[5],
    color: matches[7],
    backgroundColor: matches[9]
  }
}
