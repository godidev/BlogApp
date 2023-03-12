import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  url: 'www.asdf.com',
  author: 'Testing',
  likes: 0,
}

describe('Blog component', () => {
  test('renders content without additional info', () => {
    const { container } = render(
      <Blog blog={blog} deleteBlog={() => {}} updateBlog={() => {}} />,
    )

    const title = container.querySelector('.blogTitle')
    expect(title).toHaveTextContent(blog.title)
  })

  test('renders additional info when clicking View', async () => {
    render(<Blog blog={blog} deleteBlog={() => {}} updateBlog={() => {}} />)

    expect(screen.getByText('View')).toBeInTheDocument()
    expect(screen.queryByText('Hide')).toBe(null)

    userEvent.click(screen.getByText('View'))
    expect(await screen.findByText('like')).toBeInTheDocument()
    expect(await screen.findByText('Remove')).toBeInTheDocument()
  })

  test('clicking hide button hides additional info', async () => {
    render(<Blog blog={blog} deleteBlog={() => {}} updateBlog={() => {}} />)

    await userEvent.click(screen.getByText('View'))
    expect(screen.getByText('Hide')).toBeInTheDocument()
    expect(screen.getByText('Remove')).toBeInTheDocument()

    await userEvent.click(screen.getByText('Hide'))
    expect(screen.queryByText('Hide')).toBe(null)
    expect(screen.queryByText('Remove')).toBe(null)
  })

  test('clicking twice like button calls for function 2 times', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(<Blog blog={blog} deleteBlog={() => {}} updateBlog={mockHandler} />)

    await userEvent.click(screen.getByText('View'))

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
