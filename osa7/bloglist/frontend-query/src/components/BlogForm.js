import { useState } from 'react'
import { useNotificationDispatch } from '../notificationContext'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useNotificationDispatch()

  const addBlog = async (event) => {
    try {
      event.preventDefault()
      await createBlog({
        title: title,
        author: author,
        url: url,
      })

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.log(error)
      dispatch({ type: 'SET', payload: { message: error.response.data.error, style: 'error' } })

      setTimeout(() => {
        dispatch({ type: 'SET', payload: { message: '', style: '' } })
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button id="submit-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
