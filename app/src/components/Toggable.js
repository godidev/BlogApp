import { useState } from 'react'
import PropTypes from 'prop-types'

export default function Toggable ({ children, btnLabel }) {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setVisible(true)}>{btnLabel}</button>
        </div>
        <div style={showWhenVisible}>
            {children}
        <button onClick={() => setVisible(false)}>Cancel</button>
        </div>
      </div>)
}

Toggable.propTypes = {
  btnLabel: PropTypes.string.isRequired
}
