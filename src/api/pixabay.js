import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
const fetchedImageUrl = []

/**
 * It takes a query string and an API key as parameters, and returns an array of image URLs
 * @param {string} queryString - The search term you want to search for.
 * @param {string} apiKey - Your Pixabay API key
 * @returns {object} An array of image URLs
 */
export async function fetchImageFromPixabay (queryString, isSingleResult = true) {
  try {
    const apiKeyFilePath = path.resolve('src/api/pixabay.api-key.json')
    const apiKey = await JSON.parse(fs.readFileSync(apiKeyFilePath, { encoding: 'utf-8' })).apiKey || ''

    const url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + queryString

    const response = await fetch(url)
    const data = await response.json()
    if (parseInt(data.totalHits) === 0) {
      console.log('no images found')
      return false
    }
    let counter = 0
    Object.entries(data.hits).forEach(element => {
      fetchedImageUrl[counter++] = element[1].largeImageURL
    })
    return isSingleResult ? fetchedImageUrl[0] : fetchedImageUrl
  } catch (e) {
    console.log('Catch an error: ', e)
  }
}
