import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id
  const blog = useSelector(state => state.blogs).find(blog => blog.id === id)
  const user = useSelector(state => state.user)

  const showErrorMessage = (error) => {
    console.log(error)
    dispatch(setNotification(error.response.data.error, 'error', 5))
  }

  const updateBlog = () => {
    try {
      const newObj = {...blog, likes: blog.likes + 1}
      dispatch(likeBlog(blog.id, newObj))
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const removeBlog = () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification('Blog removed successfully', 'edit', 5))
        navigate('/')
      }

    } catch (error) {
      showErrorMessage(error)
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>
        {blog.title}
      </h1>
      <a href={`//${blog.url}`} target='_blank' rel='noopener noreferrer'>{blog.url}</a><br />
      {blog.likes} likes{' '}
      <button onClick={updateBlog}>
        like
      </button><br />
      added by {blog.user.name}{' '}
      {blog.user.username === user.username && (
        <button onClick={removeBlog}>
          remove
        </button>
      )}
      <h3>comments</h3>
      <ul>
        { blog.comments.map((comment, index) => (
            <li key={index} >{comment}</li>
        ))}
       </ul>
    </div>
  )
}

export default Blog
