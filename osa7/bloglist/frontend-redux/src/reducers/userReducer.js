import { createSlice } from "@reduxjs/toolkit"
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
    }
}

export default userSlice.reducer