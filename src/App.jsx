import { useState, useEffect} from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

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
    } catch (exception) {}
  }

  return (
    <>
    {user === null 
    ?<Login username={username} password={password} changeUsername={changeUsername} changePassword={changePassword} 
    loginHandler={loginHandler}/>
    : <>
    <h1>Blogs</h1>
    <p>{user.name} logged in</p>
    {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}</>
    }
    </>
  )
}

export default App
