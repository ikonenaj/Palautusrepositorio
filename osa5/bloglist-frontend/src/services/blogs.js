import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = async () => {
  /*const request = axios.get(baseUrl)
  return request.then(response => response.data)*/
  const response = await axios.get(baseUrl)
  console.log(response);
  return response.data
}

const create = async blogObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { create, getAll, setToken }