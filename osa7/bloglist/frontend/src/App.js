import { useState, useEffect, useRef } from 'react'
import { useNotificationDispatch } from './notificationContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getBlogs, createBlog, setToken } from './requests'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation(createBlog)

  const dispatch = useNotificationDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const result = useQuery('blogs', getBlogs)
  console.log(result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data
  console.log(blogs);

  /*useEffect(() => {
    async function getAll() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getAll()
  }, [])*/

  const showErrorMessage = (error) => {
    console.log(error)
    dispatch({ type: 'SET', payload: { message: error.response.data.error, style: 'error' } })

    setTimeout(() => {
      dispatch({ type: 'SET', payload: { message: '', style: '' } })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
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
    newBlogMutation.mutate(blogObject, {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
        dispatch({ type: 'SET', payload: { message: `a new blog ${blogObject.title} by ${blogObject.author} added`, style: 'add' } })
        setTimeout(() => {
          dispatch({ type: 'SET', payload: { message: '', style: '' } })
        }, 5000)
      }
    })
  }

  /*const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const blog = await blogService.create(blogObject)
    blog.user = user
    //setBlogs(blogs.concat(blog))
    dispatch({ type: 'SET', payload: { message: `a new blog ${blog.title} by ${blog.author} added`, style: 'add' } })
    setTimeout(() => {
      dispatch({ type: 'SET', payload: { message: '', style: '' } })
    }, 5000)
  }*/

  const updateBlog = async (id, newObj) => {
    try {
      const beforeUpdate = blogs.find((blog) => blog.id === id)
      const tmpUser = beforeUpdate.user
      const updatedBlog = await blogService.update(id, newObj)
      updatedBlog.user = tmpUser
      const updatedBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      )
      //setBlogs(updatedBlogs)
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      const updatedBlogs = blogs.filter((blog) => blog.id !== id)
      //setBlogs(updatedBlogs)
      dispatch({ type: 'SET', payload: { message: 'Blog removed successfully', style: 'edit' } })
      setTimeout(() => {
        dispatch({ type: 'SET', payload: { message: '', style: '' } })
      }, 5000)
    } catch (error) {
      showErrorMessage(error)
    }
  }



  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <br />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      <br />
      {blogs
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

  return (
    <div>
      <Notification />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
        />
      )}
      {user && blogList()}
    </div>
  )
}

export default App
