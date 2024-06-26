import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import User from './components/User'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './App.css'

function App() {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [type, setType] = useState(null)
  const newBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(response => {
      setBlogs(response)
    })
  }, [])

  // Storing the user upon refreshing the page
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const errorMessage = (message) => {
    setNotification(message)
    setType('error')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const successMessage = (message) => {
    setNotification(message)
    setType('success')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const loginHandler = async(userCredentials) => {
    try {
      const user = await loginService.login(userCredentials)
      setUser(user)
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
    } catch (exception) {
      errorMessage('wrong username or password')
    }
  }

  const logoutHandler = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedAppUser')
  }

  const createBlog = (newBlog) => {
    newBlogRef.current.toggleVisibility()

    blogService
      .create(newBlog)
      .then(response => {
        setBlogs(blogs.concat(response))
      })
    successMessage(`A new blog ${newBlog.title} by ${newBlog.author} was added`)
  }

  const likeBlog = (id) => {

    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = { ...blog, likes: blog.likes+1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => errorMessage(error.message))
  }

  const deleteBlog = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    blogService.deleteBlog(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        successMessage('removed blog')
      })
      .catch(error => errorMessage(error.message))}

  return(
    <>
      <Notification message={notification} type={type} />
      {!user && <Login login={loginHandler}/>}
      {user &&
      <>
        <h1>Blogs</h1>
        <User username={user.name} logoutHandler={logoutHandler}/>
        <Togglable buttonlabel={'create new blog'} ref={newBlogRef}>
          <NewBlog createBlog={createBlog}/>
        </Togglable>
        {blogs
          .sort((a,b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} like={likeBlog} deleteBlog={deleteBlog} username={user.username}/>)}
      </>}
    </>
  )
}

export default App
