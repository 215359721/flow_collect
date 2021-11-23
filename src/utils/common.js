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

//截取指定长度字符串+...
const splitStr = function (sourceStr, len) {
  return sourceStr.substr(0, len) + '···'
}

//防抖函数
const debounce = function (fn, delay) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn();
    }, delay);
  }
}
//判断当前日期是否在指定日期中间
const isDuringDate = function (beginDateStr, endDateStr) {
  var curDate = new Date(),
    beginDate = new Date(beginDateStr),
    endDate = new Date(endDateStr);
  if (curDate >= beginDate && curDate <= endDate) {
    return true;
  }
  return false;
}

export function createUuid (length) {
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
  splitStr,
  debounce,
  isDuringDate,
}
