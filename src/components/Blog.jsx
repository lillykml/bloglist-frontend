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
        <p id='blog-url'>{blog.url}</p>
        <p id='blog-likes'>{blog.likes} <button onClick={() => like(blog.id)}>Like</button></p>
        <p className='blog-username'>{blog.user.name}</p>
        {blog.user.username === username ? <button onClick={() => deleteBlog(blog.id)}>Remove</button> : null}
      </>
    )
  }

  return(
    <div className="blogpost">
      <p className='blog-title'>{blog.title}</p>
      <p className='blog-author'>{blog.author} <button id='blog-view-button' onClick={clickHandler}>{showDetails ? 'hide' : 'view'}</button></p>
      {showDetails && displayDetails()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog