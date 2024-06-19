import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'

describe('<NewBlog />', async() => {
  test.only('correct forwarding of values', async() => {

    const create = vi.fn()
    const user = userEvent.setup()

    render(<NewBlog createBlog={create} />)

    const title = screen.getByPlaceholderText('Blog Title')
    const author = screen.getByPlaceholderText('Blog Author')
    const url = screen.getByPlaceholderText('Blog Url')
    const button = screen.getByText('Create')

    await user.type(title, 'New Blog title')
    await user.type(author, 'New Author')
    await user.type(url, 'url.com')
    await user.click(button)

    expect(create.mock.calls).toHaveLength(1)
    expect(create.mock.calls[0][0].title).toBe('New Blog title')
    expect(create.mock.calls[0][0].author).toBe('New Author')
    expect(create.mock.calls[0][0].url).toBe('url.com')

  })
})