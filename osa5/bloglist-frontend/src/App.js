import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [action, setAction] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getAll() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getAll()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
        console.log(error)
        setMessage(error.response.data.error);
        setAction('error');

        setTimeout(() => {
          setMessage('')
          setAction('')
        }, 5000)
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (error) {
        console.log(error)
        setMessage(error.response.data.error);
        setAction('error');

        setTimeout(() => {
          setMessage('')
          setAction('')
        }, 5000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const addBlog = async (blogObject) => {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setAction('add')
      setTimeout(() => {
        setMessage('')
        setAction('')
      }, 5000)
  }

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <br/>
      <BlogForm createBlog={addBlog} setAction={setAction} setMessage={setMessage} />
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={message} action={action} />
      {!user && <LoginForm  username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} handleLogin={handleLogin} />}
      {user && blogList()}
    </div>
  )
}

export default App