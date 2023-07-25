import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return { message: action.payload.message, style: action.payload.style }
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [content, notificationDispatch] = useReducer(notificationReducer, { message: '', style: '' })

    return (
        <NotificationContext.Provider value={[content, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationContent = () => {
    const contentAndDispatch = useContext(NotificationContext)
    return contentAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const contentAndDispatch = useContext(NotificationContext)
    return contentAndDispatch[1]
}

export default NotificationContext