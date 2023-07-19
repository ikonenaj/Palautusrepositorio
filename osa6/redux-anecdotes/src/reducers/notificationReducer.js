import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'placeholder',
    reducers: {
        notificationChange(state, action) {
            return action.payload
        }
    }
})

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer