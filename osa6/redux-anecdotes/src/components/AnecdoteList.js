import { useSelector, useDispatch } from "react-redux"
import { updateVotes } from "../reducers/anecdoteReducer"
import { notificationChange } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => 
      state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
    )

    const vote = (anecdote) => {
        dispatch(updateVotes(anecdote))
        dispatch(notificationChange(`you voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(notificationChange(null))
        }, 5000)
    }

    return (
        <div>
            {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
                </div>
              </div>
            )}
        </div>
    )
}

export default AnecdoteList