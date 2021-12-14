const fontMode = localStorage.getItem('font-mode')
const WIDTH = 200 //节点总宽度
const HEIGHT = 60 //节点总高度
const DARK_FONT = '#000'
const DATA_BG_COLOR ='#0A0A8F'
const DATA_GROUP_BG_COLOR ='#773000'
const DATA_FONT_COLOR = (fontMode === 'dark')?DARK_FONT:'#0A0A8F'
const DATA_GROUP_FONT_COLOR =  (fontMode === 'dark')?DARK_FONT:'#773000'
const RADIUS = 6 //圆角率
const DATA_ICON = require('../../assets/image/newUI/data.png')
const IMG_SIZE = 42
//阴影
const shadow = () => {
  return `shadowColor:'#999',shadowBlur:3,shadowOffsetX:2,shadowOffsetY:2,`
}
//数据节点-新样式
const data_node_style5 = (node) => {
  const jsx = `
    <group keyshape="true">
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT},
        fill:'#fff',
        stroke: ${DATA_BG_COLOR},
        lineWidth:1,
        radius: ${RADIUS},
        ${node.unfinish ? "fillOpacity:0.4," : ""}
        ${node.unfinish ? "lineDash:[2,2]," : ""}
      }}
      draggable="true" keyshape="true">
        <rect style={{
          width: 50,
          height: 50,
          marginTop: 5,
          marginLeft:5,
          fill:${DATA_BG_COLOR},
          radius: ${RADIUS},
        }}draggable="true">
          <image style={{
            img:${DATA_ICON},
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
            fill: ${DATA_FONT_COLOR},
            }}draggable="true">
            数据
          </text>
        </rect>
        ${breakLine(node, DATA_FONT_COLOR)}
      </rect>
    </group>`
  return jsx
}
//数据包节点-样式5
const data_group_node_style5 = (node) => {
  const jsx = `
    <group keyshape="true">
       <rect style={{
        width: ${WIDTH},
        height:${HEIGHT},
        fill:'#fff',
        stroke: ${DATA_GROUP_BG_COLOR},
        lineWidth:1,
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
          fill:${DATA_GROUP_BG_COLOR},
          radius: ${RADIUS},
        }}draggable="true">
          <image style={{
            img:${DATA_ICON},
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
            fill: ${DATA_GROUP_FONT_COLOR},
            }}draggable="true">
            数据包
          </text>
        </rect>
        ${breakLine(node, DATA_GROUP_FONT_COLOR)}
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
  data_node_style5,
  data_group_node_style5,
}
export default node