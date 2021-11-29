import { fittingString } from '../../utils/common'
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const TASK_COLOR_TOP = '#75da3a'//任务主色
const TASK_COLOR_MIDDEL = '#4ac149'
const TASK_COLOR_BOTTOM = '#28af21'
const MEET_COLOR_TOP = '#06e4e7'//会议主色
const MEET_COLOR_MIDDEL = '#00b6c9'
const MEET_COLOR_BOTTOM = '#32a5c6'
const CHAT_COLOR_TOP = '#3291fb'//即时通讯主色
const CHAT_COLOR_MIDDEL = '#3075ed'
const CHAT_COLOR_BOTTOM = '#3063dc'
const TOOL_COLOR_TOP = '#ffb100'//工具主色
const TOOL_COLOR_MIDDEL = '#ff9d00'
const TOOL_COLOR_BOTTOM = '#e99400'
const POINT_COLOR = '#ffff00'//便签标签色
const WIDTH = 150 //节点总宽度
const HEIGHT = 50 //节点总高度
const HEIGHT_VER = 55 //纵向排列高度
const RADIUS = 10 //圆角率
const PADDING_HORIZONTAL = 15 //水平间距
const PADDING_VERTICAL = 22 //垂直间距
const defaultHead = require('../../assets/image/newUI/defaultHead.png')
const getName = (node) => { return `${node.creatorName || '暂无'}` }
//任务节点
const task_node = (node) => {
  const jsx = `
    <group>
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT},
        fill: 'l(90) 0:${TASK_COLOR_TOP} 0.5:${TASK_COLOR_MIDDEL} 1:${TASK_COLOR_BOTTOM}',
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
            img:${node.creatorPhotoUrl || defaultHead},
            width: 20,
            height: 20,
            marginTop: 4,
            marginLeft: ${PADDING_HORIZONTAL},
            next: inline
          }}draggable="true"></image>
          <text style={{
            marginTop: ${PADDING_VERTICAL},
            marginLeft: -30,
            fontWeight: '500',
            fontSize:14,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
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
            ${fittingString(node.label, 125, 12)}
          </text>
        </rect>
      </rect>
    </group>
    `
  return jsx
}
//任务节点-左右结构样式
const task_node_ver = (node) => {
  const jsx = `
    <group>
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT_VER},
        fill: 'l(90) 0:${TASK_COLOR_TOP} 0.5:${TASK_COLOR_MIDDEL} 1:${TASK_COLOR_BOTTOM}',
        radius: ${RADIUS},
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true"
      >
        <image style={{
          img:${node.creatorPhotoUrl || defaultHead},
          width: 30,
          height: 30,
          marginTop: 5,
          marginLeft: ${PADDING_HORIZONTAL},
          next: inline,
        }}draggable="true"></image>
        ${breakLine(node)}
        <path style={{
          fill: '#fff',
          stroke: '#fff',
          path:'M 60,5 v45',
          lineWidth:2,
          lineDash:[2,2],
        }}></path>
      </rect>
      <text style={{
        marginTop: -5,
        marginLeft: ${(getName(node).length > 2) ? -25 : -20},
        fontWeight: '500',
        fontSize:13,
        fill: '#fff',
        }}draggable="true">
        ${getName(node)}
      </text>
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
        fill: 'l(90) 0:${CHAT_COLOR_TOP} 0.5:${CHAT_COLOR_MIDDEL} 1:${CHAT_COLOR_BOTTOM}',
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
            img:${node.creatorPhotoUrl || defaultHead},
            width: 20,
            height: 20,
            marginTop: 4,
            marginLeft: ${PADDING_HORIZONTAL},
            next: inline
          }}draggable="true"></image>
          <text style={{
            marginTop: ${PADDING_VERTICAL},
            marginLeft: -30,
            fontWeight: '500',
            fontSize:14,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
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
            ${fittingString(node.label, 125, 12)}
          </text>
        </rect>
      </rect>
    </group>
    `
  return jsx
}
//即时通讯节点-左右结构样式
const chat_node_ver = (node) => {
  const jsx = `
    <group>
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT_VER},
        fill: 'l(90) 0:${CHAT_COLOR_TOP} 0.5:${CHAT_COLOR_MIDDEL} 1:${CHAT_COLOR_BOTTOM}',
        radius: ${RADIUS},
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true"
      >
        <image style={{
          img:${node.creatorPhotoUrl || defaultHead},
          width: 30,
          height: 30,
          marginTop: 5,
          marginLeft: ${PADDING_HORIZONTAL},
          next: inline,
        }}draggable="true"></image>
        ${breakLine(node)}
        <path style={{
          fill: '#fff',
          stroke: '#fff',
          path:'M 60,5 v45',
          lineWidth:2,
          lineDash:[2,2],
        }}></path>
      </rect>
      <text style={{
        marginTop: -5,
        marginLeft: ${(getName(node).length > 2) ? -25 : -20},
        fontWeight: '500',
        fontSize:13,
        fill: '#fff',
        }}draggable="true">
        ${getName(node)}
      </text>
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
        fill: 'l(90) 0:${MEET_COLOR_TOP} 0.5:${MEET_COLOR_MIDDEL} 1:${MEET_COLOR_BOTTOM}',
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
            img:${node.creatorPhotoUrl || defaultHead},
            width: 20,
            height: 20,
            marginTop: 4,
            marginLeft: ${PADDING_HORIZONTAL},
            next: inline
          }}draggable="true"></image>
          <text style={{
            marginTop: ${PADDING_VERTICAL},
            marginLeft: -30,
            fontWeight: '500',
            fontSize:14,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
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
            ${fittingString(node.label, 125, 12)}
          </text>
        </rect>
      </rect>
    </group>
    `
  return jsx
}
//会议节点-左右结构样式
const meet_node_ver = (node) => {
  const jsx = `
    <group>
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT_VER},
        fill: 'l(90) 0:${MEET_COLOR_TOP} 0.5:${MEET_COLOR_MIDDEL} 1:${MEET_COLOR_BOTTOM}',
        radius: ${RADIUS},
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true"
      >
        <image style={{
          img:${node.creatorPhotoUrl || defaultHead},
          width: 30,
          height: 30,
          marginTop: 5,
          marginLeft: ${PADDING_HORIZONTAL},
          next: inline,
        }}draggable="true"></image>
        ${breakLine(node)}
        <path style={{
          fill: '#fff',
          stroke: '#fff',
          path:'M 60,5 v45',
          lineWidth:2,
          lineDash:[2,2],
        }}></path>
      </rect>
      <text style={{
        marginTop: -5,
        marginLeft: ${(getName(node).length > 2) ? -25 : -20},
        fontWeight: '500',
        fontSize:13,
        fill: '#fff',
        }}draggable="true">
        ${getName(node)}
      </text>
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
        fill: 'l(90) 0:${TOOL_COLOR_TOP} 0.5:${TOOL_COLOR_MIDDEL} 1:${TOOL_COLOR_BOTTOM}',
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
            img:${node.creatorPhotoUrl || defaultHead},
            width: 20,
            height: 20,
            marginTop: 4,
            marginLeft: ${PADDING_HORIZONTAL},
            next: inline
          }}draggable="true"></image>
          <text style={{
            marginTop: ${PADDING_VERTICAL},
            marginLeft: -30,
            fontWeight: '500',
            fontSize:14,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
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
            fill: '#fff'}} draggable="true">
           ${fittingString(node.label || '暂无', 125, 12)}
          </text>
        </rect>
      </rect>
    </group>
    `
  return jsx
}
//工具节点-左右结构样式
const tool_node_ver = (node) => {
  const jsx = `
    <group>
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT_VER},
        fill: 'l(90) 0:${TOOL_COLOR_TOP} 0.5:${TOOL_COLOR_MIDDEL} 1:${TOOL_COLOR_BOTTOM}',
        radius: ${RADIUS},
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true"
      >
        <image style={{
          img:${node.creatorPhotoUrl || defaultHead},
          width: 30,
          height: 30,
          marginTop: 5,
          marginLeft: ${PADDING_HORIZONTAL},
          next: inline,
        }}draggable="true"></image>
        ${breakLine(node)}
        <path style={{
          fill: '#fff',
          stroke: '#fff',
          path:'M 60,5 v45',
          lineWidth:2,
          lineDash:[2,2],
        }}></path>
      </rect>
      <text style={{
        marginTop: -5,
        marginLeft: ${(getName(node).length > 2) ? -25 : -20},
        fontWeight: '500',
        fontSize:13,
        fill: '#fff',
        }}draggable="true">
        ${getName(node)}
      </text>
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
      }} draggable="true">
        <text style={{fill:'#5a5a5a',textAlign: 'center',fontSize:12,marginTop:-10,marginLeft:${WIDTH - offset_x},}} draggable="true">${node.notes.length}</text>
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
        fill: ${(node.index % 2 === 0) ? '#fff' : '#f7f7f7'},
      }}draggable="true">
        <rect style={{
          width: ${tipWid},
          height:${tipHei},
          radius:6,
          fill:'#edf2fc',
          marginTop:${node.height - tipHei - 5},
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
const breakLine = (node) => {
  // eslint-disable-next-line no-control-regex
  var reg = /[^\x00-\xff]/g
  let textArr = [], start = 0, inc = 6, cont = true
  const tempDesc = node.label || '暂无标题'
  let content = '', line_str = '', leng = 0
  for (let i = 0; i < tempDesc.length; i++) {
    const word = tempDesc[i]
    if (reg.test(word)) {
      leng += 2
    } else {
      leng += 1
    }
    line_str += word
    if (leng > 8) {
      textArr.push(line_str)
      leng = 0
      line_str = ''
    }
  }
  textArr.push(line_str)
  leng = 0
  line_str = ''
  const arr = textArr.slice(0, 3)
  arr.forEach(element => {
    content += "<text style={{ height: 20, marginLeft: 35, marginTop: 2, fill: '#fff'}}>" + element + "</text>"
  });

  return `${content}`
}


function sub (str, n) {
  // eslint-disable-next-line no-control-regex
  var r = /[^\x00-\xff]/g;
  if (str.replace(r, "**").length <= n) { return str; }
  var m = Math.floor(n / 2);
  for (var i = m; i < str.length; i++) {
    if (str.substr(0, i).replace(r, "**").length >= n) {
      return str.substr(0, i) + "...";
    }
  }
  return str;
}

const node = {
  task_node,
  task_node_ver,
  chat_node,
  chat_node_ver,
  meet_node,
  meet_node_ver,
  tool_node,
  tool_node_ver,
  line_node,
  block_node,
}
export default node