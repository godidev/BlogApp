import axios from 'axios'
const baseUrl = 'http://localhost:3005/api/login'

const login = async credentials => {
  try {
    const { data } = await axios.post(baseUrl, credentials)
    return data
  } catch (error) {
    console.error(error)
  }
}

export default { login }
