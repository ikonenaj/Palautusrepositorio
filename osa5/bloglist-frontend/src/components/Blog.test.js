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

    beforeEach(() => {
        container = render(
            <Blog blog={blog} user={user} />
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
})

/*test('renders title', () => {
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

    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()
    const url = screen.queryByText(`${blog.url}`)
    expect(url).toBeNull()
    const likes =  screen.queryByText(`likes ${blog.likes}`)
    expect(likes).toBeNull()
})*/