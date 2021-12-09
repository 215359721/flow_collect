const WIDTH = 200 //节点总宽度
const HEIGHT = 60 //节点总高度
const TASK_COLOR = '#58b431'//任务主色
const TASK_FONT_COLOR = '#339933'//任务文字颜色
const MEET_COLOR = '#04d4dc'//会议主色
const MEET_FONT_COLOR = '#0099cc'//会议文字颜色
const CHAT_COLOR = '#3e8acb'//即时通讯主色
const CHAT_FONT_COLOR = '#006699'//即时通讯文字颜色
const TOOL_COLOR = '#f6a200'//工具主色
const TOOL_FONT_COLOR = '#cc6600'//工具文字颜色
const RADIUS = 6 //圆角率
const defaultHead = require('../../assets/image/newUI/defaultHead.png')
const getName = (node) => { return `${node.creatorName || '暂无'}` }
//阴影
const shadow = () => {
  return `shadowColor:'#999',shadowBlur:5,shadowOffsetX:3,shadowOffsetY:3,`
}
//任务节点-样式3
const task_node_style3 = (node) => {
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
      draggable="true"
      keyshape="true"
      >
        <rect style={{
          width: 48,
          height:${HEIGHT - 10},
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
          next: inline,
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 35,
            height: 35,
            marginTop: 0,
            marginLeft: 10,
          }}draggable="true"></image>
          <text style={{
            marginTop: 17,
            marginLeft: ${(getName(node).length > 2) ? -43 : -36},
            fontWeight: '500',
            fontSize:14,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        <rect style={{
          width: 142,
          height:${HEIGHT - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
        }}>
          ${breakLine(node, 11, TASK_FONT_COLOR)}
        </rect>
      </rect>
    </group>`
  return jsx
}
//即时通讯节点-样式3
const chat_node_style3 = (node) => {
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
      draggable="true"
      keyshape="true"
      >
        <rect style={{
          width: 48,
          height:${HEIGHT - 10},
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
          next: inline,
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 35,
            height: 35,
            marginTop: 0,
            marginLeft: 10,
          }}draggable="true"></image>
          <text style={{
            marginTop: 17,
            marginLeft: ${(getName(node).length > 2) ? -43 : -36},
            fontWeight: '500',
            fontSize:14,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        <rect style={{
          width: 142,
          height:${HEIGHT - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
        }}>
          ${breakLine(node, 11, CHAT_FONT_COLOR)}
        </rect>
      </rect>
    </group>`
  return jsx
}
//会议节点-样式3
const meet_node_style3 = (node) => {
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
      draggable="true"
      keyshape="true"
      >
        <rect style={{
          width: 48,
          height:${HEIGHT - 10},
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
          next: inline,
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 35,
            height: 35,
            marginTop: 0,
            marginLeft: 10,
          }}draggable="true"></image>
          <text style={{
            marginTop: 17,
            marginLeft: ${(getName(node).length > 2) ? -43 : -36},
            fontWeight: '500',
            fontSize:14,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        <rect style={{
          width: 142,
          height:${HEIGHT - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
        }}>
          ${breakLine(node, 11, MEET_FONT_COLOR)}
        </rect>
      </rect>
    </group>`
  return jsx
}
//工具节点-样式3
const tool_node_style3 = (node) => {
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
      draggable="true"
      keyshape="true"
      >
        <rect style={{
          width: 48,
          height:${HEIGHT - 10},
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
          next: inline,
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 35,
            height: 35,
            marginTop: 0,
            marginLeft: 10,
          }}draggable="true"></image>
          <text style={{
            marginTop: 17,
            marginLeft: ${(getName(node).length > 2) ? -43 : -36},
            fontWeight: '500',
            fontSize:14,
            fill: '#fff',
            }}draggable="true">
            ${getName(node)}
          </text>
        </rect>
        <rect style={{
          width: 142,
          height:${HEIGHT - 10},
          fill: '#fff',
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
        }}>
          ${breakLine(node, 11, TOOL_FONT_COLOR)}
        </rect>
      </rect>
    </group>`
  return jsx
}
const breakLine = (node, ml = 0, color = '#ff0000') => {
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
  let mt = 15
  if (arr.length === 2) {
    mt = 9
  }
  arr.forEach(element => {
    content += "<text style={{fontSize:13, fontWeight:400, marginLeft: " + ml + ", marginTop: " + mt + ", fill: " + color + "}} draggable='true'>" + element + "</text>"
  });

  return `${content}`
}

const node = {
  task_node_style3,
  chat_node_style3,
  meet_node_style3,
  tool_node_style3,
}
export default node