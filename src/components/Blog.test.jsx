import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { describe } from 'vitest'

describe('<Blog />', async () => {
  test('Title and author are displayed, url and likes not', async() => {

    const blog = {
      title: 'Test Blog for Me',
      author: 'Benjamin Blümchen',
      url: 'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16',
      likes: 5
    }

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
})