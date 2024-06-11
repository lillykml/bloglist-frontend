import PropTypes from 'prop-types'


const User = ({ username, logoutHandler }) => {
  return(
    <>
      <p>{username} logged in</p>
      <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

User.propTypes = {
  username: PropTypes.string.isRequired,
  logoutHandler: PropTypes.func.isRequired
}

export default User