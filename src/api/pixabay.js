import fetch from 'node-fetch'
const fetchedImageUrl = []

/**
 * It takes a query string and an API key as parameters, and returns an array of image URLs
 * @param {string} queryString - The search term you want to search for.
 * @param {string} apiKey - Your Pixabay API key
 * @returns {object} An array of image URLs
 */
export const getImages = async (queryString, apiKey) => {
  try {
    const url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + queryString

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
