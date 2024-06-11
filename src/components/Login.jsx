import { useState } from "react"


const Login = ({login}) => {

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
        login({username, password})
        setUsername('')
        setPassword('')
    }


    return(
        <>
        <h1>Log into the application</h1>
        <form onSubmit={loginHandler}>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={changeUsername}></input>
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={changePassword}></input>
            </div>
            <button>Log In</button>
        </form>
        </>
    )
}

export default Login