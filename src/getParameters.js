const isDebug = true

console.log('getParameters.js')

export const getParameters = (params) => {
  const regex = /\/(\w{3,4})\/(\d+)x(\d+)\/((layout:blank)(,color:(.{6}))(,bg\-color:(.{6}))*)/
  const matches = params.match(regex)

  if (matches.length < 5) {
    console.log('wrong arguments!')
    return false
  }

  if (isDebug) {
    console.log('-')
    console.log('extension', matches[1])
    console.log('dimension widht', matches[2])
    console.log('dimension height', matches[3])
    console.log('-')
    console.log('layout', matches[5])
    console.log('layout color', matches[7])
    console.log('layout background-color', matches[9])
    console.log('-')
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
