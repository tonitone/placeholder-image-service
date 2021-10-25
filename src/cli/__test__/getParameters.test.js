import { getParameters } from '../getParameters'

describe('getParameters', () => {
  test('should contain no usable parameters', () => {
    const imageParameters = getParameters('/no matches/')
    expect(imageParameters.error).toBe('no usable parameters found')
  })
  test('should contain no usable parameters', () => {
    const imageParameters = getParameters('/png/640x480/layout:blank,color:000000,bg-color:ff0000/')
    expect(
      imageParameters
    ).toEqual(
      {
        extension: 'png',
        dimension: {
          width: '640',
          height: '480'
        },
        layout: 'layout:blank',
        color: '000000',
        backgroundColor: 'ff0000'
      }
    )
  })
})
