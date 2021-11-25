/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const TASK_LIGHT_COL = '#75da3a'
const TASK_MAIN_COL = '#4ac149'
const TASK_BG_COL = '#f2fce8'
const MEET_LIGHT_COL = '#06e4e7'
const MEET_MAIN_COL = '#00b6c9'
const MEET_BG_COL = '#e8fafc'
const CHAT_LIGHT_COL = '#3291fb'
const CHAT_MAIN_COL = '#3075ed'
const CHAT_BG_COL = '#e3effc'
const TOOL_LIGHT_COL = '#ffb100'
const TOOL_MAIN_COL = '#ff9d00'
const TOOL_BG_COL = '#f9f7e8'
const WIDTH = 280
const HEIGHT = 335
const HEAD_HEIGHT = 25
const CONTENT_HEIGHT = 310 //详细模式内容高度
const CONTENT_HEIGHT_GEN = 100 //概要模式内容高度
const WIDTH_SIM = 150 //精简模式内容宽度
const CONTENT_HEIGHT_SIM = 50 //精简模式内容高度
const RADIUS = 15
let lightCol = '', mainCol = '', bgCol = '', nodeName = ''
const defaulIcon = require('../../assets/image/newUI/defaultIcon.png')
const getName = (node) => {
  return `${node.creatorName || 'XXX'}`
}
const getCurColor = (node) => {
  switch (node.icon) {
    case 'task':
      lightCol = TASK_LIGHT_COL
      mainCol = TASK_MAIN_COL
      bgCol = TASK_BG_COL
      nodeName = '任务'
      break;
    case 'MeetingInfo':
      lightCol = MEET_LIGHT_COL
      mainCol = MEET_MAIN_COL
      bgCol = MEET_BG_COL
      nodeName = '会议'
      break;
    case 'chat':
    case 'Im':
    case 'im':
      lightCol = CHAT_LIGHT_COL
      mainCol = CHAT_MAIN_COL
      bgCol = CHAT_BG_COL
      nodeName = '即时通讯'
      break;
    default:
      lightCol = TOOL_LIGHT_COL
      mainCol = TOOL_MAIN_COL
      bgCol = TOOL_BG_COL
      nodeName = '工具'
      break;
  }
}
//标题
const head = (node) => {
  getCurColor(node)
  return `
    <rect style={{
        width: ${WIDTH},
        height:${HEAD_HEIGHT},
        fill: 'l(90) 0:${lightCol} 1:${mainCol}',
        stroke: ${mainCol},
        radius: [${RADIUS}, ${RADIUS}, 0, 0],
      }}
      draggable="true"
      >
        <text style={{
          marginTop: ${(HEAD_HEIGHT / 2) + 3}, marginLeft: ${(WIDTH / 2) - 20},
          textAlign: 'center',
          fontWeight: 'bold',
          fill: '#fff'}}draggable="true">
          ${nodeName}
        </text>
      </rect>
    `
}
//描述行
const common_line = (node, space, title, desc, desc_type = 'normal',) => {
  return `<rect style={{
            width: ${WIDTH},
            height:${space},
            marginTop:10,
          }}draggable="true">
            <text style={{marginLeft: 10,fill: '#777',next: inline}}draggable="true">${title}：</text>
            <text style={{marginLeft: 10,${(desc_type === 'bold') ? 'fontWeight:bold,' : ''},fill:#333}}draggable="true">${desc}</text>
          </rect>`
}
//状态(任务)
const status_line = (node) => {
  return `
  <rect style={{
    width: ${WIDTH},
    height:40,
    marginTop: 10,
  }}draggable="true">
    ${each_box(require('../../assets/image/newUI/defaultUser5.png'), 10, '张玲云', '负责人')}
    ${each_box(require('../../assets/image/newUI/defaultUser5.png'), 20, '未开始', '当前状态')}
    ${each_box(require('../../assets/image/newUI/defaultUser5.png'), 30, '普通', '优先级')}
  </rect>`
}
const each_box = (img, left, title, desc) => `
  <image style={{
    img:${img},
    width: 30,
    height: 30,
    marginTop: 5,
    marginLeft: ${left},
    next: inline}}draggable="true"></image>
  <rect style={{
    width: 50,
    height: 40,
    marginLeft:  ${left + 5},
    next: inline
  }}draggable="true">
    <text style={{marginLeft: ${left + 5} ,fill: '#333',marginTop: 5,}}draggable="true">${title}</text>
    <text style={{marginLeft: ${left + 5} ,fill: '#777',marginTop: 3,fontSize:10,}}draggable="true">${desc}</text>
  </rect>
`
//分割线
const spe_line = (top) => {
  return `<path style={{
            fill: ${mainCol},
            stroke: ${mainCol},
            path:'M 10,${top} h${WIDTH - 20}',
            lineWidth:1,
            lineDash:[2,2]}}
          }}></path>`
}
//附件
const file_line = (node, title, tempFile) => {
  let content = ''
  tempFile.forEach(filename => {
    content += "<text style={{height:20,marginLeft: 10,marginTop:4,fill: '#2a5fff',}}>" + filename + "</text>"
  })
  return `
  <rect style={{
    width: ${WIDTH},
    height:60,
    marginTop:20,
  }}draggable="true">
    <text style={{marginLeft: 10,fill: '#333',fontWeight:bold,}}>${title}：</text>
    ${content}
    </rect >
  `
}
//文字说明（单行）
const text_line = (node, title, tempDesc) => {
  return `
  <rect style={{
    width: ${WIDTH},
    height:40,
    marginTop:20,
  }}draggable="true">
    <text style={{marginLeft: 10,fill: '#333',fontWeight:bold,}}>${title}：</text>
    <text style={{marginLeft: 10,marginTop:3,fill: '#777',}}>${tempDesc}</text>
  </rect >`
}
//文字说明（换行）
const textArea_line = (node, title, tempDesc) => {
  let textArr = [], start = 0, inc = 22, cont = true
  let content = ''
  while (cont) {
    const str = tempDesc.substr(start, inc)
    start += inc
    textArr.push(str)
    if (start > tempDesc.length) {
      cont = false
    }
  }
  textArr.forEach(element => {
    content += "<text style={{height:20,marginLeft: 10,marginTop:4,fill: '#777',}}>" + element + "</text>"
  });

  return `
  <rect style={{
    width: ${WIDTH},
    height:40,
    marginTop:20,
  }}draggable="true">
    <text style={{marginLeft: 10,fill: '#333',fontWeight:bold,}}>${title}：</text>
    ${content}
  </rect >`
}

//任务-详情
const task_detail = (node) => {
  return `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${CONTENT_HEIGHT},
      fill: ${bgCol},
      stroke: ${mainCol},
      radius: [0, 0, ${RADIUS}, ${RADIUS},],
      lineWidth:1,
      }}
      draggable="true">
        ${common_line(node, 20, '任务名称', '章节编写任务', 'bold')}
        ${common_line(node, 20, '创 建 人 ', '赵竹林')}
        ${common_line(node, 20, '截止时间', '2021-10-31 17:00:00')}
        ${common_line(node, 20, '创建时间', '2021-10-01 09:00:00')}
        ${status_line(node)}
        ${spe_line(160)}
        ${file_line(node, '输入物', ['会议申请单.doc', '参会人员名单.doc'])}
        ${file_line(node, '产出物', ['会议纪要1.doc'])}
        ${text_line(node, '描述', '这里显示文字任务描述信息...')}
      </rect>
    </group>`
}

//任务-概要
const task_general = (node) => {
  return `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${CONTENT_HEIGHT_GEN},
      fill: ${bgCol},
      stroke: ${mainCol},
      radius: [0, 0, ${RADIUS}, ${RADIUS},],
      lineWidth:1,
      }}
      draggable="true">
        ${common_line(node, 20, '任务名称', '章节编写任务', 'bold')}
        ${common_line(node, 20, '创 建 人 ', '赵竹林')}
        ${common_line(node, 20, '截止时间', '2021-10-31 17:00:00')}
        ${common_line(node, 20, '创建时间', '2021-10-01 09:00:00')}
      </rect>
    </group>`
}
//任务-精简
const task_simple = (node) => {
  getCurColor(node)
  return `
    <group>
      <rect style={{
        width: ${WIDTH_SIM},
        height:${CONTENT_HEIGHT_SIM},
        fill: 'l(90) 0:${lightCol} 1:${mainCol}',
        radius: ${RADIUS},
        lineWidth:1,
        }}draggable="true">
        <rect style={{
          width:50,
          height:60,
          next: inline,
          radius: ${RADIUS},
        }}draggable="true">
          <image style={{
            img:${node.detailInfo.appIcon || defaulIcon},
            width:40,
            height:40,
            marginLeft:10,
            marginTop:5,
          }}></image>
        </rect>
        <rect style={{
          width:90,
          height:60,
          next: inline,
          radius: ${RADIUS},
        }}draggable="true">
          <text style={{marginLeft: 5,fill: '#fff',marginTop: 5,fontWeight:bold,}}draggable="true">${getName(node)}</text>
          <text style={{marginLeft: 5,fill: '#fff',marginTop: 10,}}draggable="true">${node.label}</text>=
        </rect>
      </rect>
    </group>`
}

//会议-详情
const meet_detail = (node) => {
  return `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${CONTENT_HEIGHT},
      fill: ${bgCol},
      stroke: ${mainCol},
      radius: [0, 0, ${RADIUS}, ${RADIUS},],
      lineWidth:1,
      }}
      draggable="true">
        ${common_line(node, 30, '会议主题', '需求讨论会议', 'bold')}
        ${common_line(node, 30, '密   级 ', '一般')}
        ${common_line(node, 30, '参 会 人', '王丽桥、刘子扬、赵竹林')}
        ${common_line(node, 30, '参会时间', '2021-10-21 09:00:00')}
        ${spe_line(155)}
        ${file_line(node, '会议文件', ['会议申请单.doc', '参会人员名单.doc'])}
        ${file_line(node, '会议纪要', ['会议纪要1.doc'])}
        ${text_line(node, '会议结论', '会议结论文字任务描述信息...')}
      </rect>
    </group>`
}
//会议-概要
const meet_general = (node) => {
  return `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${CONTENT_HEIGHT_GEN},
      fill: ${bgCol},
      stroke: ${mainCol},
      radius: [0, 0, ${RADIUS}, ${RADIUS},],
      lineWidth:1,
      }}
      draggable="true">
        ${common_line(node, 20, '会议主题', '需求讨论会议', 'bold')}
        ${common_line(node, 20, '密   级 ', '一般')}
        ${common_line(node, 20, '参 会 人', '王丽桥、刘子扬、赵竹林')}
        ${common_line(node, 20, '参会时间', '2021-10-21 09:00:00')}
      </rect>
    </group>`
}
//会议-精简
const meet_simple = (node) => {
  getCurColor(node)
  return `
    <group>
      <rect style={{
        width: ${WIDTH_SIM},
        height:${CONTENT_HEIGHT_SIM},
        fill: 'l(90) 0:${lightCol} 1:${mainCol}',
        radius: ${RADIUS},
        lineWidth:1,
        }}draggable="true">
        <rect style={{
          width:50,
          height:60,
          next: inline,
          radius: ${RADIUS},
        }}draggable="true">
          <image style={{
            img:${node.detailInfo.appIcon || defaulIcon},
            width:40,
            height:40,
            marginLeft:10,
            marginTop:5,
          }}></image>
        </rect>
        <rect style={{
          width:90,
          height:60,
          next: inline,
          radius: ${RADIUS},
        }}draggable="true">
          <text style={{marginLeft: 5,fill: '#fff',marginTop: 5,fontWeight:bold,}}draggable="true">${getName(node)}</text>
          <text style={{marginLeft: 5,fill: '#fff',marginTop: 10,}}draggable="true">${node.label}</text>=
        </rect>
      </rect>
    </group>`
}

//即时通讯-详情
const chat_detail = (node) => {
  return `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${CONTENT_HEIGHT},
      fill: ${bgCol},
      stroke: ${mainCol},
      radius: [0, 0, ${RADIUS}, ${RADIUS},],
      lineWidth:1,
      }}
      draggable="true">
        ${common_line(node, 30, '参 与 人', '王丽桥、刘子扬、赵竹林')}
        ${common_line(node, 30, '开始时间', '2021-10-21 09:00:00')}
        ${common_line(node, 30, '结束时间', '2021-10-21 10:30:00')}
      </rect >
    </group >
    `
}

//即时通讯-概要
const chat_general = (node) => {
  return `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${CONTENT_HEIGHT_GEN},
      fill: ${bgCol},
      stroke: ${mainCol},
      radius: [0, 0, ${RADIUS}, ${RADIUS},],
      lineWidth:1,
      }}
      draggable="true">
        ${common_line(node, 20, '会议主题', '需求讨论会议', 'bold')}
        ${common_line(node, 20, '密   级 ', '一般')}
        ${common_line(node, 20, '参 会 人', '王丽桥、刘子扬、赵竹林')}
        ${common_line(node, 20, '参会时间', '2021-10-21 09:00:00')}
      </rect>
    </group>`
}
//即时通讯-精简
const chat_simple = (node) => {
  getCurColor(node)
  return `
    <group>
      <rect style={{
        width: ${WIDTH_SIM},
        height:${CONTENT_HEIGHT_SIM},
        fill: 'l(90) 0:${lightCol} 1:${mainCol}',
        radius: ${RADIUS},
        lineWidth:1,
        }}draggable="true">
        <rect style={{
          width:50,
          height:60,
          next: inline,
          radius: ${RADIUS},
        }}draggable="true">
          <image style={{
            img:${node.detailInfo.appIcon || defaulIcon},
            width:40,
            height:40,
            marginLeft:10,
            marginTop:5,
          }}></image>
        </rect>
        <rect style={{
          width:90,
          height:60,
          next: inline,
          radius: ${RADIUS},
        }}draggable="true">
          <text style={{marginLeft: 5,fill: '#fff',marginTop: 5,fontWeight:bold,}}draggable="true">${getName(node)}</text>
          <text style={{marginLeft: 5,fill: '#fff',marginTop: 10,}}draggable="true">${node.label}</text>=
        </rect>
      </rect>
    </group>`
}

//工具-详情
const tool_detail = (node) => {
  return `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${CONTENT_HEIGHT},
      fill: ${bgCol},
      stroke: ${mainCol},
      radius: [0, 0, ${RADIUS}, ${RADIUS},],
      lineWidth:1,
      }}
      draggable="true">
        ${common_line(node, 30, '工具名称', 'word | excel', 'bold')}
        ${common_line(node, 30, '创 建 人', '王丽桥')}
        ${common_line(node, 30, '创建时间', '2021-10-21 10:30:00')}
        ${spe_line(125)}
        ${textArea_line(node, '工具介绍', 'Word2003是目前使用比较广泛的一种文字处理软件，它集文字的编辑、排版、表格处理、图形处理为一体，在Word中我们可以制作一份简单的通知。在则业的时候我们可以撰写自己的简历、可以加入自己的照片，并且我们可以书写论文、计划，同时我们还可以在我们编写的文档中加入声音、图象这样可以构成一个图文并茂的文件。为你提供word2003下载')}
      </rect>
    </group>`
}

//工具-概要
const tool_general = (node) => {
  return `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${CONTENT_HEIGHT_GEN},
      fill: ${bgCol},
      stroke: ${mainCol},
      radius: [0, 0, ${RADIUS}, ${RADIUS},],
      lineWidth:1,
      }}
      draggable="true">
        ${common_line(node, 30, '工具名称', 'word | excel', 'bold')}
        ${common_line(node, 30, '创 建 人', '王丽桥')}
        ${common_line(node, 30, '创建时间', '2021-10-21 10:30:00')}
      </rect>
    </group>`
}
//工具-精简
const tool_simple = (node) => {
  getCurColor(node)
  return `
    <group>
      <rect style={{
        width: ${WIDTH_SIM},
        height:${CONTENT_HEIGHT_SIM},
        fill: 'l(90) 0:${lightCol} 1:${mainCol}',
        radius: ${RADIUS},
        lineWidth:1,
        }}draggable="true">
        <rect style={{
          width:50,
          height:60,
          next: inline,
          radius: ${RADIUS},
        }}draggable="true">
          <image style={{
            img:${node.detailInfo.appIcon || defaulIcon},
            width:40,
            height:40,
            marginLeft:10,
            marginTop:5,
          }}></image>
        </rect>
        <rect style={{
          width:90,
          height:60,
          next: inline,
          radius: ${RADIUS},
        }}draggable="true">
          <text style={{marginLeft: 5,fill: '#fff',marginTop: 5,fontWeight:bold,}}draggable="true">${getName(node)}</text>
          <text style={{marginLeft: 5,fill: '#fff',marginTop: 10,}}draggable="true">${node.label}</text>=
        </rect>
      </rect>
    </group>`
}

const custNode = { task_detail, meet_detail, chat_detail, tool_detail, task_general, meet_general, chat_general, tool_general, task_simple, meet_simple, chat_simple, tool_simple }
export default custNode