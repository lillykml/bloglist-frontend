import { useState } from "react"


const Blog = ({blog, like, deleteBlog, username}) => {

    const [showDetails, setShowDetails] = useState(false)

    const clickHandler = () => {
        setShowDetails(!showDetails)
    }

    const displayDetails = () => {
        return(
            <>
                <p>{blog.url}</p>
                <p>{blog.likes} <button onClick={()=>like(blog.id)}>Like</button></p>
                <p>{blog.user.name}</p>
                {blog.user.username === username ? <button onClick={() => deleteBlog(blog.id)}>Remove</button> : null}
            </>
        )
    }

    return(
    <div className="blogpost">
        <p>{blog.title} {blog.author} <button onClick={clickHandler}>{showDetails ? "hide" : "view"}</button></p>
        {showDetails && displayDetails()}
    </div>
    )
}

export default Blog