import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggable from './Toggable'

describe('Toggable', () => {
  let container

  beforeEach(() => {
    container = render(
      <Toggable btnLabel='show...'>
        <div className='testDiv'>Toggable content</div>
      </Toggable>,
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('Toggable content')
  })

  test('at start the children are not displayed', () => {
    expect(screen.getByText('Toggable content')).toBeInTheDocument()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.testDiv')
    expect(div).not.toHaveStyle('display: none')
  })
})
