import fetch from 'node-fetch'
import { apiKey } from './pixabay.api-key.js'

if (apiKey.length < 1) {
  console.log('please set the api-key into pixabay.api-key.js')
  process.exit(1)
}

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
  // https://pixabay.com/api/?key=24156972-04014bc823371a47aaf2c0253&q=yellow+flowers&image_type=photo&pretty=true&order=latest
}
