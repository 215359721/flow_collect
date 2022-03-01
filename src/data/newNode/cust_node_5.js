import { defaultConfig } from '../../config/index'
const CONFIG = JSON.parse(localStorage.getItem('config')) || defaultConfig
const fontMode = CONFIG.font_mode
const WIDTH = 200 //节点总宽度
const HEIGHT = 63 //节点总高度
const LG_WIDTH = 203 //节点总宽度(突出)
const LG_HEIGHT = 194 //节点总高度(突出)
const LG_OFFSET = 128
const DARK_FONT = '#000'
const TASK_FONT_COLOR = (fontMode === 'dark') ? DARK_FONT : '#339933'//任务文字颜色
const MEET_FONT_COLOR = (fontMode === 'dark') ? DARK_FONT : '#0099cc'//会议文字颜色
const CHAT_FONT_COLOR = (fontMode === 'dark') ? DARK_FONT : '#006699'//即时通讯文字颜色
const TOOL_FONT_COLOR = (fontMode === 'dark') ? DARK_FONT : '#cc6600'//工具文字颜色
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
const TASK_LG_BG = require('../../assets/image/newUI/st5_task_lg_bg.png')
const MEET_LG_BG = require('../../assets/image/newUI/st5_meet_lg_bg.png')
const CHAT_LG_BG = require('../../assets/image/newUI/st5_chat_lg_bg.png')
const TOOL_LG_BG = require('../../assets/image/newUI/st5_tool_lg_bg.png')
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

//任务节点-样式5（突出显示）
const task_lg_node_style5 = (node) => {
  const jsx = `
    <group keyshape="true">
      <image style={{
        img:${TASK_LG_BG},
        width: ${LG_WIDTH},
        height: ${LG_HEIGHT},
        ${shadow()}
      }}draggable="true" keyshape="true">
        <rect style={{
          width: 45,
          height: 45,
          marginTop: ${-56 - LG_OFFSET},
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
          marginTop: ${-38 - LG_OFFSET},
          marginLeft: ${(getName(node, "executor").length > 2) ? -10 : -13},
          fontWeight: '550',
          fontSize:15,
          fill: ${TASK_FONT_COLOR},
          }}draggable="true">
          ${getName(node, "executor")}
        </text>
        ${breakLine(node, TASK_FONT_COLOR, 'large')}
        ${iterationInfo(node)}
      </image>
    </group>`
  return jsx
}

//即时通讯节点-样式5（突出显示）
const chat_lg_node_style5 = (node) => {
  const jsx = `
    <group keyshape="true">
      <image style={{
        img:${CHAT_LG_BG},
        width: ${LG_WIDTH},
        height: ${LG_HEIGHT},
        ${shadow()}
      }}draggable="true" keyshape="true">
        <rect style={{
          width: 45,
          height: 45,
          marginTop: ${-56 - LG_OFFSET},
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
          marginTop: ${-38 - LG_OFFSET},
          marginLeft: ${(getName(node, "executor").length > 2) ? -10 : -13},
          fontWeight: '550',
          fontSize:15,
          fill: ${CHAT_FONT_COLOR},
          }}draggable="true">
          ${getName(node, "executor")}
        </text>
        ${breakLine(node, CHAT_FONT_COLOR, 'large')}
        ${iterationInfo(node)}
      </image>
    </group>`
  return jsx
}

//会议节点-样式5（突出显示）
const meet_lg_node_style5 = (node) => {
  const jsx = `
    <group keyshape="true">
      <image style={{
        img:${MEET_LG_BG},
        width: ${LG_WIDTH},
        height: ${LG_HEIGHT},
        ${shadow()}
      }}draggable="true" keyshape="true">
        <rect style={{
          width: 45,
          height: 45,
          marginTop: ${-56 - LG_OFFSET},
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
          marginTop: ${-38 - LG_OFFSET},
          marginLeft: ${(getName(node, "executor").length > 2) ? -10 : -13},
          fontWeight: '550',
          fontSize:15,
          fill: ${MEET_FONT_COLOR},
          }}draggable="true">
          ${getName(node, "executor")}
        </text>
        ${breakLine(node, MEET_FONT_COLOR, 'large')}
        ${iterationInfo(node)}
      </image>
    </group>`
  return jsx
}

//工具节点-样式5（突出显示）
const tool_lg_node_style5 = (node) => {
  const jsx = `
    <group keyshape="true">
      <image style={{
        img:${TOOL_LG_BG},
        width: ${LG_WIDTH},
        height: ${LG_HEIGHT},
        ${shadow()}
      }}draggable="true" keyshape="true">
        <rect style={{
          width: 45,
          height: 45,
          marginTop: ${-56 - LG_OFFSET},
          marginLeft: 8,
          fill:${TOOL_BG_COLOR},
          radius: ${RADIUS},
          next: inline,
        }} draggable="true">
          <image style={{
            img:${TOOL_SVG},
            width: ${ICON_SIZE},
            height: ${ICON_SIZE},
            marginTop: 3,
            marginLeft: 11,
          }}draggable="true"></image>
        </rect>
        <text style={{
          marginTop: ${-38 - LG_OFFSET},
          marginLeft: ${(getName(node, "executor").length > 2) ? -10 : -13},
          fontWeight: '550',
          fontSize:15,
          fill: ${TOOL_FONT_COLOR},
          }}draggable="true">
          ${getName(node, "executor")}
        </text>
        ${breakLine(node, TOOL_FONT_COLOR, 'large')}
        ${iterationInfo(node)}
      </image>
    </group>`
  return jsx
}

const getTitleArrs = (titleStr) => {
  // eslint-disable-next-line no-control-regex
  var reg = /[^\x00-\xff]/g
  let textArr = [], line_str = '', leng = 0
  for (let i = 0; i < titleStr.length; i++) {
    const word = titleStr[i]
    if (reg.test(word)) { leng += 2 } else { leng += 1 }
    line_str += word
    if (leng > 14) {
      textArr.push(line_str)
      leng = 0
      line_str = ''
    }
  }
  textArr.push(line_str)
  return (textArr.slice(0, 2))
}

const breakLine = (node, color = '#fff', size = 'normal') => {
  let content = ''
  const arr = getTitleArrs(node.label || '暂无标题')
  let mt = -45
  if (arr.length === 2) { mt = -53 }
  if (size === 'large') { mt = (mt - LG_OFFSET) }
  arr.forEach(element => {
    content += "<text style={{fontSize:12, fontWeight:400, marginLeft:25, marginTop: " + mt + ", fill: " + color + "}} draggable='true'>" + element + "</text>"
  });
  return `${content}`
}

const iterationInfo = (node) => {
  let content = '', mt = -20
  const titleArrs = getTitleArrs(node.label || '暂无标题')
  if (titleArrs.length > 1) { mt = -35 }
  const arr = node.keyInfo
  arr.forEach(element => {
    content += "<text style={{marginTop: " + (mt - LG_OFFSET) + ", marginLeft: -35, fontWeight: 400, fontSize: 13, fill: " + TASK_FONT_COLOR + "}} draggable = 'true' >" + element + "</text >"
    mt += 12
  });
  return content
}

const node = {
  task_node_style5,
  chat_node_style5,
  meet_node_style5,
  tool_node_style5,
  task_lg_node_style5,
  chat_lg_node_style5,
  meet_lg_node_style5,
  tool_lg_node_style5
}
export default node