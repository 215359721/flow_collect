
import request from '../utils/request'

export const getMainData = () => {
  return request({ url: ``, method: 'get', baseURL: 'https://jsonplaceholder.typicode.com/posts' })
}
