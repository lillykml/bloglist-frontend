import { useState, useEffect} from 'react'
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

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [type, setType] = useState(null)

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

  const changeUsername = (event) => {
    setUsername(event.target.value)
  }

  const changePassword = (event) => {
    setPassword(event.target.value)
  }

  const changeBlogTitle = (event) => {
    setBlogTitle(event.target.value)
  }

  const changeBlogAuthor = (event) => {
    setBlogAuthor(event.target.value)
  }

  const changeBlogUrl = (event) => {
    setBlogUrl(event.target.value)
  }

  const loginHandler = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
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

  const createBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    blogService
    .create(newBlog)
    .then(response => {
      console.log(response)
      setBlogs(blogs.concat(response))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    })
    setNotification(`A new blog ${newBlog.title} by ${newBlog.author} was added`)
    setType('success')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const loginForm = () => {
    return<Login username={username} password={password} changeUsername={changeUsername} changePassword={changePassword} 
      loginHandler={loginHandler}/>
  }

  return(
    <>
      <Notification message={notification} type={type} />
      {!user && loginForm()}
      {user && 
      <>
        <h1>Blogs</h1>
        <Notification message={notification} type={type} />
        <User username={user.name} logoutHandler={logoutHandler}/>
        <Togglable buttonlabel={"create new blog"}>
          <NewBlog blogTitle={blogTitle} blogAuthor={blogAuthor} blogUrl={blogUrl} changeTitle={changeBlogTitle}
          changeAuthor={changeBlogAuthor} changeUrl={changeBlogUrl} submitHandler={createBlog}/>
        </Togglable>

        {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
      </>}
    </>
  )
}

export default App
