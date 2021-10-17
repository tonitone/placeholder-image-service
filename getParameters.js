export const getParameters = (params) => {
  if (process.argv.length !== 2) {
    console.log('no arguments!')
    return false
  }
  const parameters = params || process.argv[2]
  const regex = /\/(\w{3,4})\/(\d+)x(\d+)\/((layout:blank)(,color:(.{6}))(,bg-color:(.{6})))\//
  const matches = parameters.match(regex)

  if (!Array.isArray(matches) || matches.length < 5) {
    console.log('wrong arguments!')
    return false
  }

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
