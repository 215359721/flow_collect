/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const TASK_COLOR = '#1aad19'
const CHAT_COLOR = '#1890ff'
const WIDTH = 150 //总宽度
const HEIGHT_HEAD = 25 //标题高度
const MARGIN_LEFT = 5 //模块横向间距
const HEIGHT_INFO = 20 //详情高度
//详情
const info_part = (node) => `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_INFO},
    marginLeft: ${MARGIN_LEFT},
  }}
  draggable="true"
 >
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: ${(HEIGHT_INFO / 2) - 8},fill: '#666',fontSize:12,}}>执行人：赵竹林</text>
  </rect>
`
//任务节点
const task_node = (node) => {
  let currentHei = 25
  const jsx = `
    <group>
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT_HEAD},
        fill: ${TASK_COLOR},
        stroke: ${TASK_COLOR},
        radius: [6, 6, 0, 0],
      }}
      draggable="true"
      >
        <text style={{
          marginTop: ${(HEIGHT_HEAD - 8)},
          marginLeft: ${(WIDTH / 2) - 15},
          fontWeight: 'bold',
          fontSize:11,
          textAlign: 'center',
          stroke: '#000',
          fill: '#fff'}}draggable="true">
          ${node.id}:${node.label}
        </text>
      </rect>
      <rect style={{
      width: ${WIDTH},
      height:${currentHei},
      fill: '#F7F7F7',
      stroke: ${TASK_COLOR},
      lineWidth:1,
      }}draggable="true">
        ${info_part(node)}
      </rect>
    </group>
    `
  return jsx
}
//即时通讯节点
const chat_node = (node) => {
  let currentHei = 25
  const jsx = `
    <group>
      <rect style={{
        width: ${WIDTH},
        height:${HEIGHT_HEAD},
        fill: ${CHAT_COLOR},
        stroke: ${CHAT_COLOR},
        radius: [6, 6, 0, 0],
      }}
      draggable="true"
      >
        <text style={{
          marginTop: ${(HEIGHT_HEAD - 8)},
          marginLeft: ${(WIDTH / 2) - 15},
          fontWeight: 'bold',
          fontSize:11,
          textAlign: 'center',
          stroke: '#000',
          fill: '#fff'}}draggable="true">
          ${node.id}:${node.label}
        </text>
      </rect>
      <rect style={{
      width: ${WIDTH},
      height:${currentHei},
      fill: '#F7F7F7',
      stroke: ${CHAT_COLOR},
      lineWidth:1,
      }}draggable="true">
        ${info_part(node)}
      </rect>
    </group>
    `
  return jsx
}
const custNode = { task_node, chat_node }
export default custNode