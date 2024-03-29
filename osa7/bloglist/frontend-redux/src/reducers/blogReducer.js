import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            return [...state, action.payload]
        },
        setBlogs(state, action) {
            return action.payload
        },
        updateBlog(state, action) {
            const id = action.payload.id
            const blogToUpdate = state.find(blog => blog.id === id)
            const updatedBlog = {
                ...blogToUpdate,
                likes: blogToUpdate.likes + 1
            }
            return state.map(blog => blog.id !== id ? blog : updatedBlog)
        },
        removeBlog(state, action) {
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        },
        commentBlog(state, action) {
            console.log(action.payload);
            const id = action.payload.id
            const comments = action.payload.comments
            const comment = comments.pop()
            console.log(comments);
            console.log(comment);
            const blogToUpdate = state.find(blog => blog.id === id)
            const updatedBlog = {...blogToUpdate, comments: blogToUpdate.comments.concat(comment)}
            return state.map(blog => blog.id !== id ? blog : updatedBlog)
        }
    }
})

export const { appendBlog, commentBlog, removeBlog, setBlogs, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        const blog = await blogService.create(newBlog)
        blog.user = newBlog.user
        dispatch(appendBlog(blog))
    }
}

export const likeBlog = (id, blog) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(id, blog)
        dispatch(updateBlog(updatedBlog))
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(removeBlog(id))
    }
}

export const addComment = (id, commentObject) => {
    return async dispatch => {
        const updatedBlog = await blogService.comment(id, commentObject)
        dispatch(commentBlog(updatedBlog))
    }
}

export default blogSlice.reducer