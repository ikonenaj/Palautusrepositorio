import { createSlice } from "@reduxjs/toolkit";

let timeout = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notificationChange(state, action) {
            return action.payload
        }
    }
})

export const { notificationChange } = notificationSlice.actions

export const setNotification = (message, duration) => {
    return async dispatch => {
        if (timeout) {
            clearTimeout(timeout)
        }
        dispatch(notificationChange(message))
        timeout = setTimeout(() => {
            dispatch(notificationChange(null))
        }, duration * 1000)
    }
}

export default notificationSlice.reducer