import { createSlice } from "@reduxjs/toolkit";

let timeout = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState: { message: '', className: ''},
    reducers: {
        notificationChange(state, action) {
            const message = action.payload
            return { ...state, message: message }
        },
        classNameChange(state, action) {
            const className = action.payload
            return { ...state, className: className }
        }
    }
})

export const { notificationChange, classNameChange } = notificationSlice.actions

export const setNotification = (message, className, duration) => {
    return async dispatch => {
        if (timeout) {
            clearTimeout(timeout)
        }
        dispatch(notificationChange(message))
        dispatch(classNameChange(className))
        timeout = setTimeout(() => {
            dispatch(notificationChange(''))
            dispatch(classNameChange(''))
        }, duration * 1000)
    }
}

export default notificationSlice.reducer