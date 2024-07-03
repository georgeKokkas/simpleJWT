import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import './LoginPage.css';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext)
  return (
    <div>
        <form onSubmit={loginUser}>
            <input type='text' name='username' placeholder='Enter Username' />
            <input type='password' name='password' placeholder='Enter Password' />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default LoginPage