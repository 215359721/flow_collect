/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const MAIN_COLOR = '#1890ff'
const WIDTH = 250
const HEIGHT_HEAD = 25
const HEIGHT_CONTENT = 190
const MARGIN_LEFT = 5 //模块横向间距
const MARGIN_TOP = 5 //模块纵向间距
const HEIGHT_SIMPLE = 40 //简要高度
const HEIGHT_INFO = 60 //详情高度
const HEIGHT_IN = 60 //输入物高度
const HEIGHT_DESC = 60 //描述高度
//标题
const head = (node) => `
 <rect style={{
    width: ${WIDTH},
    height:${HEIGHT_HEAD},
    fill: ${MAIN_COLOR},
    stroke: ${MAIN_COLOR},
    radius: [6, 6, 0, 0],
  }}
  draggable="true"
  >
    <text style={{
      marginTop: ${(HEIGHT_HEAD / 2) + 3}, marginLeft: ${(WIDTH / 2) - 10},
      textAlign: 'center',
      fontWeight: 'bold',
      fill: '#fff'}}draggable="true">
      即时通讯（一对一|群组）
    </text>
  </rect>
`
//简要
const simple_part = (node) => `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_SIMPLE},
    marginLeft: ${MARGIN_LEFT},
    marginTop: ${MARGIN_TOP},
  }}
  draggable="true"
 >
  <image style={{
    img:${node.img},
    width: 30,
    height: 30,
    marginTop: 5,
    marginLeft: ${MARGIN_LEFT * 4},
    next: inline
  }}draggable="true"></image>
  </rect>
`
//详情
const info_part = (node) => `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_INFO},
    marginLeft: ${MARGIN_LEFT},
    marginTop: ${MARGIN_TOP},
  }}
  draggable="true"
 >
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',fontWeight:bold,}}>参入人：赵竹林、张云玲、刘子扬</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 5,fill: '#888',fontSize:10,}}>开始时间：2021-10-31 17:00</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 7,fill: '#888',fontSize:10,}}>结束时间：2021-10-01 9:00</text>
  </rect>
`
//输入信息
const in_part = (node) => {
  const list = node.obj.inList
  let content = ''
  list.forEach(element => {
    content += "<text style={{marginLeft: " + (MARGIN_LEFT * 2) + " ,marginTop:3,fill: '#2900FF',fontSize:10,}}>" + element + "</text>"
  })
  return `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_IN},
    marginLeft: ${MARGIN_LEFT},
    marginTop: ${MARGIN_TOP},
  }}draggable="true">
    <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',fontWeight:bold,}}>输入信息</text>
    ${content}
    </rect >
  `
}

//会话记录
const record_part = (node) => `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_DESC},
    marginLeft: ${MARGIN_LEFT},
    marginTop: ${MARGIN_TOP},
  }}draggable="true">
    <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',fontWeight:bold,}}>会话记录</text>
      <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 3,fill: '#888',fontSize:10,}}>赵竹林 2021-09-30:大家好！</text>
      <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 5,fill: '#888',fontSize:10,}}>赵竹林 2021-09-30:大家好！</text>
  </rect >
  `

const chat_jsx4All = (node) => {
  let innerJSX = info_part(node) + in_part(node) + record_part(node)
  const jsx = `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${HEIGHT_CONTENT},
      fill: '#f7f7f7',
      stroke: ${MAIN_COLOR},
      lineWidth:1,
      }}
      draggable="true">
        ${innerJSX}
      </rect >
    </group >
    `
  return jsx
}
const chat_jsx4Normal = (node) => {
  let innerJSX = info_part(node)
  let currentHei = 70
  const jsx = `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${currentHei},
      fill: '#F7F7F7',
      stroke: ${MAIN_COLOR},
      lineWidth:1,
      }}draggable="true">
        ${innerJSX}
      </rect >
    </group >
    `
  return jsx
}
const chat_jsx4Simple = (node) => {
  let innerJSX = simple_part(node)
  let currentHei = 50
  const jsx = `
    <group>
      ${head(node)}
      <rect style={{
      width: ${WIDTH},
      height:${currentHei},
      fill: '#F7F7F7',
      stroke: ${MAIN_COLOR},
      lineWidth:1,
      }}draggable="true">
        ${innerJSX}
      </rect >
    </group >
    `
  return jsx
}
const custNode = { chat_jsx4All, chat_jsx4Normal, chat_jsx4Simple }
export default custNode