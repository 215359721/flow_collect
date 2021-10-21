/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const TASK_COLOR = '#1aad19'//任务主色
const CHAT_COLOR = '#1890ff'//即时通讯主色
const MARK_COLOR = '#ffcc00'//便签主色
const WIDTH = 150 //节点总宽度
const HEIGHT_HEAD = 25 //节点标题高度
const MARGIN_LEFT = 5 //节点模块横向间距
const HEIGHT_INFO = 20 //节点详情高度
const MARK_WIDTH = 150 //便签宽度
const MARK_HEIGHT = 30 //便签高度
//节点-详情
const info_part = (node) => `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_INFO},
    marginLeft: ${MARGIN_LEFT},
  }}
  draggable="true"
 >
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: ${(HEIGHT_INFO / 2) - 8},${node.unfinish ? "fill: '#aaa'" : "fill: '#666'"},fontSize:12,}}>执行人：(${node.x},${node.y})</text>
  </rect>
`
//批注-详情
const mark_part = (node) => `
  <rect style={{
    width: ${(MARK_WIDTH) - (MARGIN_LEFT * 2)},
    height:${MARK_HEIGHT},
    marginLeft: ${MARGIN_LEFT},
  }}
  draggable="true"
 >
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: ${(HEIGHT_INFO / 2) - 8},${node.unfinish ? "fill: '#aaa'" : "fill: '#666'"}, fontSize:10,}}>此处任务关联信息附件不明确</text>
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
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
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
          ${node.id + ':' + node.label}
        </text>
      </rect>
      <rect style={{
      width: ${WIDTH},
      height:${currentHei},
      fill: '#F7F7F7',
      stroke: ${TASK_COLOR},
      lineWidth:1,
      ${node.unfinish ? "lineDash:[2,2]," : ""}
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
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
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
          ${node.id + ':' + node.label}
        </text>
      </rect>
      <rect style={{
      width: ${WIDTH},
      height:${currentHei},
      fill: '#F7F7F7',
      stroke: ${CHAT_COLOR},
      lineWidth:1,
      ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}draggable="true">
        ${info_part(node)}
      </rect>
    </group>
    `
  return jsx
}
//便签节点
const mark_node = (node) => {
  const jsx = `
    <group>
      <rect style={{
        width: ${MARK_WIDTH},
        height:20,
        fill: ${MARK_COLOR},
        stroke: ${MARK_COLOR},
        radius: [6, 6, 0, 0],
      }}
      draggable="true"
      >
        <text style={{
          marginTop: 12,
          marginLeft: ${(MARK_WIDTH / 2) - 18},
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize:11,
          stroke: '#000',
          fill: '#fff'}}draggable="true">
          ${node.id}:批注
        </text>
      </rect>
      <rect style={{
      width: ${MARK_WIDTH},
      height:${MARK_HEIGHT},
      fill: '#F7F7F7',
      stroke: ${MARK_COLOR},
      lineWidth:1,
      }}draggable="true">
        ${mark_part(node)}
      </rect>
    </group>
    `
  return jsx
}
//标示线节点
const line_node = (node) => {
  const jsx = `
    <group>
      <rect style={{
        width: ${node.width},
        height:${node.height},
      }}>
      <path style={{
        fill: ${node.color},
        stroke: ${node.color},
        path:'M 0,0 v${node.height}',
        lineWidth:${node.width + 1},
        ${node.dotline ? "lineDash:[2,2]," : ""}
      }}></path>
      </rect>
    </group>
    `
  return jsx
}
const custNode = { task_node, chat_node, mark_node, line_node }
export default custNode