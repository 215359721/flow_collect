
import request from '../utils/request'

export const getMainData = () => {
  return request({ url: ``, method: 'get', baseURL: 'https://jsonplaceholder.typicode.com/posts' })
}

export function getTreeNode (params) {
  return request({
    url: '/aspowl/analysis/tree',
    method: 'GET',
    params
  })
}

export function getKeywordsList (params) {
  return request({
    url: '/aspowl/nameLike',
    method: 'GET',
    params
  })
}
