import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const showErrorMessage = (error) => {
    console.log(error)
    dispatch(setNotification(error.response.data.error, 'error', 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(login(username, password))
      setUsername('')
      setPassword('')
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const handleLogout = async () => {
    try {
      dispatch(logout())
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogObject.user = user
    dispatch(createBlog(blogObject))
    dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'add', 5))
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
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const blogFormRef = useRef()

  const blogsCopy = [...blogs]
  console.log(blogs);
  console.log(blogsCopy);

  if (user === null) {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  const blogList = () => {
    return (
    <div>
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <br />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <br />
      {blogsCopy
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            removeBlog={removeBlog}
            updateBlog={updateBlog}
          />
        ))}
    </div>
    )
  }

  return (
    <div>
      <Notification />
      {user && blogList()}
    </div>
  )
}

export default App
