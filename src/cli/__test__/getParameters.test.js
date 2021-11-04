import { getParameters } from '../getParameters'

describe('getParameters', () => {
  test('should contain no usable parameters', () => {
    const imageParameters = getParameters('/no matches/')
    expect(imageParameters.error).toBe('no usable parameters found')
  })
  test('should contain no usable parameters', () => {
    const imageParameters = getParameters('/png/640x480/color/ff0000')
    expect(
      imageParameters
    ).toEqual(
      {
        extension: 'png',
        dimensions: {
          width: '640',
          height: '480'
        },
        backgroundColor: 'ff0000'
      }
    )
  })
})
