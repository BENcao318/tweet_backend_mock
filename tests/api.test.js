const request = require('supertest')
const baseURL = 'http://localhost:8080'

describe('GET /', () => {
  it('should return 200', async () => {
    const response = await request(baseURL).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.body.error).toBe(undefined)
  })
  it('should return Hi', async () => {
    const response = await request(baseURL).get('/')
    expect(response.body.message).toBe('Hi')
  })
})
