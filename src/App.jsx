import { useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import User from './components/User'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import "./App.css"

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


  const loginHandler = async(userCredentials) => {
    try {
      const user = await loginService.login(userCredentials)
      setUser(user)
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
    } catch (exception) {
      setNotification(`wrong username or password`)
      setType('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
    setNotification(`A new blog ${newBlog.title} by ${newBlog.author} was added`)
    setType('success')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }


  return(
    <>
      <Notification message={notification} type={type} />
      {!user && <Login login={loginHandler}/>}
      {user && 
      <>
        <h1>Blogs</h1>
        <User username={user.name} logoutHandler={logoutHandler}/>
        <Togglable buttonlabel={"create new blog"} ref={newBlogRef}>
          <NewBlog createBlog={createBlog}/>
        </Togglable>

        {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
      </>}
    </>
  )
}

export default App
