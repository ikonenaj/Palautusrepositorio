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

  const update = async () => {
    await updateBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
  }

  const updateBlog = async (id, newObj) => {
    try {
      dispatch(likeBlog(id, newObj))
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const removeBlog = (id) => {
    try {
      dispatch(deleteBlog(id))
      dispatch(setNotification('Blog removed successfully', 'edit', 5))
      navigate('/')
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
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
      <button onClick={update}>
        like
      </button><br />
      added by {blog.user.name}{' '}
      {blog.user.username === user.username && (
        <button onClick={() => remove()}>
          remove
        </button>
      )}
    </div>
  )
}

export default Blog
