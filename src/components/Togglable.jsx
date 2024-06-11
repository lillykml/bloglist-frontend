import { useState } from "react"

const Togglable = (props) => {

    // we need to store the visibility state of the component
    const [visible, setVisible] = useState(false)

    // change the visibility with the button click
    const clickHandler = () => {
        setVisible(!visible)
    }

    // use the display property to hide the appropriate parts
    const showComponent = {display: visible ? '' : 'none'}
    const showActionButton = {display: visible ? 'none' : ''}
    

    return(
        <>
        <div style={showActionButton}>
            <button onClick={clickHandler}>{props.buttonlabel}</button>
        </div>
        <div style={showComponent}>
            {props.children}
            <button onClick={clickHandler}>Cancel</button>
        </div>
        </>
    )
}

export default Togglable