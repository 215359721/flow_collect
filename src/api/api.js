
import request from '../utils/request'

//根据不同的设备类型得到关系全图
export const getMainData = (typeid) => {
  return request({ url: `/graph/getGraph?configId=${typeid}`, method: 'get', })
}
//获得部门&时间轴信息
export const getXYdata = () => {
  return request({ url: `/graph/getCoordInfo`, method: 'get', })
}
//更新节点坐标（批量）
export const modifyNodesPosition = (data) => {
  return request({ url: `/graph/updateNodeCoord`, method: 'post', data })
}

export function getTreeNode(params) {
  return request({
    url: '/aspowl/analysis/tree',
    method: 'GET',
    params
  })
}

export function getKeywordsList(params) {
  return request({
    url: '/aspowl/nameLike',
    method: 'GET',
    params
  })
}
