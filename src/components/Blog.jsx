import { useState } from "react"


const Blog = ({blog, like}) => {

    const [showDetails, setShowDetails] = useState(false)

    const clickHandler = () => {
        setShowDetails(!showDetails)
    }

    const displayDetails = () => {
        return(
            <>
                <p>{blog.url}</p>
                <p>{blog.likes} <button onClick={()=>like(blog.id)}>Like</button></p>
                <p>{blog.author}</p>
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