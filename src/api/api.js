
import request from '../utils/request'
import { baseUrl } from '../config'


//获得部门&时间轴信息
export const getXYdata = () => {
  return request({ url: `/graph/getCoordInfo`, method: 'get', })
}
//根据不同的设备类型得到关系全图
export const getMainData = (typeid) => {
  return request({ url: `/graph/getGraph?configId=${typeid}`, method: 'get', })
}
//根据节点id获得关系全图
export const getDataById = (nodeId) => {
  return request({ url: `/graph/getGraphInfo?nodeId=${nodeId}`, method: 'get', })
}
//更新节点坐标（批量）
export const modifyNodesPosition = (data) => {
  return request({ url: `/graph/updateNodeCoord`, method: 'post', data })
}
//添加批注
export const addMark = (data) => {
  return request({ url: `/graph/addNote`, method: 'post', data })
}
//删除批注
export const delMark = (data) => {
  return request({ url: `/graph/delNote`, method: 'post', data })
}
//追加更新批注
export const modifyMark = (data) => {
  return request({ url: `/graph/updateNote`, method: 'post', data })
}
//增加连线（批量）
export const addLink = (data) => {
  return request({ url: `/graph/addNoteLink`, method: 'post', data })
}

export function getTreeNode(params) {
  return request({
    baseURL: baseUrl,
    url: '/aspowl/analysis/tree',
    method: 'GET',
    params
  })
}

export function getKeywordsList(params) {
  return request({
    baseURL: baseUrl,
    url: '/aspowl/nameLike',
    method: 'GET',
    params
  })
}
