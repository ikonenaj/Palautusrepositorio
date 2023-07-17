/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
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

    let container
    const mockHandler = jest.fn()

    beforeEach(() => {
        container = render(
            <Blog blog={blog} user={user} updateBlog={mockHandler} />
        ).container
    })

    test('renders only title and author', () => {
        expect(container.querySelector('#title')).toHaveTextContent(`${blog.title}`)
        expect(container.querySelector('#title')).toBeVisible()
        expect(container.querySelector('#author')).toHaveTextContent(`${blog.author}`)
        expect(container.querySelector('#author')).toBeVisible()
        expect(container.querySelector('#url')).not.toBeVisible()
        expect(container.querySelector('#likes')).not.toBeVisible()
        expect(container.querySelector('#name')).not.toBeVisible()
    })

    test('render everything when button is pressed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        expect(container.querySelector('#url')).toHaveTextContent(`${blog.url}`)
        expect(container.querySelector('#url')).toBeVisible()
        expect(container.querySelector('#name')).toHaveTextContent(`${blog.user.name}`)
        expect(container.querySelector('#name')).toBeVisible()
        expect(container.querySelector('#likes')).toHaveTextContent(`likes ${blog.likes}`)
        expect(container.querySelector('#likes')).toBeVisible()
    })

    test('clicking the like button twice calls event handler twice', async () => {
        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})