import { useState, useEffect} from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import User from './components/User'

function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
        //blogService.setToken(user.token)
      }
    }, [])

  const changeUsername = (event) => {
    setUsername(event.target.value)
  }

  const changePassword = (event) => {
    setPassword(event.target.value)
  }

  const loginHandler = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
    } catch (exception) {}
  }

  const logoutHandler = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedAppUser')
  }

  return (
    <>
    {user === null 
    ?<Login username={username} password={password} changeUsername={changeUsername} changePassword={changePassword} 
    loginHandler={loginHandler}/>
    : <>
    <h1>Blogs</h1>
    <User username={user.name} logoutHandler={logoutHandler}/>
    {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}</>
    }
    </>
  )
}

export default App
