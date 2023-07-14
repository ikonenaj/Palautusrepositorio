import { useState } from "react"

const BlogForm = ({ createBlog, setAction, setMessage }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        try {
            event.preventDefault()
            await createBlog({
                title: title,
                author: author,
                url: url
            })
    
            setTitle('')
            setAuthor('')
            setUrl('')
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

    return (
        <div>
          <h2>create new</h2>
          <form onSubmit={addBlog}>
            <div>
              title:
              <input
              type="text"
              value={title}
              name="title"
              onChange={event => setTitle(event.target.value)}
              />
            </div>
            <div>
              author:
              <input
              type="text"
              value={author}
              name="author"
              onChange={event => setAuthor(event.target.value)}
              />
            </div>
            <div>
              url:
              <input
              type="text"
              value={url}
              name="url"
              onChange={event => setUrl(event.target.value)}
              />
            </div>
            <button type="submit">create</button>
          </form>
        </div>
    )
}

export default BlogForm