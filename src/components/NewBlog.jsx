import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ createBlog }) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const changeBlogTitle = (event) => {
    setBlogTitle(event.target.value)
  }

  const changeBlogAuthor = (event) => {
    setBlogAuthor(event.target.value)
  }

  const changeBlogUrl = (event) => {
    setBlogUrl(event.target.value)
  }

  const submitHandler = (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    createBlog(newBlog)
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return(
    <>
      <h1>Create New</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>title:</label>
          <input type="text" value={blogTitle} onChange={changeBlogTitle}></input>
        </div>
        <div>
          <label>author:</label>
          <input type="text" value={blogAuthor} onChange={changeBlogAuthor}></input>
        </div>
        <div>
          <label>url:</label>
          <input type="text" value={blogUrl} onChange={changeBlogUrl}></input>
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

NewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlog