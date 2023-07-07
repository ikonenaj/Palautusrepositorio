const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs equals the likes of those', () => {
    const result = listHelper.totalLikes(testHelper.initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(testHelper.initialBlogs)
    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })

  test('empty array returns empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })
})

describe('most blogs', () => {
  test('author with most blogs and blog count', () => {
    const result = listHelper.mostBlogs(testHelper.initialBlogs)
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3 
    })
  })

  test('empty blog list returns empty object', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test('list with one blog returns author and blog count one', () => {
    expect(listHelper.mostBlogs(testHelper.listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
})

describe('most likes', () => {
  test('list with multiple blogs expect author and total like count', () => {
    expect(listHelper.mostLikes(testHelper.initialBlogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })

  test('list with one entry', () => {
    expect(listHelper.mostLikes(testHelper.listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5
    })
  })

  test('list without entries return empty object', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })
})