import axios from 'axios'
const baseUrl = 'http://localhost:3005/api/blogs'

let token = null
let config

const getAll = async () => {
  try {
    const { data } = await axios.get(baseUrl)
    return data
  } catch (error) {
    console.error(error)
  }
}

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async newObject => {
  const { id } = newObject
  const { data } = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return data
}

const deleteBlog = async id => {
  const { data } = await axios.delete(`${baseUrl}/${id}`, config)
  return data
}

export default { getAll, create, update, deleteBlog, setToken }
