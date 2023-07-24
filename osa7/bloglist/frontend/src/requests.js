import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getBlogs = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createBlog = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

export const likeBlog = async (data) => {
    console.log(data)
    const response = await axios.put(`${baseUrl}/${data.id}`, data.newObj)
    return response.data
}

export const deleteBlog = async (id) => {
    const config = {
      headers: { Authorization: token },
    }
  
    await axios.delete(`${baseUrl}/${id}`, config)
  }