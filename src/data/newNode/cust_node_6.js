const WIDTH = 200 //节点总宽度
const HEIGHT = 63 //节点总高度
const TASK_COLOR = '#58b431'//任务主色
const MEET_COLOR = '#04d4dc'//会议主色
const CHAT_COLOR = '#3e8acb'//即时通讯主色
const TOOL_COLOR = '#f6a200'//工具主色
const TAKS_BG_COLOR = '#094d16'
const MEET_BG_COLOR = '#055184'
const CHAT_BG_COLOR = '#040473'
const TOOL_BG_COLOR = '#733104'
const RADIUS = 6 //圆角率
const TASK_SVG = require('../../assets/svg/task.svg')
const MEET_SVG = require('../../assets/svg/meet.svg')
const CHAT_SVG = require('../../assets/svg/chat.svg')
const TOOL_SVG = require('../../assets/svg/tool.svg')
const IMG_SIZE = 42
const getName = (node, field = "creatorName") => { return `${node[field] || '暂无'}` }
//阴影
const shadow = () => {
  return `shadowColor:'#999',shadowBlur:3,shadowOffsetX:2,shadowOffsetY:2,`
}
//任务节点-样式6
const task_node_style6 = (node) => {
  const jsx = `
    <group keyshape="true">
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT},
        fill: '${TASK_COLOR}',
        radius: ${RADIUS},
        ${shadow()}
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true" keyshape="true">
        <rect style={{
          width: 50,
          height: 50,
          marginTop: 5,
          marginLeft:5,
          fill:${TAKS_BG_COLOR},
          radius: ${RADIUS},
        }}draggable="true">
          <image style={{
            img:${TASK_SVG},
            width: ${IMG_SIZE},
            height: ${IMG_SIZE},
            marginTop: 3,
            marginLeft: 9,
            next: inline,
          }}draggable="true"></image>
          <text style={{
            marginTop: 20,
            marginLeft: -30,
            fontWeight: '550',
            fontSize:15,
            fill: '#fff',
            }}draggable="true">
            ${getName(node, "executor")}
          </text>
        </rect>
        ${breakLine(node)}
      </rect>
    </group>`
  return jsx
}
//即时通讯节点-样式6
const chat_node_style6 = (node) => {
  const jsx = `
    <group keyshape="true">
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT},
        fill: '${CHAT_COLOR}',
        radius: ${RADIUS},
        ${shadow()}
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true" keyshape="true">
        <rect style={{
          width: 50,
          height: 50,
          marginTop: 5,
          marginLeft:5,
          fill:${CHAT_BG_COLOR},
          radius: ${RADIUS},
        }}draggable="true">
          <image style={{
            img:${CHAT_SVG},
            width: ${IMG_SIZE},
            height: ${IMG_SIZE},
            marginTop: 3,
            marginLeft: 9,
            next: inline,
          }}draggable="true"></image>
          <text style={{
            marginTop: 20,
            marginLeft: -30,
            fontWeight: '550',
            fontSize:15,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        ${breakLine(node)}
      </rect>
    </group>`
  return jsx
}
//会议节点-样式6
const meet_node_style6 = (node) => {
  const jsx = `
    <group keyshape="true">
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT},
        fill: '${MEET_COLOR}',
        radius: ${RADIUS},
        ${shadow()}
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true" keyshape="true">
        <rect style={{
          width: 50,
          height: 50,
          marginTop: 5,
          marginLeft:5,
          fill:${MEET_BG_COLOR},
          radius: ${RADIUS},
        }}draggable="true">
          <image style={{
            img:${MEET_SVG},
            width: ${IMG_SIZE},
            height: ${IMG_SIZE},
            marginTop: 3,
            marginLeft: 9,
            next: inline,
          }}draggable="true"></image>
          <text style={{
            marginTop: 20,
            marginLeft: -30,
            fontWeight: '550',
            fontSize:15,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        ${breakLine(node)}
      </rect>
    </group>`
  return jsx
}
//工具节点-样式6
const tool_node_style6 = (node) => {
  const jsx = `
    <group keyshape="true">
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT},
        fill: '${TOOL_COLOR}',
        radius: ${RADIUS},
        ${shadow()}
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true" keyshape="true">
        <rect style={{
          width: 50,
          height: 50,
          marginTop: 5,
          marginLeft:5,
          fill:${TOOL_BG_COLOR},
          radius: ${RADIUS},
        }}draggable="true">
          <image style={{
            img:${node.detailInfo.appIcon || TOOL_SVG},
            width: ${IMG_SIZE},
            height: ${IMG_SIZE},
            marginTop: 4,
            marginLeft: 9,
            next: inline,
          }}draggable="true"></image>
          <text style={{
            marginTop: 20,
            marginLeft: -30,
            fontWeight: '550',
            fontSize:15,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        ${breakLine(node)}
      </rect>
    </group>`
  return jsx
}
const breakLine = (node, color = '#fff') => {
  // eslint-disable-next-line no-control-regex
  var reg = /[^\x00-\xff]/g
  let textArr = []
  let tempDesc = node.label || '暂无标题'
  // tempDesc = '暂无标题暂无标题暂无标题暂无标题'
  let content = '', line_str = '', leng = 0
  for (let i = 0; i < tempDesc.length; i++) {
    const word = tempDesc[i]
    if (reg.test(word)) {
      leng += 2
    } else {
      leng += 1
    }
    line_str += word
    if (leng > 14) {
      textArr.push(line_str)
      leng = 0
      line_str = ''
    }
  }
  textArr.push(line_str)
  leng = 0
  line_str = ''
  const arr = textArr.slice(0, 2)
  let mt = -15
  if (arr.length === 2) {
    mt = -25
  }
  arr.forEach(element => {
    content += "<text style={{marginLeft: 67, fontSize:12, fontWeight:400, marginTop:" + mt + ", fill: " + color + "}} draggable='true'>" + element + "</text>"
  });

  return `${content}`
}

const node = {
  task_node_style6,
  chat_node_style6,
  meet_node_style6,
  tool_node_style6,
}
export default node