import request from 'supertest'
import { app } from '../../server'
import { jest } from '@jest/globals'
jest.useFakeTimers()
const routesToTest = [
  '/',
  '/test',
  // '/placeholder',
  '/png/200x100'
  // '/png/200x100/color/990000'
]
jest.mock('jimp', () => {
  return {
    read: jest.fn().mockImplementation()
  }
})
describe('Test the routes', () => {
  test.each(routesToTest)('%s should response the GET method with status 200', (route, done) => {
    request(app)
      .get(route)
      .then(response => {
        expect(response.statusCode).toEqual(200)
      })
    done()
  })
})
