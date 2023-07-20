import { useDispatch } from "react-redux"
import { newAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { notificationChange } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const createdAnecdote = await anecdoteService.createNew(content)
        dispatch(newAnecdote(createdAnecdote.content))
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