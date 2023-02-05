import PropTypes from 'prop-types'

export default function LoginInput ({ type, name, value, handleChange }) {
  return (
      <div>
        <label>{name}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}/>
      </div>
  )
}

LoginInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}
