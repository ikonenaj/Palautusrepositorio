const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require ('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

describe('adding users', () => {
    test('adding a new user is successful', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Test',
            name: 'Test User',
            password: 'Test',
          }
      
          await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
      
          const usersAtEnd = await helper.usersInDb()
          expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
      
          const usernames = usersAtEnd.map(u => u.username)
          expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('expected `username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

    test("user with invalid parameters isn't created", async () => {
        const usersAtStart = await helper.usersInDb()

        const missingUsername = {
            name: "Test",
            password: "123"
        }

        const shortUsername = {
            username: 'Ab',
            name: 'Test User',
            password: 'Test',
        }

        const shortPassword = {
            username: "Abc",
            password: "Ab"
        }

        const missingPassword = {
            username: "abcd",
            name: "Abc Def"
        }

        await api
            .post('/api/users')
            .send(shortUsername)
            .expect(400)

        await api
            .post('/api/users')
            .send(missingUsername)
            .expect(400)

        await api
            .post('/api/users')
            .send(missingPassword)
            .expect(400)

        await api
            .post('/api/users')
            .send(shortPassword)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})