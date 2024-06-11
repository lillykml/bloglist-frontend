import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, like, deleteBlog, username }) => {

  const [showDetails, setShowDetails] = useState(false)

  const clickHandler = () => {
    setShowDetails(!showDetails)
  }

  const displayDetails = () => {
    return(
      <>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={() => like(blog.id)}>Like</button></p>
        <p>{blog.user.name}</p>
        {blog.user.username === username ? <button onClick={() => deleteBlog(blog.id)}>Remove</button> : null}
      </>
    )
  }

  return(
    <div className="blogpost">
      <p>{blog.title} {blog.author} <button onClick={clickHandler}>{showDetails ? 'hide' : 'view'}</button></p>
      {showDetails && displayDetails()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog