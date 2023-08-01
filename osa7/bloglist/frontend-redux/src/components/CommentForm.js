import { Form, Button } from "react-bootstrap"

const CommentForm = ({ commentBlog }) => {

    const addComment = async (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        commentBlog(comment)
    }

    return (
        <Form onSubmit={addComment}>
            <Form.Group className="comment" controlId="formComment">
                <Form.Label>Comment</Form.Label>
                <Form.Control type="text" name="comment" />
            </Form.Group>
            <Button variant="primary" type="submit">
                add comment
            </Button>
        </Form>
    )
}

export default CommentForm