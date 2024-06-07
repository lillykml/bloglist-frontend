const User = ({username, logoutHandler}) => {
    return(
        <>
        <p>{username} logged in</p>
        <button onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default User