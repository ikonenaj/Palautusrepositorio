import { useState, useEffect, useRef } from 'react'
import { useNotificationDispatch } from './notificationContext'
import { useUser, useUserDispatch } from './userContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getBlogs, createBlog, likeBlog, deleteBlog, setToken } from './requests'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation(createBlog)
  const updateBlogMutation = useMutation(likeBlog)
  const removeBlogMutation = useMutation(deleteBlog)

  const user = useUser()

  const dispatchNotification = useNotificationDispatch()
  const dispatchUser = useUserDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      dispatchUser({ type: 'SET', payload: user })
      setToken(user.token)
    }
  }, [dispatchUser])

  const blogFormRef = useRef()

  const result = useQuery('blogs', getBlogs)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  const showErrorMessage = (error) => {
    console.log(error)
    dispatchNotification({ type: 'SET', payload: { message: error.response.data.error, style: 'error' } })

    setTimeout(() => {
      dispatchNotification({ type: 'SET', payload: { message: '', style: '' } })
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
      //setUser(user)
      dispatchUser({ type: 'SET', payload: user })
      setUsername('')
      setPassword('')
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      //setUser(null)
      dispatchUser({ type: 'SET', payload: null })
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
        dispatchNotification({ type: 'SET', payload: { message: `a new blog ${blogObject.title} by ${blogObject.author} added`, style: 'add' } })
        setTimeout(() => {
          dispatchNotification({ type: 'SET', payload: { message: '', style: '' } })
        }, 5000)
      },
      onError: (error) => {
        dispatchNotification({ type: 'SET', payload: { message: error.response.data.error, style: 'error' } })

        setTimeout(() => {
          dispatchNotification({ type: 'SET', payload: { message: '', style: '' } })
        }, 5000)
      }
      })
  }

  const updateBlog = async (id, newObj) => {
      updateBlogMutation.mutate({id, newObj}, {
        onSuccess: () => {
          queryClient.invalidateQueries('blogs')
        },
        onError: (error) => {
          dispatchNotification({ type: 'SET', payload: { message: error.response.data.error, style: 'error' } })
  
          setTimeout(() => {
            dispatchNotification({ type: 'SET', payload: { message: '', style: '' } })
          }, 5000)
        }
      })
  }

  const removeBlog = async (id) => {
      removeBlogMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries('blogs')
          dispatchNotification({ type: 'SET', payload: { message: 'Blog removed successfully', style: 'edit' } })
          setTimeout(() => {
            dispatchNotification({ type: 'SET', payload: { message: '', style: '' } })
          }, 5000)
        },
        onError: (error) => {
          dispatchNotification({ type: 'SET', payload: { message: error.response.data.error, style: 'error' } })
  
          setTimeout(() => {
            dispatchNotification({ type: 'SET', payload: { message: '', style: '' } })
          }, 5000)
        }
      })
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
