const WIDTH = 200 //节点总宽度
const HEIGHT = 60 //节点总高度
const TASK_COLOR = '#58b431'//任务主色
const MEET_COLOR = '#04d4dc'//会议主色
const CHAT_COLOR = '#3e8acb'//即时通讯主色
const TOOL_COLOR = '#f6a200'//工具主色
const RADIUS = 6 //圆角率
const defaultHead = require('../../assets/image/newUI/defaultHead.png')
const getName = (node) => { return `${node.creatorName || '暂无'}` }
//阴影
const shadow = () => {
  return `shadowColor:'#999',shadowBlur:3,shadowOffsetX:2,shadowOffsetY:2,`
}
//任务节点-样式4
const task_node_style4 = (node) => {
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
      draggable="true">
        <rect style={{
          width: 48,
          height:${HEIGHT - 10},
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 50,
            height: 50,
            marginTop: 0,
            marginLeft: 10,
            next: inline,
          }}draggable="true"></image>
          <text style={{
            marginTop: 16,
            marginLeft: -33,
            fontWeight: '900',
            fontSize:14,
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
//即时通讯节点-样式4
const chat_node_style4 = (node) => {
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
      
      >
        <rect style={{
          width: 48,
          height:${HEIGHT - 10},
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 50,
            height: 50,
            marginTop: 0,
            marginLeft: 10,
            next: inline,
          }}draggable="true"></image>
          <text style={{
            marginTop: 16,
            marginLeft: -33,
            fontWeight: '900',
            fontSize:14,
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
//会议节点-样式4
const meet_node_style4 = (node) => {
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
      
      >
        <rect style={{
          width: 48,
          height:${HEIGHT - 10},
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 50,
            height: 50,
            marginTop: 0,
            marginLeft: 10,
            next: inline,
          }}draggable="true"></image>
          <text style={{
            marginTop: 16,
            marginLeft: -33,
            fontWeight: '900',
            fontSize:14,
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
//工具节点-样式4
const tool_node_style4 = (node) => {
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
      
      >
        <rect style={{
          width: 48,
          height:${HEIGHT - 10},
          marginTop: 5,
          marginLeft:5,
          radius: ${RADIUS},
        }}>
          <image style={{
            img:${node.creatorPhotoUrl || defaultHead},
            width: 50,
            height: 50,
            marginTop: 0,
            marginLeft: 10,
            next: inline,
          }}draggable="true"></image>
          <text style={{
            marginTop: 16,
            marginLeft: -33,
            fontWeight: '900',
            fontSize:14,
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
    if (leng > 12) {
      textArr.push(line_str)
      leng = 0
      line_str = ''
    }
  }
  textArr.push(line_str)
  leng = 0
  line_str = ''
  const arr = textArr.slice(0, 2)
  let mt = -18
  if (arr.length === 2) {
    mt = -27
  }
  arr.forEach(element => {
    content += "<text style={{marginLeft: 67, fontSize:13, fontWeight:300, marginTop:" + mt + ", fill: " + color + "}} draggable='true'>" + element + "</text>"
  });

  return `${content}`
}

const node = {
  task_node_style4,
  chat_node_style4,
  meet_node_style4,
  tool_node_style4,
}
export default node