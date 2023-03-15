import { createSlice } from '@reduxjs/toolkit'
import loginService from '../../services/login'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    getUser(state, action) {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON !== 'undefined') {
        const user = JSON.parse(loggedUserJSON)
        return user
      } else {
        return null
      }
    },
    setUser(state, action) {
      return action.payload
    },
    logoutUser(state, action) {
      window.localStorage.removeItem('loggedUser')
      return null
    },
  },
})

export const loginUser = userData => {
  const { username, password } = userData
  return async dispatch => {
    const userLogin = await loginService.login({
      username,
      password,
    })
    window.localStorage.setItem('loggedUser', JSON.stringify(userLogin))
    dispatch(setUser(userLogin))
  }
}

export const { getUser, setUser, logoutUser } = userSlice.actions

export default userSlice.reducer
