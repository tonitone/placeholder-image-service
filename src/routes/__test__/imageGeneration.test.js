import supertest from 'supertest'
import { server } from '../../server'
import { jest } from '@jest/globals'

const routesToTest = [
  // '/',
  '/placeholder',
  '/png/200x100'
  // '/png/200x100/color/990000'
]

let agent, app

jest.mock('jimp', () => {
  return {
    read: jest.fn().mockImplementation()
  }
})

describe('Test the routes', () => {
  describe.each(routesToTest)('Test the response :', (route) => {
    jest.useFakeTimers()
    describe(route, () => {
      it('should get 200', async () => {
        await agent.get(route)
          .then(response => {
            expect(response.statusCode).toEqual(200)
          })
      })
    })
  })
})

beforeEach((done) => {
  app = server.listen(4000, (err) => {
    if (err) return done(err)
    agent = supertest.agent(app) // since the application is already listening, it should use the allocated port
    done()
  })
})

afterEach((done) => {
  return app && app.close(done)
})

// https://github.com/visionmedia/supertest/issues/520#issuecomment-469044925
afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500)) // avoid jest open handle error
})
