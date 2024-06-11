import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {

  // we need to store the visibility state of the component
  const [visible, setVisible] = useState(false)

  // change the visibility with the button click
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // use the display property to hide the appropriate parts
  const showComponent = { display: visible ? '' : 'none' }
  const showActionButton = { display: visible ? 'none' : '' }


  useImperativeHandle(refs, () => {
    return{ toggleVisibility }
  })

  return(
    <>
      <div style={showActionButton}>
        <button onClick={toggleVisibility}>{props.buttonlabel}</button>
      </div>
      <div style={showComponent}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </>
  )
})

Togglable.propTypes = {
  buttonlabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable