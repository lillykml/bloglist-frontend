import { useState } from 'react'
import PropTypes from 'prop-types'


const Login = ({ login }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const changeUsername = (event) => {
    setUsername(event.target.value)
  }

  const changePassword = (event) => {
    setPassword(event.target.value)
  }

  const loginHandler = (event) => {
    event.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
  }


  return(
    <>
      <h1>Log into the application</h1>
      <form data-testid='login-form' onSubmit={loginHandler}>
        <div>
          <label>Username</label>
          <input data-testid='username' type="text" value={username} onChange={changeUsername}></input>
        </div>
        <div>
          <label>Password</label>
          <input data-testid='password' type="password" value={password} onChange={changePassword}></input>
        </div>
        <button data-testid='login-button'>Log In</button>
      </form>
    </>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default Login