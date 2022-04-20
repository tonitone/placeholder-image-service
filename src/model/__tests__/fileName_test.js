import { returnFileName } from '../fileName'

describe('returnFileName', () => {
  test('should generated a filename', () => {
    expect(
      returnFileName({
        dimensions: {
          height: '480',
          width: '640'
        },
        extension: 'png',
        fileNameSuffix: 'color_ff9900'
      })
    ).toEqual(
      '640x480_color_ff9900.png'
    )
  })

  test('should generate a correct filenme with illegal characters', () => {
    expect(
      returnFileName({
        dimensions: {
          height: '480',
          width: '640'
        },
        extension: 'png',
        fileNameSuffix: 'search_%&<>'
      })
    ).toEqual(
      '640x480_search_-&--.png'
    )
  })
})
