import { fetchImageFromPixabay } from '../api/pixabay.js'

export const configImageByExtensionDimensionUrl = _ => {
  return {
    generationType: 'fromUrl',
    fetchImageFromUrl: async (...arg) => {
      return await fetchImageFromPixabay(...arg)
    }
  }
}
