import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../reducers/userReducer"

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
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default NavBar