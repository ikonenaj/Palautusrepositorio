import { useDispatch } from "react-redux"
import { login } from "../reducers/userReducer"
import Notification from "./Notification"
import { Form, Button } from "react-bootstrap"

const LoginForm = () => {

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(login(username, password))
  }

  return (
    <div>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group className="username" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" placeholder="Username" />
        </Form.Group>
        <Form.Group className="password" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )

}

export default LoginForm
