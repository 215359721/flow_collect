/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const TASK_COLOR_TOP = '#1AE61A'//任务主色
const TASK_COLOR_BOTTOM = '#15B815'
const MEET_COLOR_TOP = '#10DEDE'//会议主色
const MEET_COLOR_BOTTOM = '#0EBEBE'
const CHAT_COLOR_TOP = '#3A60F9'//即时通讯主色
const CHAT_COLOR_BOTTOM = '#0729B5'
const TOOL_COLOR_TOP = '#FFA011'//工具主色
const TOOL_COLOR_BOTTOM = '#DD8500'
const POINT_COLOR = '#ffff00'//便签标签色
const WIDTH = 150 //节点总宽度
const HEIGHT = 50 //节点总高度
const RADIUS = 10 //圆角率
const PADDING_HORIZONTAL = 15 //水平间距
const PADDING_VERTICAL = 22 //垂直间距
const HEIGHT_HEAD = 25 //节点标题高度

//任务节点
const task_node = (node) => {
  const jsx = `
    <group>
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT},
        fill: 'l(90) 0:${TASK_COLOR_TOP} 1:${TASK_COLOR_BOTTOM}',
        radius: ${RADIUS},
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true"
      >
        <rect style={{
          width: ${WIDTH},
          height:25,
          radius:${RADIUS},
          }}draggable="true">
          <image style={{
            img:${require('../../assets/image/newUI/defaultHead.png')},
            width: 20,
            height: 20,
            marginTop: 4,
            marginLeft: ${PADDING_HORIZONTAL},
            next: inline
          }}draggable="true"></image>
          <text style={{
            marginTop: ${PADDING_VERTICAL},
            marginLeft: -35,
            fontWeight: '500',
            fontSize:14,
            fill: '#fff',
            }}draggable="true">
            蔡永强:${node.x}|${node.y}
          </text>
          ${mark_point(node)}
        </rect>
        <rect style={{
          width: ${WIDTH},
          height:25,
          radius:${RADIUS},
          }}draggable="true">
          <text style={{
            marginTop: 17,
            marginLeft: -30,
            fontSize:12,
            fill: '#fff'}}draggable="true">
            ${node.label}
          </text>
        </rect>
      </rect>
    </group>
    `
  return jsx
}
//即时通讯节点
const chat_node = (node) => {
  const jsx = `
    <group>
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT},
        fill: 'l(90) 0:${CHAT_COLOR_TOP} 1:${CHAT_COLOR_BOTTOM}',
        radius: ${RADIUS},
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true"
      >
        <rect style={{
          width: ${WIDTH},
          height:25,
          radius:${RADIUS},
          }}draggable="true">
          <image style={{
            img:${require('../../assets/image/newUI/defaultHead.png')},
            width: 20,
            height: 20,
            marginTop: 4,
            marginLeft: ${PADDING_HORIZONTAL},
            next: inline
          }}draggable="true"></image>
          <text style={{
            marginTop: ${PADDING_VERTICAL},
            marginLeft: -35,
            fontWeight: '500',
            fontSize:14,
            fill: '#fff',
            }}draggable="true">
            蔡永强:${node.x}|${node.y}
          </text>
          ${mark_point(node)}
        </rect>
        <rect style={{
          width: ${WIDTH},
          height:25,
          radius:${RADIUS},
          }}draggable="true">
          <text style={{
            marginTop: 17,
            marginLeft: -30,
            fontSize:12,
            fill: '#fff'}}draggable="true">
            ${node.label}
          </text>
        </rect>
      </rect>
    </group>
    `
  return jsx
}
//会议节点
const meet_node = (node) => {
  const jsx = `
    <group>
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT},
        fill: 'l(90) 0:${MEET_COLOR_TOP} 1:${MEET_COLOR_BOTTOM}',
        radius: ${RADIUS},
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true"
      >
        <rect style={{
          width: ${WIDTH},
          height:25,
          radius:${RADIUS},
          }}draggable="true">
          <image style={{
            img:${require('../../assets/image/newUI/defaultHead.png')},
            width: 20,
            height: 20,
            marginTop: 4,
            marginLeft: ${PADDING_HORIZONTAL},
            next: inline
          }}draggable="true"></image>
          <text style={{
            marginTop: ${PADDING_VERTICAL},
            marginLeft: -35,
            fontWeight: '500',
            fontSize:14,
            fill: '#fff',
            }}draggable="true">
            蔡永强:${node.x}|${node.y}
          </text>
          ${mark_point(node)}
        </rect>
        <rect style={{
          width: ${WIDTH},
          height:25,
          radius:${RADIUS},
          }}draggable="true">
          <text style={{
            marginTop: 17,
            marginLeft: -30,
            fontSize:12,
            fill: '#fff'}}draggable="true">
            ${node.label}
          </text>
        </rect>
      </rect>
    </group>
    `
  return jsx
}
//工具节点
const tool_node = (node) => {
  const jsx = `
    <group>
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT},
        fill: 'l(90) 0:${TOOL_COLOR_TOP} 1:${TOOL_COLOR_BOTTOM}',
        radius: ${RADIUS},
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true"
      >
        <rect style={{
          width: ${WIDTH},
          height:25,
          radius:${RADIUS},
          }}draggable="true">
          <image style={{
            img:${require('../../assets/image/newUI/defaultHead.png')},
            width: 20,
            height: 20,
            marginTop: 4,
            marginLeft: ${PADDING_HORIZONTAL},
            next: inline
          }}draggable="true"></image>
          <text style={{
            marginTop: ${PADDING_VERTICAL},
            marginLeft: -35,
            fontWeight: '500',
            fontSize:14,
            fill: '#fff',
            }}draggable="true">
            蔡永强:${node.x}|${node.y}
          </text>
          ${mark_point(node)}
        </rect>
        <rect style={{
          width: ${WIDTH},
          height:25,
          radius:${RADIUS},
          }}draggable="true">
          <text style={{
            marginTop: 17,
            marginLeft: -30,
            fontSize:12,
            fill: '#fff'}}draggable="true">
            ${node.label}
          </text>
        </rect>
      </rect>
    </group>
    `
  return jsx
}
//批注-圆点
const mark_point = (node) => {
  let content = ''
  const offset_x = 35
  if (node.notes) {
    content = `
      <circle style={{
        r:8,
        fill:${POINT_COLOR},
        marginTop:-3,
        marginLeft:${WIDTH - offset_x},
      }}>
        <text style={{fill:'#5a5a5a',textAlign: 'center',fontSize:12,marginTop:-10,marginLeft:${WIDTH - offset_x},}}>${node.notes.length}</text>
      </circle>
    `
  }
  return content
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
//块节点（背景）
const block_node = (node) => {
  const tipWid = 280
  const tipHei = 30
  const jsx = `
    <group>
      <rect style={{
        width: ${node.width},
        height:${node.height},
        fill: ${(node.index % 2 === 0) ? '#FFFFEE' : '#EEFFFF'},
      }}draggable="true">
        <rect style={{
          width: ${tipWid},
          height:${tipHei},
          radius:6,
          fill:'#edf2fc',
          marginTop:${node.height - tipHei - 20},
          marginLeft:${(node.width - tipWid) / 2}
        }}draggable="true">
          <text style={{
            fill:'#909399',
            textAlign: 'center',
            fontSize:13,
            marginTop:6,
            marginLeft:${(node.width - tipWid) / 2 + 145}}}>${node.label}</text>
        </rect>
      </rect>
    </group>
    `
  return jsx
}
const node = { task_node, chat_node, meet_node, tool_node, line_node, block_node }
export default node