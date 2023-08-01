import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <div className='container'>
        <Provider store={store}>
            <App />
        </Provider>
    </div>

)
