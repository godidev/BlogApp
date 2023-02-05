import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogsForm from './BlogsForm'

describe('BlogsForm', () => {
  test('Renders the component and clicking add blog actualy works', async () => {
    const mockHandler = jest.fn()
    render(<BlogsForm addBlog={ mockHandler }/>)

    const button = screen.getByText('Create Blog')

    expect(button).toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('Returns valid data', async () => {
    const handleNewBlog = jest.fn()

    const { container } = render(<BlogsForm addBlog={ handleNewBlog }/>)

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const form = container.querySelector('#form')

    fireEvent.change(title, {
      target: { value: 'blog title' }
    })
    fireEvent.change(author, {
      target: { value: 'blog author' }
    })
    fireEvent.change(url, {
      target: { value: 'blog url' }
    })

    fireEvent.submit(form)

    expect(handleNewBlog.mock.calls).toHaveLength(1)
    expect(handleNewBlog.mock.calls[0][0].title).toBe('blog title')
    expect(handleNewBlog.mock.calls[0][0].author).toBe('blog author')
    expect(handleNewBlog.mock.calls[0][0].url).toBe('blog url')
  })
})
