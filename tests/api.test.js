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

describe('POST /users/signin', () => {
  const user = {
    username: 'test',
    password: '123',
  }
  it('should return 200', async () => {
    const response = await request(baseURL).post('/users/signin').send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.error).toBe(undefined)
  })
  it('should return Login success', async () => {
    const response = await request(baseURL).post('/users/signin').send(user)
    expect(response.body.message).toBe('Login success')
  })
})

describe('POST /users/register', () => {
  const newUser = {
    username: 'newuser4',
    password: '123',
  }
  it('should return 200 and message Signup success', async () => {
    const response = await request(baseURL)
      .post('/users/register')
      .send(newUser)
    expect(response.statusCode).toBe(200)
    expect(response.body.error).toBe(undefined)
    expect(response.body.message).toBe('Signup success')
  })

  it('should not allow new user with existing username', async () => {
    const response = await request(baseURL)
      .post('/users/register')
      .send(newUser)
    expect(response.statusCode).toBe(403)
    expect(response.body.message).toBe('Username already exist.')
  })
  it('should be able to login with new user credential', async () => {
    const response = await request(baseURL).post('/users/signin').send(newUser)
    expect(response.body.message).toBe('Login success')
  })
})

describe('GET /tweets/find?username=test', () => {
  const user = {
    username: 'test',
    password: '123',
  }

  it('should find all tweets with username', async () => {
    const response = await request(baseURL).get('/tweets/find?username=test')
    expect(response.body.message).toBe(
      'Successfully find the tweet with given username'
    )
    expect(response.body.tweetData).toBeTruthy()
  })
})

describe('POST /tweets/new to add new tweet in database', () => {
  const tweet = {
    title: 'titile3',
    content: 'testing3',
  }

  it('should not allow signed out user to create new tweet', async () => {
    const response = await request(baseURL).post('/tweets/new').send(tweet)
    expect(response.statusCode).toBe(500)
    expect(response.body.message).toBe(
      "Cannot read properties of undefined (reading 'username')"
    )
  })
})

describe('POST /tweets/update to update tweet in database', () => {
  const tweet = {
    title: 'update titile1',
    content: 'update testing',
    tweet_id: 2,
  }

  it('should allow updating tweet', async () => {
    const response = await request(baseURL).post('/tweets/update').send(tweet)
    expect(response.statusCode).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe('Successfully updated the tweet')
  })
})

describe('DELETE /tweets to delete tweet in database', () => {
  const tweet = {
    tweet_id: 2,
  }

  // it('should allow deleting tweet', async () => {
  //   const response = await request(baseURL).delete('/tweets').send(tweet)
  //   expect(response.statusCode).toBe(200)
  //   expect(response.body.success).toBe(true)
  //   expect(response.body.message).toBe('Successfully delete the task')
  // })
  it('should not allow signed out user to delete tweet', async () => {
    const response = await request(baseURL).delete('/tweets').send(tweet)
    expect(response.statusCode).toBe(500)
    expect(response.body.message).toBe('User is not authenticated to delete')
  })
})
