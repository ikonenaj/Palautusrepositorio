import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const User = () => {
    const id = useParams().id
    const user = useSelector(state => state.users).find(user => user.id === id)
    const blogs = useSelector(state => state.blogs).filter(blog => blog.user.id === id)
    console.log(blogs);

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>
                {user.name}
            </h2>
            <h3>
                added blogs
            </h3>
            <ul>
                {blogs.map(blog => 
                    <li key={blog.id}>{blog.title}</li>
                )}
            </ul>
        </div>
    )
}

export default User