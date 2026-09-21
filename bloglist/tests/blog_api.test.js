const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const BlogToVerify = response.body[0]
    assert.ok(BlogToVerify.id)
    assert.strictEqual(BlogToVerify._id, undefined)
  })
})

after(async () => {
  await mongoose.connection.close()
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New Blog Title',
      author: 'New Blog Author',
      url: 'https://newblog.com/',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    const titles = response.body.map(r => r.title)
    assert.ok(titles.includes('New Blog Title'))
  })
  test('if likes property is missing, it defaults to 0', async () => {
  const newBlogWithoutLikes = {
    title: 'Blog without likes',
    author: 'John Doe',
    url: 'https://example.com/no-likes'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})
test('if title and url properties are missing, responds with 400 Bad Request', async () => {
    const newBlogWithoutTitleAndUrl = {
        title: '',
        author: 'Jane Doe',
        url: ''
    }

    await api
        .post('/api/blogs')
        .send(newBlogWithoutTitleAndUrl)
        .expect(400)   
})
})

