import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import Blog from './Blog'

test('renders title', () => {
    const user = {
        username: 'username',
        name: 'name'
    }
    const blog = {
        title: 'Test title',
        author: 'Test author',
        url: 'www.test.com',
        likes: 0,
        user: {
            username: 'username',
            name: 'name'
        }
    }

    render(<Blog blog={blog} user={user} />)

    const element = screen.getByText('Test title', { exact: false })
    expect(element).toBeDefined()
})