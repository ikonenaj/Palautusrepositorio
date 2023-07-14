import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={changeView}>{buttonText}</button> <br/>
      <div style={showDetails}>
        {blog.url}<br/>
        likes {blog.likes}<button onClick={update}>like</button><br/>
        {blog.user.name}
      </div>
    </div>  
)}

export default Blog