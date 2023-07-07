const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require ('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have correct id key', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
})

test('blogs can be added to database', async () => {
    const newBlog = {
        title: "New Blog",
        author: "John Doe",
        url: "https://aalto.fi",
        likes: 99
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain('New Blog')
})

test('if value is not set for like it will be 0 by default', async () => {
    const newBlog = {
        title: "New Blog",
        author: "John Doe",
        url: "https://aalto.fi"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.pop()
    expect(addedBlog.likes).toBe(0)
})

afterAll(async () => {
    await mongoose.connection.close()
})