const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require ('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let headers
beforeAll(async () => {
    await User.deleteMany({})
    const hash = await bcrypt.hash('root', 10)
    const user = await new User({ username: 'root', hash })
    await user.save()

    const userForToken = {
        username: user.username,
        id: user.id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    headers = { Authorization: `bearer ${token}` }
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('inital blogs saved', () => {
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
})

describe('adding new blogs', () => {
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
            .set(headers)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const titles= blogsAtEnd.map(blog => blog.title)
        expect(titles).toContain('New Blog')
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
            .set(headers)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        const addedBlog = blogsAtEnd.pop()
        expect(addedBlog.likes).toBe(0)
    })
    
    test('blogs that are added without title or url will get status code 400 as response', async () => {
        const withoutTitle = {
            author: "John Doe",
            url: "https://aalto.fi"
        }
    
        const withoutUrl = {
            title: "New Blog",
            author: "John Doe"
        }
    
        await api
            .post('/api/blogs')
            .send(withoutTitle)
            .set(headers)
            .expect(400)
    
        await api
            .post('/api/blogs')
            .send(withoutUrl)
            .set(headers)
            .expect(400)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deleting notes', () => {
    test('deleting a note with a valid id', async () => {
        const blogs = await helper.blogsInDb()
        const blog = blogs[0]

        await api
            .delete(`/api/blogs/${blog.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).not.toContain(blog.title)
    })
})

describe('updating notes', () => {
    test('updating like count', async () => {
        const blogs = await helper.blogsInDb()
        const blog = blogs[0]
        blog.likes = 20000
        
        await api
            .put(`/api/blogs/${blog.id}`)
            .send(blog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd[0]
        expect(updatedBlog.likes).toBe(blog.likes)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})