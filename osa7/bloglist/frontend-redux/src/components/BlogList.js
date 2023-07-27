import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createBlog, deleteBlog, likeBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"

const BlogList = ({ showErrorMessage }) => {
    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)
    const blogsCopy = [...blogs]
    const blogsSorted = blogsCopy.sort((a,b) => b.likes - a.likes)

    const user = useSelector(state => state.user)

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
    

    return (
        <div>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>
            <br />
            {blogsSorted.map(blog => (
                <Blog key={blog.id} blog={blog} removeBlog={removeBlog} updateBlog={updateBlog} />
            ))}
        </div>
    )
}

export default BlogList