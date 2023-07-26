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
        }
    }
})

export const { appendBlog, removeBlog, setBlogs, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        const blog = await blogService.create(newBlog)
        newBlog.id = blog.id
        dispatch(appendBlog(newBlog))
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

export default blogSlice.reducer