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

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    const authors = blogs.map(blog => blog.author)
    const author = authors.sort((a,b) => {
        authors.filter(v => v === a).length
       -authors.filter(v => v === b).length 
    }).pop()
    authors.push(author)
    const counts = {}
    for (const a of authors) {
        counts[a] = counts[a] ? counts[a] + 1 : 1
    }
    return {
        author: author,
        blogs: counts[author]
    }
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }