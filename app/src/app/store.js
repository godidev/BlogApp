import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../features/notification/notificationSlice'

export default configureStore({
  reducer: {
    notification: notificationReducer,
  },
})
