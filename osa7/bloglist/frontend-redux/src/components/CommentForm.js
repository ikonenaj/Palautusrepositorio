import { useState } from "react"

const CommentForm = ({ commentBlog }) => {
    const [comment, setComment] = useState('')

    const addComment = async (event) => {
        event.preventDefault()
        commentBlog(comment)
        setComment('')
    }

    return (
        <div>
            <form onSubmit={addComment}>
                <div>
                    comment:
                    <input
                        id="comment"
                        type="text"
                        value={comment}
                        name="comment"
                        onChange={(event) => setComment(event.target.value)}
                    />
                </div>
                <button id="submit-button" type="submit">
                    add comment
                </button>
            </form>
        </div>
    )
}

export default CommentForm