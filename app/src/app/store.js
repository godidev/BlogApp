import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../features/notification/notificationSlice'
import blogsReducer from '../features/blog/blogSlice'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
  },
})
