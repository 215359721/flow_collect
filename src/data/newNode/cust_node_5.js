import {defaultConfig} from '../../config/index'
const CONFIG = JSON.parse(localStorage.getItem('config')) || defaultConfig
const fontMode = CONFIG.font_mode
const WIDTH = 200 //节点总宽度
const HEIGHT = 63 //节点总高度
const DARK_FONT = '#000'
const TASK_FONT_COLOR = (fontMode === 'dark')?DARK_FONT:'#339933'//任务文字颜色
const MEET_FONT_COLOR = (fontMode === 'dark')?DARK_FONT:'#0099cc'//会议文字颜色
const CHAT_FONT_COLOR = (fontMode === 'dark')?DARK_FONT:'#006699'//即时通讯文字颜色
const TOOL_FONT_COLOR = (fontMode === 'dark')?DARK_FONT:'#cc6600'//工具文字颜色
const TAKS_BG_COLOR = '#094d16'
const MEET_BG_COLOR = '#055184'
const CHAT_BG_COLOR = '#040473'
const TOOL_BG_COLOR = '#733104'
const RADIUS = 6 //圆角率
const ICON_SIZE = 39
const TASK_BG = require('../../assets/image/newUI/st5_task_bg.png')
const MEET_BG = require('../../assets/image/newUI/st5_meet_bg.png')
const CHAT_BG = require('../../assets/image/newUI/st5_chat_bg.png')
const TOOL_BG = require('../../assets/image/newUI/st5_tool_bg.png')
const TASK_SVG = require('../../assets/svg/task.svg')
const MEET_SVG = require('../../assets/svg/meet.svg')
const CHAT_SVG = require('../../assets/svg/chat.svg')
const TOOL_SVG = require('../../assets/svg/tool.svg')
const getName = (node, field = "creatorName") => { return `${node[field] || '暂无'}` }
//阴影
const shadow = () => {
  return `shadowColor:'#999',shadowBlur:3,shadowOffsetX:2,shadowOffsetY:2,`
}
//任务节点-样式5
const task_node_style5 = (node) => {
  const jsx = `
    <group keyshape="true">
      <image style={{
        img:${TASK_BG},
        width: ${WIDTH},
        height: ${HEIGHT},
        ${shadow()}
      }}draggable="true" keyshape="true">
        <rect style={{
          width: 45,
          height: 45,
          marginTop: -56,
          marginLeft: 8,
          fill:${TAKS_BG_COLOR},
          radius: ${RADIUS},
          next: inline,
        }} draggable="true">
          <image style={{
            img:${TASK_SVG},
            width: ${ICON_SIZE},
            height: ${ICON_SIZE},
            marginTop: 3,
            marginLeft: 11,
          }}draggable="true"></image>
        </rect>
        <text style={{
          marginTop: -35,
          marginLeft: ${(getName(node, "executor").length > 2) ? -10 : -13},
          fontWeight: '550',
          fontSize:15,
          fill: ${TASK_FONT_COLOR},
          }}draggable="true">
          ${getName(node, "executor")}
        </text>
        ${breakLine(node, TASK_FONT_COLOR)}
      </image>
    </group>`
  return jsx
}
//即时通讯节点-样式5
const chat_node_style5 = (node) => {
  const jsx = `
    <group keyshape="true">
      <image style={{
        img:${CHAT_BG},
        width: ${WIDTH},
        height: ${HEIGHT},
        ${shadow()}
      }}draggable="true" keyshape="true">
        <rect style={{
          width: 45,
          height: 45,
          marginTop: -56,
          marginLeft: 8,
          fill:${CHAT_BG_COLOR},
          radius: ${RADIUS},
          next: inline,
        }} draggable="true">
          <image style={{
            img:${CHAT_SVG},
            width: ${ICON_SIZE},
            height: ${ICON_SIZE},
            marginTop: 3,
            marginLeft: 11,
          }}draggable="true"></image>
        </rect>
        <text style={{
          marginTop: -35,
          marginLeft: ${(getName(node).length > 2) ? -10 : -13},
          fontWeight: '550',
          fontSize:15,
          fill: ${CHAT_FONT_COLOR},
          }}draggable="true">
          ${getName(node)}
        </text>
        ${breakLine(node, CHAT_FONT_COLOR)}
      </image>
    </group>`
  return jsx
}
//会议节点-样式5
const meet_node_style5 = (node) => {
  const jsx = `
    <group keyshape="true">
      <image style={{
        img:${MEET_BG},
        width: ${WIDTH},
        height: ${HEIGHT},
        ${shadow()}
      }}draggable="true" keyshape="true">
        <rect style={{
          width: 45,
          height: 45,
          marginTop: -56,
          marginLeft: 8,
          fill:${MEET_BG_COLOR},
          radius: ${RADIUS},
          next: inline,
        }} draggable="true">
          <image style={{
            img:${MEET_SVG},
            width: ${ICON_SIZE},
            height: ${ICON_SIZE},
            marginTop: 3,
            marginLeft: 11,
          }}draggable="true"></image>
        </rect>
        <text style={{
          marginTop: -35,
          marginLeft: ${(getName(node).length > 2) ? -10 : -13},
          fontWeight: '550',
          fontSize:15,
          fill: ${MEET_FONT_COLOR},
          }}draggable="true">
          ${getName(node)}
        </text>
        ${breakLine(node, MEET_FONT_COLOR)}
      </image>
    </group>`
  return jsx
}
//工具节点-样式5
const tool_node_style5 = (node) => {
  const jsx = `
    <group keyshape="true">
      <image style={{
        img:${TOOL_BG},
        width: ${WIDTH},
        height: ${HEIGHT},
        ${shadow()}
      }}draggable="true" keyshape="true">
        <rect style={{
          width: 45,
          height: 45,
          marginTop: -56,
          marginLeft: 8,
          fill:${TOOL_BG_COLOR},
          radius: ${RADIUS},
          next: inline,
        }} draggable="true">
          <image style={{
            img:${node.detailInfo.appIcon || TOOL_SVG},
            width: ${ICON_SIZE},
            height: ${ICON_SIZE},
            marginTop: 3,
            marginLeft: 11,
          }}draggable="true"></image>
        </rect>
        <text style={{
          marginTop: -35,
          marginLeft: ${(getName(node).length > 2) ? -10 : -13},
          fontWeight: '550',
          fontSize:15,
          fill: ${TOOL_FONT_COLOR},
          }}draggable="true">
          ${getName(node)}
        </text>
        ${breakLine(node, TOOL_FONT_COLOR)}
      </image>
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
  let mt = -45
  if (arr.length === 2) {
    mt = -53
  }
  arr.forEach(element => {
    content += "<text style={{fontSize:12, fontWeight:400, marginLeft:25, marginTop: " + mt + ", fill: " + color + "}} draggable='true'>" + element + "</text>"
  });

  return `${content}`
}

const node = {
  task_node_style5,
  chat_node_style5,
  meet_node_style5,
  tool_node_style5,
}
export default node