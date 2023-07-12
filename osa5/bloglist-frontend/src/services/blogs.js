import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  /*const request = axios.get(baseUrl)
  return request.then(response => response.data)*/
  const response = await axios.get(baseUrl)
  console.log(response);
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }