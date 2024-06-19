import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


const blog = {
  title: 'Test Blog for Me',
  author: 'Benjamin Blümchen',
  url: 'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16',
  likes: 5,
  user: "jdfö"
}

describe('<Blog />', async () => {
  test('Title and author are displayed, url and likes not', async() => {

    render(<Blog blog={blog} />)

    const url = screen.queryByText('https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16')
    const likes = screen.queryByText(5)
    const title = screen.getByText('Test Blog for Me')
    const author = screen.getByText('Benjamin Blümchen', { exact: false })
    expect(url).toBeNull()
    expect(likes).toBeNull()
    expect(title).toBeDefined()
    expect(author).toBeDefined()
  })

  test('Url and likes are display after expanding', async () => {
    render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const button = screen.getByText('view', { exact: false })
    await user.click(button)
    const likes = screen.getByText(5)
    const url = screen.getByText('https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16')
    expect(likes).toBeDefined()
    expect(url).toBeDefined()
  })

  test('Records correct number of like clicks', async() => {
    const mockHandler = vi.fn()
    render(<Blog blog={blog} like={mockHandler}/>)
    const user = userEvent.setup()
    const viewbutton = screen.getByText('view')
    await user.click(viewbutton)
    const likebutton = screen.getByText('Like')
    await user.click(likebutton)
    await user.click(likebutton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })


})