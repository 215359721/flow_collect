// const winHei = document.documentElement.clientHeight || document.body.clientHeight
// const winWid = document.documentElement.clientWidth || document.body.clientWidth

//获得已更新节点集合
const getUpdateNodesPositionList = function (moveList, curMoveNode) {
  if (moveList.length) {
    const result = moveList.find(obj => { return (obj.nodeId === curMoveNode.nodeId) })
    if (result) {
      moveList = moveList.map(item => {
        return (item.nodeId === curMoveNode.nodeId) ? curMoveNode : item
      })
    } else { moveList.push(curMoveNode) }
  } else { moveList.push(curMoveNode) }
  return moveList
}

//获得新增加连线集合
const getNewEdgesList = function (edgeList, curEdge) {
  edgeList.push(curEdge)
  return edgeList
}

export function createUuid(length) {
  let str = Math.random().toString(36).substr(2)
  if (str.length >= length) {
    return str.substr(0, length)
  }
  str += createUuid(length - str.length)
  return str
}

export {
  getUpdateNodesPositionList,
  getNewEdgesList,
}
