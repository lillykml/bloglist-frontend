import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


const blog = {
  title: 'Test Blog for Me',
  author: 'Benjamin Blümchen',
  url: 'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16',
  likes: 5
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

  test('Url and likes are display after expanding', async() => {
    const container = render(<Blog blog={blog} />).container
    const user = userEvent.setup()
    const button = container.querySelector('#blog-view-button')
    user.click(button)
    const likes = container.querySelector('#blog-likes')
    const url = container.querySelector('#blog-url')
    expect(likes).toBeDefined()
    expect(url).toBeDefined()
  })
})