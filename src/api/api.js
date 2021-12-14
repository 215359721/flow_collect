
import request from '../utils/request'
const SERVER_CONF = window._SERVERCONF

//获得部门&时间轴信息
export const getXYdata = () => {
  return request({ url: `/graph/getCoordInfo`, method: 'get', })
}
//根据不同的设备类型得到关系全图
export const getMainData = (typeid) => {
  return request({ url: `/graph/getGraph?configId=${typeid}`, method: 'get', })
}
//获得某个部门的关系全图
export const getDataByDep = (typeid, depId, depName) => {
  return request({ url: `/graph/getDepartmentGraph?configId=${typeid}&deptId=${depId}&deptName=${depName}`, method: 'get', })
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


//【语义网】获得树节点数据
export function getTreeNode (params) {
  return request({
    baseURL: SERVER_CONF.base_ip_yyw,
    url: '/aspsemantic/aspowl/analysis/tree',
    method: 'GET',
    params
  })
}

//【语义网】获得关键词列表
export function getKeywordsList (params) {
  return request({
    baseURL: SERVER_CONF.base_ip_yyw,
    url: '/aspsemantic/aspowl/nameLike',
    method: 'GET',
    params
  })
}

//【语义网】通过关键词获得相关文章列表（right-1）
export const getchartDataWithArticle = (keyword) => {
  return request({ url: `/meeting/fss/storage/content?from=0&size=5&owners=meeting&userId=rootadmin0001&keyword=${keyword}`, method: 'post', baseURL: SERVER_CONF.base_ip_yyw })
}

//【语义网】获得饼图数据
export const getchartDataWithPie = () => {
  return request({ url: `/meeting/knowledge/show/sectorGraph`, method: 'post', baseURL: SERVER_CONF.base_ip_yyw })
}

//【语义网】获得柱状图数据
export const getchartDataWithBar = () => {
  return request({ url: `/meeting/knowledge/show/barGraph`, method: 'post', baseURL: SERVER_CONF.base_ip_yyw })
}

//【语义网】获得折线图数据
export const getchartDataWithLine = () => {
  return request({ url: `/meeting`, method: 'post', baseURL: SERVER_CONF.base_ip_yyw })
}