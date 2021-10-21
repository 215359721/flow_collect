/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const MAIN_COLOR = '#cc6600'
const WIDTH = 250
const HEIGHT_HEAD = 25
const HEIGHT_CONTENT = 270
const MARGIN_LEFT = 5 //模块横向间距
const MARGIN_TOP = 5 //模块纵向间距
const HEIGHT_SIMPLE = 40 //简要高度
const HEIGHT_INFO = 80 //详情高度
const HEIGTH_NORMAL = 60 //概要高度
const HEIGHT_IN = 60 //输入物高度
const HEIGHT_OUT = 60 //输出物高度
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
      会议
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
  <text style={{marginLeft: ${MARGIN_LEFT * 8},marginTop: ${MARGIN_TOP * 2},fill: '#333',fontWeight:bold,}}>${node.label}</text>
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
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',fontWeight:bold,}}>${node.label}</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',marginTop: 3,fontWeight:bold,fontSize:10}}>会议密级：一般</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 5,fill: '#888',fontSize:10,}}>参会人：${(node.data) ? (node.data.executor) : 'XXX'}</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 8,fill: '#888',fontSize:10,}}>会议时间：${(node.data) ? (node.data.startTime) : '2021-10-01'}</text>
  </rect>
`
//概要
const normal_part = (node) => `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGTH_NORMAL},
    marginLeft: ${MARGIN_LEFT},
    marginTop: ${MARGIN_TOP},
  }}
  draggable="true"
 >
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',fontWeight:bold}}>${node.label}</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 3,fill: '#888',fontSize:10,}}>参会人：${(node.data) ? (node.data.executor) : 'XXX'}</text>
  <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 5,fill: '#888',fontSize:10,}}>会议时间：${(node.data) ? (node.data.startTime) : '2021-10-01'}</text>
  </rect>
`
//会议文件
const file_part = (node) => {
  let content = `<text style={{marginLeft:${MARGIN_LEFT * 2},marginTop:3,fill:'#888',fontSize:10}}>暂无信息</text>'`
  if (node.data) {
    const list = node.data.inPuts
    content = ''
    list.forEach(element => {
      content += "<text style={{marginLeft: " + (MARGIN_LEFT * 2) + " ,marginTop:3,fill: '#2900FF',fontSize:10,}}>" + element.fileName + "</text>"
    })
  }
  return `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_IN},
    marginLeft: ${MARGIN_LEFT},
    marginTop: ${MARGIN_TOP},
  }}draggable="true">
    <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',fontWeight:bold,}}>会议文件</text>
    ${content}
    </rect >
  `
}
//会议纪要
const out_part = (node) => {
  let content = `<text style={{marginLeft:${MARGIN_LEFT * 2},marginTop:3,fill:'#888',fontSize:10}}>暂无信息</text>'`
  if (node.data) {
    const list = node.data.outPuts
    list.forEach(element => {
      content += "<text style={{marginLeft: " + (MARGIN_LEFT * 2) + " ,marginTop:3,fill: '#2900FF',fontSize:10,}}>" + element.fileName + "</text>"
    })
  }
  return `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_OUT},
    marginLeft: ${MARGIN_LEFT},
    marginTop: ${MARGIN_TOP},
  }}draggable="true">
    <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',fontWeight:bold,}}>会议纪要</text>
    ${content}
  </rect >
  `
}
//结论
const desc_part = (node) => `
  <rect style={{
    width: ${(WIDTH - (MARGIN_LEFT * 2))},
    height:${HEIGHT_DESC},
    marginLeft: ${MARGIN_LEFT},
    marginTop: ${MARGIN_TOP},
  }}draggable="true">
    <text style={{marginLeft: ${MARGIN_LEFT * 2} ,fill: '#333',fontWeight:bold,}}>会议结论</text>
      <text style={{marginLeft: ${MARGIN_LEFT * 2} ,marginTop: 3,fill: '#888',fontSize:10,}}>${(node.data) ? (node.data.description) : '会议结论'}</text>
  </rect >
  `

const meet_jsx4All = (node) => {
  let innerJSX = info_part(node) + file_part(node) + out_part(node) + desc_part(node)
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
const meet_jsx4Normal = (node) => {
  let innerJSX = normal_part(node)
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
const meet_jsx4Simple = (node) => {
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
const custNode = { meet_jsx4All, meet_jsx4Normal, meet_jsx4Simple }
export default custNode