import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
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
    blogFormRef.current.toggleVisibility()
    const blog = await blogService.create(blogObject)
    blog.user = user
    setBlogs(blogs.concat(blog))
    setMessage(`a new blog ${blog.title} by ${blog.author} added`)
    setAction('add')
    setTimeout(() => {
      setMessage('')
      setAction('')
    }, 5000)
  }

  const updateBlog = async (id, newObj) => {
    try {
      const beforeUpdate = blogs.find(blog => blog.id === id)
      const tmpUser = beforeUpdate.user;
      const updatedBlog = await blogService.update(id, newObj)
      updatedBlog.user = tmpUser
      const updatedBlogs = blogs.map(blog => blog.id === id ? updatedBlog : blog)
      setBlogs(updatedBlogs)
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

  const blogFormRef = useRef()

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <br/>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} setAction={setAction} setMessage={setMessage} />
      </Togglable>
      <br/>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
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