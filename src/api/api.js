
import request from '../utils/request'
import {defaultConfig} from '../config/index'
const SERVER_CONF = JSON.parse(localStorage.getItem('config')) || defaultConfig

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
export const getDataByDepAuto = (depId, depName) => {
  return request({ url: `/graph/getDepartmentGraphAuto?deptId=${depId}&deptName=${depName}`, method: 'get', })
}
//根据节点id获得关系全图
export const getDataById = (nodeId) => {
  return request({ url: `/graph/getGraphInfo?nodeId=${nodeId}`, method: 'get', })
}
//更新节点坐标（批量）
export const modifyNodesPosition = (data) => {
  return request({ url: `/graph/updateNodeCoord`, method: 'post', data })
}
//根据文件ID获得文件url
export const getFileUrl = (fileId) => {
  return request({ url: `/fss/cloudStorageURL?fileId=${fileId}`, method: 'get', })
}
//关系图更新全量节点
export const modifyRelationPos = (data) => {
  return request({ url: `/graph/addNodeLogCoord`, method: 'post', data })
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
//跳转文档协同
export const jumpFile = (id,fileId,filename,userid,username) => {
  return request({ url: `template?id=${id}&code=${id}&fileId=${fileId}&fileName=${filename}&userId==${userid}&userName=${username}&openType=test`, method: 'get', baseURL:'http://192.168.1.42:8080/'})
}


//【语义网】获得树节点数据
export function getTreeNode (data) {
  return request({
    baseURL: SERVER_CONF.yyw_path,
    url: `/aspsemantic/aspowl/analysis/tree?layer=${data.layer || ''}&type=${data.type || ''}`,
    method: 'post',
    data:{
      hasShowList:data.hasShowList
    }
  })
}

//【语义网】获得关键词列表
export function getKeywordsList (params) {
  return request({
    baseURL: SERVER_CONF.yyw_path,
    url: '/aspsemantic/aspowl/nameLike',
    method: 'GET',
    params
  })
}

//【语义网】通过关键词获得相关文章列表（right-1）
export const getchartDataWithArticle = (keyword) => {
  return request({ url: `/meeting/fss/storage/content?from=0&size=15&owners=meeting&userId=rootadmin0001&keyword=${keyword}`, method: 'post', baseURL: SERVER_CONF.yyw_path })
}

//【语义网】获得饼图数据
export const getchartDataWithPie = () => {
  return request({ url: `/meeting/knowledge/show/sectorGraph`, method: 'post', baseURL: SERVER_CONF.yyw_path })
}

//【语义网】获得柱状图数据
export const getchartDataWithBar = () => {
  return request({ url: `/meeting/knowledge/show/barGraph`, method: 'post', baseURL: SERVER_CONF.yyw_path })
}

//【语义网】获得折线图数据
export const getchartDataWithLine = () => {
  return request({ url: `/meeting`, method: 'post', baseURL: SERVER_CONF.yyw_path })
}