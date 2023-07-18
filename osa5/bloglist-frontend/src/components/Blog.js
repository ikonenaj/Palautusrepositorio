import { useState } from "react"

const Blog = ({ blog, user, removeBlog, updateBlog }) => {
  const [viewAll, setViewAll] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showDetails = { display: viewAll ? '' : 'none' }

  let buttonText = viewAll ? 'hide': 'view'

  const changeView = () => {
    setViewAll(!viewAll)
  }

  const update = async () => {
      await updateBlog(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      })
  }

  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <span id="title">{blog.title}</span> <span id="author">{blog.author}</span> <button onClick={changeView}>{buttonText}</button> <br/>
      <div style={showDetails}>
        <span id="url">{blog.url}</span><br/>
        <span id="likes">likes {blog.likes}</span><button id="like-button" onClick={update}>like</button><br/>
        <span id="name">{blog.user.name}</span>
        {blog.user.username === user.username && <button onClick={() => remove()}>remove</button>}
      </div>
    </div>  
)}

export default Blog