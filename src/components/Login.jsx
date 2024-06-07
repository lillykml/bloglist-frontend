const Login = ({username, password, changeUsername, changePassword, loginHandler}) => {
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