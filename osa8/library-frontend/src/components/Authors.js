import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Notify from "./Notify"

const Authors = () => {
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_AUTHORS)
  const [setBorn, birthyearResult] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const changeBirthyear = async (event) => {
    event.preventDefault()
    setBorn({ variables: {name, setBornTo: birthyear} })
    console.log(birthyearResult);
    setName('')
    setBirthyear('')
  }

  useEffect(() => {
    if (birthyearResult.data && birthyearResult.data.editAuthor === null) {
      notify('Author not found')
    }
  }, [birthyearResult.data])

  if (result.loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={changeBirthyear}>
        <div>
          Name{' '}
          <input
          value={name}
          onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Birthyear{' '}
          <input
          value={birthyear}
          type="number"
          onChange={({ target }) => setBirthyear(Number(target.value))}
          />
        </div>
        <button onClick={changeBirthyear} type="submit">
          Update author
        </button>
      </form>

    </div>
  )
}

export default Authors
