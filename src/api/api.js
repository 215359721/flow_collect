
import request from '../utils/request'

export const test = () => {
  return request({ url: ``, method: 'get', baseURL: 'https://jsonplaceholder.typicode.com/posts' })
}
