import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    value: null,
  },
  reducers: {
    changeNotification: (state, action) => {
      state.value = action.payload
    },
    clearNotification: state => {
      state.value = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeNotification, clearNotification } =
  notificationSlice.actions

export default notificationSlice.reducer
