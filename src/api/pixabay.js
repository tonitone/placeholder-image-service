import fetch from 'node-fetch'

const apiKeyFilePath = './pixabay.api-key.js'
const apiKey = import(apiKeyFilePath).then(fileContent => {
  return fileContent.apiKey
}).catch(error =>
  console.error(apiKeyFilePath + ' not found!', error)
)

const fetchedImageUrl = []

/**
 *
 * @param {string} queryString
 * @returns {object} array of fetched images urls
 */
export const getImages = async queryString => {
  try {
    const url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + encodeURIComponent(queryString)

    await fetch(url).then(res => res.json()).then(data => {
      if (parseInt(data.totalHits) > 0) {
        let counter = 0
        Object.entries(data.hits).forEach(element => {
          fetchedImageUrl[counter++] = element[1].largeImageURL
        })
      }
    })
    return fetchedImageUrl
  } catch (e) {
    console.log('Catch an error: ', e)
  }
}
