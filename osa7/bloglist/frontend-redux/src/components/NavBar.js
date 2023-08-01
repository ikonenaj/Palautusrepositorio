import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../reducers/userReducer"
import { Button } from "react-bootstrap"

const NavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(state => state.user)

    const handleLogout = async () => {
          dispatch(logout())
          navigate('/')
    }

    return (
        <div>
            <Link to='/'>Blogs</Link>{' '}
            <Link to='/users'>Users</Link>{' '}
            {user.name} logged in{' '}
            <Button onClick={handleLogout} variant="primary">
                logout
            </Button>
        </div>
    )
}

export default NavBar