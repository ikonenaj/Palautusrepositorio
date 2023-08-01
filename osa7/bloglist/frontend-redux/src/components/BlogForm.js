import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
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
