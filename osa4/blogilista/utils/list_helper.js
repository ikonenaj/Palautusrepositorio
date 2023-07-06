const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    const likes = blogs.map(blog => blog.likes)
    const index = likes.indexOf(Math.max(...likes))
    return blogs[index]
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }