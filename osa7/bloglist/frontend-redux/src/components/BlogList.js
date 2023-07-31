import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import { Link } from "react-router-dom"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"

const BlogList = () => {
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

    const blogFormRef = useRef()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
      }
    
    return (
        <div>
            <h2>Blogs</h2>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>
            <br />
            {blogsSorted.map(blog => (
                <div key={blog.id} style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </div>
            ))}
        </div>
    )
}

export default BlogList