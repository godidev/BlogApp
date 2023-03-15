import { createSlice } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'

export const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    title: '',
    author: '',
    url: '',
  },
  reducers: {
    initialize(state, action) {
      return action.payload
    },
    deleteBlogState(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    addBlogState(state, action) {
      state.push(action.payload)
    },
    changeBlog(state, action) {
      const { id, likes } = action.payload
      return state.map(blog => (blog.id !== id ? blog : { ...blog, likes }))
    },
    clearBlog(state) {
      state.value = null
    },
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(initialize(blogs))
  }
}

export const {
  initialize,
  deleteBlogState,
  addBlogState,
  changeBlog,
  clearblog,
} = blogSlice.actions

export default blogSlice.reducer
