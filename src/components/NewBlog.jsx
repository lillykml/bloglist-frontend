const NewBlog = ({blogTitle, blogAuthor, blogUrl, changeTitle, changeAuthor, changeUrl, submitHandler}) => {
    return(
        <>
            <h1>Create New</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label>title:</label>
                    <input type="text" value={blogTitle} onChange={changeTitle}></input>
                </div>
                <div>
                    <label>author:</label>
                    <input type="text" value={blogAuthor} onChange={changeAuthor}></input>
                </div>
                <div>
                    <label>url:</label>
                    <input type="text" value={blogUrl} onChange={changeUrl}></input>
                </div>
                <button type="submit">Create</button>
            </form>
        </>
    )
}

export default NewBlog