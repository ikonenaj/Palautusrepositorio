import { useSelector } from "react-redux"
import Blog from "./Blog"

const BlogList = ({ removeBlog, updateBlog }) => {
    const blogs = useSelector(state => state.blogs)
    const blogsCopy = [...blogs]
    const blogsSorted = blogsCopy.sort((a,b) => b.likes - a.likes)

    return (
        <div>
            {blogsSorted.map(blog => (
                <Blog key={blog.id} blog={blog} removeBlog={removeBlog} updateBlog={updateBlog} />
            ))}
        </div>
    )
}

export default BlogList