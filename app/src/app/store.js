import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from '../features/blog/blogSlice'
import userReducer from '../features/user/userSlice'

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
  },
})
