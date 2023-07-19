import { useDispatch } from "react-redux"
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(content))
        dispatch(notificationChange(`added '${content}'`))
        setTimeout(() => {
            dispatch(notificationChange(null))
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
              <div><input name="anecdote"/></div>
              <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm