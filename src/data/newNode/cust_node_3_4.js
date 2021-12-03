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
const WIDTH = 150 //节点总宽度
const HEIGHT = 50 //节点总高度
const HEIGHT_VER = 55 //纵向排列高度
const RADIUS = 10 //圆角率
const defaultHead = require('../../assets/image/newUI/defaultIcon.png')
const getName = (node) => { return `${node.creatorName || '暂无'}` }

//任务节点-样式3
const task_node_style3 = (node) => {
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
        <rect style={{
          width: 48,
          height:${HEIGHT_VER - 10},
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
          next: inline,
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 30,
            height: 30,
            marginTop: 0,
            marginLeft: 15,
          }}draggable="true"></image>
          <text style={{
            marginTop: 12,
            marginLeft: ${(getName(node).length > 2) ? -37 : -30},
            fontWeight: '500',
            fontSize:12,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        <rect style={{
          width: 90,
          height:${HEIGHT_VER - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
        }}>
          ${breakLine(node, 11, TASK_COLOR_BOTTOM)}
        </rect>
      </rect>
    </group>`
  return jsx
}
//任务节点-样式4
const task_node_style4 = (node) => {
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
        <rect style={{
          width: 48,
          height:${HEIGHT_VER - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
          next: inline,
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 25,
            height: 25,
            marginTop: 5,
            marginLeft: 15,
          }}draggable="true"></image>
          <text style={{
            marginTop: 16,
            marginLeft: ${(getName(node).length > 2) ? -37 : -32},
            fontWeight: '500',
            fontSize:12,
            fill: ${TASK_COLOR_BOTTOM},
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        <rect style={{
          width: 85,
          height:${HEIGHT_VER - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:10,
          radius: ${RADIUS},
        }}>
          ${breakLine(node, 15, TASK_COLOR_BOTTOM)}
        </rect>
      </rect>
    </group>`
  return jsx
}
//即时通讯节点-样式3
const chat_node_style3 = (node) => {
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
        <rect style={{
          width: 48,
          height:${HEIGHT_VER - 10},
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
          next: inline,
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 30,
            height: 30,
            marginTop: 0,
            marginLeft: 15,
          }}draggable="true"></image>
          <text style={{
            marginTop: 12,
            marginLeft: ${(getName(node).length > 2) ? -37 : -30},
            fontWeight: '500',
            fontSize:12,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        <rect style={{
          width: 90,
          height:${HEIGHT_VER - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
        }}>
          ${breakLine(node, 11, CHAT_COLOR_BOTTOM)}
        </rect>
      </rect>
    </group>`
  return jsx
}
//即时通讯节点-样式4
const chat_node_style4 = (node) => {
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
        <rect style={{
          width: 48,
          height:${HEIGHT_VER - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
          next: inline,
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 25,
            height: 25,
            marginTop: 5,
            marginLeft: 15,
          }}draggable="true"></image>
          <text style={{
            marginTop: 16,
            marginLeft: ${(getName(node).length > 2) ? -37 : -32},
            fontWeight: '500',
            fontSize:12,
            fill: ${CHAT_COLOR_BOTTOM},
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        <rect style={{
          width: 85,
          height:${HEIGHT_VER - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:10,
          radius: ${RADIUS},
        }}>
          ${breakLine(node, 15, CHAT_COLOR_BOTTOM)}
        </rect>
      </rect>
    </group>`
  return jsx
}
//会议节点-样式3
const meet_node_style3 = (node) => {
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
        <rect style={{
          width: 48,
          height:${HEIGHT_VER - 10},
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
          next: inline,
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 30,
            height: 30,
            marginTop: 0,
            marginLeft: 15,
          }}draggable="true"></image>
          <text style={{
            marginTop: 12,
            marginLeft: ${(getName(node).length > 2) ? -37 : -30},
            fontWeight: '500',
            fontSize:12,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        <rect style={{
          width: 90,
          height:${HEIGHT_VER - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
        }}>
          ${breakLine(node, 11, MEET_COLOR_BOTTOM)}
        </rect>
      </rect>
    </group>`
  return jsx
}
//会议节点-样式4
const meet_node_style4 = (node) => {
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
        <rect style={{
          width: 48,
          height:${HEIGHT_VER - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
          next: inline,
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 25,
            height: 25,
            marginTop: 5,
            marginLeft: 15,
          }}draggable="true"></image>
          <text style={{
            marginTop: 16,
            marginLeft: ${(getName(node).length > 2) ? -37 : -32},
            fontWeight: '500',
            fontSize:12,
            fill: ${MEET_COLOR_BOTTOM},
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        <rect style={{
          width: 85,
          height:${HEIGHT_VER - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:10,
          radius: ${RADIUS},
        }}>
          ${breakLine(node, 15, MEET_COLOR_BOTTOM)}
        </rect>
      </rect>
    </group>`
  return jsx
}
//工具节点-样式3
const tool_node_style3 = (node) => {
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
        <rect style={{
          width: 48,
          height:${HEIGHT_VER - 10},
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
          next: inline,
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 30,
            height: 30,
            marginTop: 0,
            marginLeft: 15,
          }}draggable="true"></image>
          <text style={{
            marginTop: 12,
            marginLeft: ${(getName(node).length > 2) ? -37 : -30},
            fontWeight: '500',
            fontSize:12,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        <rect style={{
          width: 90,
          height:${HEIGHT_VER - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
        }}>
          ${breakLine(node, 11, TOOL_COLOR_BOTTOM)}
        </rect>
      </rect>
    </group>`
  return jsx
}
//工具节点-样式4
const tool_node_style4 = (node) => {
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
        <rect style={{
          width: 48,
          height:${HEIGHT_VER - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
          next: inline,
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 25,
            height: 25,
            marginTop: 5,
            marginLeft: 15,
          }}draggable="true"></image>
          <text style={{
            marginTop: 16,
            marginLeft: ${(getName(node).length > 2) ? -37 : -32},
            fontWeight: '500',
            fontSize:12,
            fill: ${TOOL_COLOR_BOTTOM},
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        <rect style={{
          width: 85,
          height:${HEIGHT_VER - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:10,
          radius: ${RADIUS},
        }}>
          ${breakLine(node, 15, TOOL_COLOR_BOTTOM)}
        </rect>
      </rect>
    </group>`
  return jsx
}
const breakLine = (node, ml = 0, color = '#ff0000') => {
  // eslint-disable-next-line no-control-regex
  var reg = /[^\x00-\xff]/g
  let textArr = [], start = 0, inc = 6, cont = true
  let tempDesc = node.label || '暂无标题'
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
  let mt = 12
  if (arr.length === 2) {
    mt = 5
  }
  if (arr.length === 3) {
    mt = -2
  }
  arr.forEach(element => {
    content += "<text style={{ lineHeight: 13, marginLeft: " + ml + ",fontSize:12,fontWeight: '500', marginTop: " + mt + ", fill: " + color + "}}>" + element + "</text>"
  });

  return `${content}`
}

const node = {
  task_node_style3,
  chat_node_style3,
  meet_node_style3,
  tool_node_style3,
  task_node_style4,
  chat_node_style4,
  meet_node_style4,
  tool_node_style4,
}
export default node