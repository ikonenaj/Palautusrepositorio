import React from 'react'
import ReactDOM from 'react-dom/client'
import { NotificationContextProvider } from './notificationContext'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <NotificationContextProvider>
        <App />
    </NotificationContextProvider>
)
