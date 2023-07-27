import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { login, logout, setUser } from './reducers/userReducer'
import blogService from './services/blogs'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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

  return (
    <Router>
      <div>
        <Notification />
        <h2>blogs</h2>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        <br />
        <Routes>
          <Route path='/' element={<BlogList showErrorMessage={showErrorMessage} />} />
          <Route path='/blogs/:id' element={<Blog />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </div>
    </Router>

  )
}

export default App
