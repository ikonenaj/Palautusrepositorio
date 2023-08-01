import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  //const [title, setTitle] = useState('')
  //const [author, setAuthor] = useState('')
  //const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    try {
      event.preventDefault()
      const title = event.target.title.value
      const author = event.target.author.value
      const url = event.target.url.value
      await createBlog({
        title: title,
        author: author,
        url: url,
      })
    } catch (error) {
      console.log(error)
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }

  /*return (
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
  )*/

  return (
    <Form onSubmit={addBlog}>
      <Form.Group className='title' controlId='formBlogTitle'>
        <Form.Label>Title</Form.Label>
        <Form.Control type='text' name='title' />
      </Form.Group>
      <Form.Group className='author' controlId='formBlogAuthor'>
        <Form.Label>Author</Form.Label>
        <Form.Control type='text' name='author' />
      </Form.Group>
      <Form.Group className='url' controlId='formBlogUrl'>
        <Form.Label>Url</Form.Label>
        <Form.Control type='text' name='url' />
      </Form.Group>
      <Button variant='primary' type='submit'>
        create
      </Button>
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
